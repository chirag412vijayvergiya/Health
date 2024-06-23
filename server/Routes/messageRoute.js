const express = require('express');
const messageController = require('../Controllers/messageController');
const authController = require('../Controllers/authController');

const router = express.Router();

router.post(
  '/send-message-patient',
  authController.protectpatient,
  messageController.createMessage,
);

router.post(
  '/send-message-doctor',
  authController.protectdoctor,
  messageController.createMessage,
);

router.get(
  '/patient/:chatId',
  authController.protectpatient,
  messageController.getMessages,
);

router.get(
  '/doctor/:chatId',
  authController.protectdoctor,
  messageController.getMessages,
);
module.exports = router;
