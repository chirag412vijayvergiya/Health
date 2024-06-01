const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const mongoose = require('mongoose');
const factory = require('./handleFactory');
const appointments = require('../models/appointmentModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.setPatientDoctorIDs = (req, res, next) => {
  if (!req.body.patient) req.body.patient = req.patient.id;
  if (!req.body.doctor) req.body.doctor = req.params.id;
  next();
};
exports.getAllAppointments = factory.getAll(appointments);
exports.getAppointment = factory.getOne(appointments);
exports.createAppointment = factory.createOne(appointments);
exports.deleteAppointment = factory.deleteOne(appointments);
exports.updateAppointment = factory.updateOne(appointments);
// exports.getLengthAppointments = factory.getLength(appointments);

exports.getMyAppointments = async (req, res, next) => {
  const appointment = await appointments.find({ patient: req.user.id });
  res.status(200).json({
    status: 'success',
    results: appointment.length,
    data: {
      appointment,
    },
  });
};

exports.getOneAppointment = catchAsync(async (req, res, next) => {
  const appointment = await appointments.findOne({
    _id: req.params.id,
    patient: req.user.id,
  });
  if (!appointment) {
    return next(
      new AppError(
        'No appointment found with that ID for the current user',
        404,
      ),
    );
  }
  res.status(200).json({
    status: 'success',
    results: appointment.length,
    data: {
      appointment,
    },
  });
});
exports.bookAppointment = catchAsync(async (req, res, next) => {
  const {
    body: {
      patientId,
      doctorId,
      appointmentDate,
      appointmentTime,
      disease,
      amount,
    },
  } = req.body;
  // Ensure amount is parsed correctly
  const parsedAmount = parseInt(amount, 10);
  if (Number.isNaN(parsedAmount)) {
    console.error('Amount is not a valid number:', amount);
    return next(new AppError('Invalid amount value', 400));
  }
  console.log('Parsed Amount:', parsedAmount);

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Step 1: Check if the appointment slot is available
    const existingAppointment = await appointments
      .findOne({ doctor: doctorId, appointmentDate, appointmentTime })
      .session(session);

    if (existingAppointment) {
      throw new AppError('This appointment slot is already booked.', 400);
    }

    // Step 2: Create Stripe payment session
    if (!req.user || !req.user.email) {
      throw new AppError('User email is not available.', 400);
    }

    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      success_url: `https://jeevan-frontend.vercel.app/success`,
      cancel_url: `https://jeevan-frontend.vercel.app/cancel`,
      customer_email: req.user.email,
      client_reference_id: JSON.stringify({
        doctorId,
        appointmentDate,
        appointmentTime,
        disease,
        patientId,
      }),

      line_items: [
        {
          price_data: {
            currency: 'INR',
            unit_amount: parsedAmount * 100, // Ensure this is correctly parsed
            product_data: {
              name: `Appointment with Doctor ${doctorId}`,
            },
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
    });
    console.log('Stripe Session:', stripeSession);
    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      status: 'success',
      session: stripeSession,
    });
  } catch (err) {
    console.error('Error during booking appointment:', err);
    await session.abortTransaction();
    session.endSession();
    next(err);
  }
});

const createBookingCheckout = async (session) => {
  const clientReferenceId = JSON.parse(session.client_reference_id);
  console.log('Session:-', clientReferenceId);
  const { doctorId, appointmentDate, appointmentTime, disease, patientId } =
    clientReferenceId;

  // Now you can use these values as needed
  console.log('Doctor ID:', doctorId);
  console.log('Appointment Date:', appointmentDate);
  console.log('Appointment Time:', appointmentTime);
  console.log('Disease:', disease);
  console.log('Patient ID:', patientId);

  // Convert appointmentDate string to Date object
  const appointmentDateObj = new Date(appointmentDate);
  console.log('Converted Appointment Date:', appointmentDateObj);

  let existingAppointment;

  try {
    existingAppointment = await appointments.findOne({
      doctor: mongoose.Types.ObjectId(doctorId),
      appointmentDate: appointmentDateObj,
      appointmentTime,
    });
    console.log('Existing Appointment:', existingAppointment);
  } catch (error) {
    console.error('Error finding existing appointment:', error);
  }

  if (!existingAppointment) {
    try {
      const x = await appointments.create({
        patient: patientId,
        doctor: doctorId,
        appointmentDate: appointmentDateObj,
        appointmentTime,
        disease,
        bookingDate: new Date(),
        status: 'scheduled',
      });
      console.log('New Appointment Created:', x);
    } catch (error) {
      console.error('Error creating new appointment:', error);
    }
  }
};

exports.webhookCheckout = (req, res, next) => {
  // console.log('Request Body:', req);
  const signature = req.headers['stripe-signature'];
  console.log('Signature:', signature);

  let event;
  try {
    console.log('Raw Request Body:', req.body.toString()); // Log raw body
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    console.error(`Webhook error: ${err.message}`);
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    console.log('Session Completed:', event.data.object);
    createBookingCheckout(event.data.object);
  }

  res.status(200).json({ received: true });
};
