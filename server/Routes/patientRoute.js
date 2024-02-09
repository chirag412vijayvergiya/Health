const express = require('express');
const patientController = require('../Controllers/patientController');
const currentUserController = require('../Controllers/currentUserController');
const authController = require('../Controllers/authController');

const router = express.Router();

// ******************************************************************************* //

// router.post('/signup', authController.signup);
// router.post('/login', authController.login);
router.post('/signup', authController.signuppatient);
router.post('/login', authController.loginpatient);

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
