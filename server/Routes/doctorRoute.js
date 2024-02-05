const express = require('express');
const userController = require('../Controllers/doctorController');
const authController = require('../Controllers/authController');

const router = express.Router();

// ******************************************************************************* //

router.post('/signup', authController.signupdoctor);
router.post('/login', authController.logindoctor);
// router.post('/signup', authController.signup);
// router.post('/login', authController.login);

// ******************************************************************************* //

router.post('/forgotPassword', authController.forgotPasswordDoctor);
router.patch('/resetPassword/:token', authController.resetPasswordDoctor);

// ******************************************************************************* //

router.patch(
  '/updateMyPassword',
  authController.protectpatient,
  authController.updatePasswordDoctor,
);

// ******************************************************************************* //

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .delete(userController.deleteUser);
// router.get('/', userController.getAllUsers);

module.exports = router;
