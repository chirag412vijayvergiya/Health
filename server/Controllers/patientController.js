const patient = require('../models/patientModel');
const factory = require('./handleFactory');
const currentUserController = require('./currentUserController');

exports.getAllUsers = factory.getAll(patient);

// ******************************************************************************* //

exports.createUser = currentUserController.createUser;

// ******************************************************************************* //

exports.updateMe = currentUserController.updateMePatient;

// ******************************************************************************* //

//sdajfkjalkfa
exports.deleteMe = currentUserController.deleteMePatient;
//fsanjfjskfjkdjas
// ******************************************************************************* //

//Do not update password with this
exports.getUser = factory.getOne(patient, {
  path: 'appointment',
});
exports.updateUser = factory.updateOne(patient);
exports.deleteUser = factory.deleteOne(patient);
