const factory = require('./handleFactory');
const patient = require('../models/patientModel');

exports.getAllUsers = factory.getAll(patient);
exports.getUser = factory.getOne(patient);
exports.createUser = factory.createOne(patient);
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};
exports.deleteUser = factory.deleteOne(patient);
