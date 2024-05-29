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
