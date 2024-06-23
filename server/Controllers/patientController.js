const patient = require('../models/patientModel');
const factory = require('./handleFactory');
const currentUserController = require('./currentUserController');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
// const passport = require('passport');
// const OAuth2Stratergy = require('passport-google-oauth2').Strategy;

// const clientid = process.env.GOOGLE_CLIENT_ID;
// const clientsecret = process.env.GOOGLE_CLIENT_SECRET;

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
  if (!dob) return null;
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

// ******************************************************************************* //

// passport.use(
//   new OAuth2Stratergy(
//     {
//       clientID: clientid,
//       clientSecret: clientsecret,
//       callbackURL: '/auth/google/callback',
//       scope: ['profile', 'email'],
//     },
//     async (accessToken, refreshToken, profile, cb) => {
//       // console.log(profile);
//       try {
//         let user = await patient.findOne({ googleId: profile.id });
//         if (!user) {
//           user = new patient({
//             googleId: profile.id,
//             name: profile.displayName,
//             email: profile.emails[0].value,
//             photo: profile.photos[0].value,
//             role: 'patient',
//           });

//           await user.save();
//         }
//         return cb(null, user);
//       } catch (err) {
//         return cb(err, null);
//       }
//     },
//   ),
// );

// passport.serializeUser((user, cb) => {
//   cb(null, user);
// });

// passport.deserializeUser((user, cb) => {
//   cb(null, user);
// });

// // Middleware function to handle Google authentication
// exports.authenticateGoogle = passport.authenticate('google', {
//   scope: ['profile', 'email'],
// });

// // Google authentication callback
// exports.googleCallback = passport.authenticate('google', {
//   successRedirect: 'http://localhost:5173/dashboard',
//   failureRedirect: 'http://localhost:5173/login',
// });

// exports.loginSuccess = catchAsync(async (req, res, next) => {
//   if (req.user) {
//     res
//       .status(200)
//       .json({ message: 'User Logged in successfully!', user: req.user });
//   } else {
//     res.status(400).json({ message: 'Not Authorized' });
//   }
// });
