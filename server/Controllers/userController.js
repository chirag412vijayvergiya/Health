// const fs = require('fs');
const factory = require('./handleFactory');
const Doctor = require('../models/doctorModel');
// const Patient = require('../models/PatientModel');

// const Doctor = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/doctor.json`),
// );
exports.getAllUsers = factory.getAll(Doctor);
exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};
exports.createUser = factory.createOne(Doctor);
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};
exports.deleteUser = factory.deleteOne(Doctor);
