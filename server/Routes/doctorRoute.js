const express = require('express');
const doctorController = require('../Controllers/doctorController');
const authController = require('../Controllers/authController');
const currentUserController = require('../Controllers/currentUserController');
const reviewRouter = require('./reviewRoute');
const passport = require('passport');
const createSendToken = require('../utils/jwt');

const router = express.Router();

// ******************************************************************************* //
router.get(
  '/auth/google',
  passport.authenticate('google-doctor', {
    scope: ['profile', 'email'],
    prompt: 'select_account',
  }),
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google-doctor', {
    session: false,
    failureRedirect: `${process.env.CLIENT_URL}/login`,
  }),
  (req, res) => {
    // Generate token and send as a cookie
    // console.log('Callback reached');
    // Check if user is authenticated
    if (!req.user) {
      // console.log('User not authenticated');
      return res.redirect(`${process.env.CLIENT_URL}/login`);
    }

    // Generate token and send as a cookie
    // console.log('Authenticated Doctor:', req.user);
    createSendToken(req.user.user, 200, res);
    res.redirect(`${process.env.CLIENT_URL}/dashboard`);
  },
);

// POST /doctor/234fad4/reviews
// GET /doctor/234fad4/reviews
router.get('/all-doctors', doctorController.getAllDoctor);

// It is because I am grabing doctorId from doctor route.
router.use('/:doctorId/reviews', reviewRouter);

// ******************************************************************************* //

router.post('/signup', authController.signupdoctor);
router.post('/login', authController.logindoctor);
// router.post('/signup', authController.signup);
// router.post('/login', authController.login);
router.get('/logout', authController.logout);

// ******************************************************************************* //

router.post('/forgotPassword', authController.forgotPasswordDoctor);
router.patch('/resetPassword/:token', authController.resetPasswordDoctor);

// ******************************************************************************* //

// Define /me route before /:id
router.get(
  '/me',
  authController.protectdoctor,
  currentUserController.getMe,
  doctorController.getUser,
);

router.get('/doctorCount', doctorController.getLengthDoctors);

// Visible profile for everyone (no need to be logged in)
// Because every Person can see the profile of a doctor
router.get('/:id', doctorController.getUser);

router.use(authController.protectdoctor);
router.patch('/updateMyPassword', authController.updatePasswordDoctor);

// ******************************************************************************* //

router.delete(
  '/deleteMe',
  authController.protectdoctor,
  doctorController.deleteMe,
);
router.patch(
  '/updateMe',
  currentUserController.uploadUserPhoto,
  doctorController.updateMe,
);

// ******************************************************************************* //

router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(doctorController.getAllUsers)
  .post(doctorController.createUser);

router
  .route('/:id')
  .delete(doctorController.deleteUser)
  .patch(doctorController.updateUser);
// router.get('/', userController.getAllUsers);

module.exports = router;
