const express = require('express');
const patientController = require('../Controllers/patientConroller');
const authController = require('../Controllers/authController');

const router = express.Router();
router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.patch(
  '/updateMyPassword',
  authController.protect,
  authController.updatePassword,
);

router
  .route('/')
  .get(authController.protect, patientController.getAllUsers)
  .post(patientController.createUser);

router
  .route('/:id')
  .get(patientController.getUser)
  .delete(patientController.deleteUser);

module.exports = router;
