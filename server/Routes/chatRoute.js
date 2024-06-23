const express = require('express');
const chatController = require('../Controllers/chatController');
const authController = require('../Controllers/authController');

const router = express.Router();

router.post(
  '/patient-chat',
  authController.protectpatient,
  chatController.accessChat,
);

router.post(
  '/doctor-chat',
  authController.protectdoctor,
  chatController.accessChat,
);

module.exports = router;
