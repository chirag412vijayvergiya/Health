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
  console.log('Request Body:', req.body);
  console.log('Authenticated User:', req.user);
  console.log('Protocol :- ', req.protocol);
  console.log('Host :- ', req.get('host'));

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

  console.log('Extracted Fields:');
  console.log('patientId:', patientId);
  console.log('doctorId:', doctorId);
  console.log('appointmentDate:', appointmentDate);
  console.log('appointmentTime:', appointmentTime);
  console.log('disease:', disease);
  console.log('amount:', amount);

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
      success_url: `${req.protocol}://${req.get('host')}/success`,
      cancel_url: `${req.protocol}://${req.get('host')}/cancel`,
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

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      status: 'success',
      stripeSessionId: stripeSession.id,
    });
  } catch (err) {
    console.error('Error during booking appointment:', err);
    await session.abortTransaction();
    session.endSession();
    next(err);
  }
});

const createBookingCheckout = async (session) => {
  const { doctorId, appointmentDate, appointmentTime, disease, patientId } =
    JSON.parse(session.client_reference_id);

  // Check if the appointment slot is still available
  const existingAppointment = await appointments.findOne({
    doctor: doctorId,
    appointmentDate,
    appointmentTime,
  });

  if (!existingAppointment) {
    await appointments.create({
      patient: mongoose.Types.ObjectId(patientId),
      doctor: mongoose.Types.ObjectId(doctorId),
      appointmentDate,
      appointmentTime,
      disease,
      bookingDate: new Date(),
      status: 'scheduled',
    });
  }
};

exports.webhookCheckout = (req, res, next) => {
  const signature = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed')
    createBookingCheckout(event.data.object);

  res.status(200).json({ received: true });
};
