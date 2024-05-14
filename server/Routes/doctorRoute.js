const express = require('express');
const doctorController = require('../Controllers/doctorController');
const authController = require('../Controllers/authController');
const currentUserController = require('../Controllers/currentUserController');
const reviewRouter = require('./reviewRoute');

const router = express.Router();

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

// ******************************************************************************* //

router.post('/forgotPassword', authController.forgotPasswordDoctor);
router.patch('/resetPassword/:token', authController.resetPasswordDoctor);

// ******************************************************************************* //

// Visible profile for everyone (no need to be logged in)
// Because every Person can see the profile of a doctor

router.get('/:id', doctorController.getUser);

router.use(authController.protectdoctor);
router.patch('/updateMyPassword', authController.updatePasswordDoctor);

// ******************************************************************************* //

router.get('/me', currentUserController.getMe, doctorController.getUser);
router.delete(
  '/deleteMe',
  authController.protectdoctor,
  doctorController.deleteMe,
);
router.patch(
  '/updateMe',
  currentUserController.uploadUserPhoto,
  currentUserController.resizeUserPhoto,
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
