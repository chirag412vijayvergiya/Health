const express = require('express');
const patientController = require('../Controllers/patientController');
const currentUserController = require('../Controllers/currentUserController');
const authController = require('../Controllers/authController');
const passport = require('passport');
const { createSendToken } = require('../utils/jwt');

const router = express.Router();

// ******************************************************************************* //
// router.post('/login/google', authController.loginSignUpWithGooglepatient);

// router.post('/signup', authController.signup);
// router.post('/login', authController.login);
router.post('/signup', authController.signuppatient);
router.post('/login', authController.loginpatient);

router.get('/logout', authController.logout);

// router.get('/login/success', (req, res) => {
//   if (req.user) {
//     res
//       .status(200)
//       .json({ message: 'User Logged in successfully!', user: req.user });
//   } else {
//     res.status(400).json({ message: 'Not Authorized' });
//   }
// });

// router.get(
//   '/auth/google',
//   passport.authenticate('google', { scope: ['profile', 'email'] }),
// );

// router.get(
//   '/auth/google/callback',
//   passport.authenticate('google', {
//     successRedirect: 'http://localhost:5173/home',
//     failureRedirect: 'http://localhost:5173/login',
//   }),
// );

// Patient routes
router.get(
  '/auth/google',
  passport.authenticate('google-patient', {
    scope: ['profile', 'email'],
    prompt: 'select_account',
  }),
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google-patient', {
    session: false,
    failureRedirect: `${process.env.CLIENT_URL}/login`,
  }),
  (req, res) => {
    // Generate token and send as a cookie
    // console.log('Authenticated Patient:', req.user);
    // createSendToken(req.user.user, 200, res);
    console.log('Authenticated Patient:', req);
    const { user } = req.user;
    createSendToken(user, 200, res);
    // res.redirect(`${process.env.CLIENT_URL}/dashboard`);
  },
);

router.get('/check-auth-status', authController.protectpatient, (req, res) => {
  res.status(200).json({
    status: 'success',
    user: req.user,
  });
});
// ******************************************************************************* //

// router.post('/forgotPassword', authController.forgotPassword);
// router.patch('/resetPassword/:token', authController.resetPassword);
router.post('/forgotPassword', authController.forgotPasswordPatient);
router.patch('/resetPassword/:token', authController.resetPasswordPatient);

// ******************************************************************************* //
//This will protect all the routes which will come after this routes so we don't need to write 'authController.protectpatient' again and agian

router.patch(
  '/updateMyPassword',
  authController.protectpatient,
  authController.updatePasswordPatient,
);

router.get('/no-role', authController.protectpatient);
router.get('/patientCount', patientController.getLengthPatients);
// ******************************************************************************* //

router.get(
  '/me',
  authController.protectpatient,
  currentUserController.getMe,
  patientController.getUser,
);

router.delete(
  '/deleteMe',
  authController.protectpatient,
  patientController.deleteMe,
);
router.patch(
  '/updateMe',
  authController.protectpatient,
  currentUserController.uploadUserPhoto,
  currentUserController.resizeUserPhoto,
  patientController.updateMe,
);

// ******************************************************************************* //

//Below this all are used by admin but in patient i have no admin it is only in doctorSchema
// So i am using protectdoctor here

router.use(authController.protectdoctor);
router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(patientController.getAllUsers)
  .post(patientController.createUser);

router
  .route('/:id')
  .get(patientController.getUser)
  .delete(patientController.deleteUser)
  .patch(patientController.updateUser);

module.exports = router;
