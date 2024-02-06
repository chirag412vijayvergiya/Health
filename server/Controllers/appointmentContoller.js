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
