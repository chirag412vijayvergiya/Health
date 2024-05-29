const patient = require('../models/patientModel');
const factory = require('./handleFactory');
const currentUserController = require('./currentUserController');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

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
// exports.getLengthPatients = factory.getLength(patient);

const calculateAge = (dob) => {
  const diff = Date.now() - dob.getTime();
  const ageDate = new Date(diff);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

exports.getLengthPatients = catchAsync(async (req, res, next) => {
  const patients = await patient.find({}, 'dob gender'); // Fetch only dob and gender

  const result = patients.map((p) => ({
    age: calculateAge(p.dob),
    gender: p.gender,
  }));

  if (!result) {
    return next(new AppError('No patients found', 404));
  }
  const size = result.length;
  res.status(200).json({
    status: 'success',
    data: {
      size,
      data: result,
    },
  });
});
