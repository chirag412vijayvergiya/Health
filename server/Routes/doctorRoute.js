const express = require('express');
const userController = require('../Controllers/userController');

const router = express.Router();

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router.route('/:id').delete(userController.deleteUser);
// router.get('/', userController.getAllUsers);

module.exports = router;
