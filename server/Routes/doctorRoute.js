const express = require('express');
const userController = require('../Controllers/doctorController');

const router = express.Router();

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
