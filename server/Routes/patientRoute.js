const express = require('express');
const patientController = require('../Controllers/patientConroller');
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

router.patch(
  '/updateMyPassword',
  authController.protectpatient,
  authController.updatePasswordPatient,
);

// ******************************************************************************* //

router
  .route('/')
  .get(authController.protectpatient, patientController.getAllUsers)
  .post(patientController.createUser);

router
  .route('/:id')
  .get(patientController.getUser)
  .delete(patientController.deleteUser);

module.exports = router;
