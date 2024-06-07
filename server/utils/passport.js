// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth2').Strategy;
// const Patient = require('../models/patientModel');

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: 'http://localhost:8000/api/v1/patient/auth/google/callback',
//       scope: ['email', 'profile'],
//       prompt: 'select_account',
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         let user = await Patient.findOne({ googleId: profile.id });
//         if (!user) {
//           user = new Patient({
//             googleId: profile.id,
//             name: profile.displayName,
//             email: profile.emails[0].value,
//             photo: profile.photos[0].value,
//             role: 'patient',
//           });
//           await user.save();
//         }
//         return done(null, user);
//       } catch (err) {
//         return done(err, null);
//       }
//     },
//   ),
// );

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await Patient.findById(id);
//     done(null, user);
//   } catch (err) {
//     done(err, null);
//   }
// });

const passport = require('passport');
const OAuth2Strategy = require('passport-google-oauth2').Strategy;
const Patient = require('../models/patientModel');
const Doctor = require('../models/doctorModel');
const { signToken } = require('../utils/jwt');

// Patient Google OAuth2 Strategy
passport.use(
  'google-patient',
  new OAuth2Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.SERVER_URL}/api/v1/patient/auth/google/callback`,
      scope: ['profile', 'email'],
      prompt: 'select_account',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await Patient.findOne({ googleId: profile.id });
        if (!user) {
          user = new Patient({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            photo: profile.photos[0].value,
            role: 'patient',
          });
          await user.save();
        }

        const token = signToken(user._id);
        return done(null, { user, token, role: 'patient' });
      } catch (err) {
        return done(err, null);
      }
    },
  ),
);

// Doctor Google OAuth2 Strategy
passport.use(
  'google-doctor',
  new OAuth2Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.SERVER_URL}/api/v1/doctor/auth/google/callback`,
      scope: ['profile', 'email'],
      prompt: 'select_account',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await Doctor.findOne({ googleId: profile.id });
        // if (!user) {
        //   user = new Doctor({
        //     googleId: profile.id,
        //     name: profile.displayName,
        //     email: profile.emails[0].value,
        //     photo: profile.photos[0].value,
        //     role: 'doctor',
        //   });
        //   await user.save();
        // }
        if (!user) {
          //   console.log('User not found: ', profile.id);
          return done(null, false, { message: 'User not found' });
        }
        const token = signToken(user._id);
        // console.log('Generated JWT:', token);
        return done(null, { user, token });
        // return done(null, user);
      } catch (err) {
        // console.error('Error during Google OAuth:', err);
        return done(err, null);
      }
    },
  ),
);

module.exports = passport;
