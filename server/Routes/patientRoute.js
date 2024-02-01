const express = require('express');
const patientController = require('../Controllers/patientConroller');
const authController = require('../Controllers/authController');

const router = express.Router();
router.post('/signup', authController.signup);

router
  .route('/')
  .get(patientController.getAllUsers)
  .post(patientController.createUser);

router
  .route('/:id')
  .get(patientController.getUser)
  .delete(patientController.deleteUser);
// router.get('/', userController.getAllUsers);

module.exports = router;
