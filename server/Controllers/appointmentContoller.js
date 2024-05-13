const factory = require('./handleFactory');
const appointments = require('../models/appointmentModel');

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
