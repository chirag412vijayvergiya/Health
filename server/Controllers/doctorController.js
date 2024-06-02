// const fs = require('fs');
const factory = require('./handleFactory');
const Doctor = require('../models/doctorModel');
const currentUserController = require('./currentUserController');
// const Patient = require('../models/PatientModel');

// const Doctor = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/doctor.json`),
// );

// exports.getMe = (req, res, next) => {
//   req.params.id = req.user.id;
//   next();
// };

exports.deleteMe = currentUserController.deleteMeDoctor;
exports.updateMe = currentUserController.updateMeDoctor;

exports.getLengthDoctors = factory.getLength(Doctor);
exports.getAllUsers = factory.getAll(Doctor);
exports.getUser = factory.getOne(Doctor, [
  { path: 'reviews' },
  { path: 'appointment' },
]);
exports.createUser = currentUserController.createUser;
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};
exports.deleteUser = factory.deleteOne(Doctor);

exports.getAllDoctor = factory.getAll(
  Doctor,
  'name email specialization photo ratingsAverage ratingsQuantity role fees',
);
