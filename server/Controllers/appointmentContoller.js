const factory = require('./handleFactory');
const appointments = require('../models/appointmentModel');

exports.getAllAppointments = factory.getAll(appointments);
exports.getAppointment = factory.getOne(appointments);
exports.createAppointment = factory.createOne(appointments);
exports.deleteAppointment = factory.deleteOne(appointments);
exports.updateAppointment = factory.updateOne(appointments);
