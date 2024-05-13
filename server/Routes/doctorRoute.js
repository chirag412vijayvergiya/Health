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
  .get(doctorController.getUser)
  .delete(doctorController.deleteUser)
  .patch(doctorController.updateUser);
// router.get('/', userController.getAllUsers);

module.exports = router;
