const express = require('express');
const patientController = require('../Controllers/patientConroller');

const router = express.Router();

router
  .route('/')
  .get(patientController.getAllUsers)
  .post(patientController.createUser);

router.route('/:id').delete(patientController.deleteUser);
// router.get('/', userController.getAllUsers);

module.exports = router;
