const express = require('express');
const messageController = require('../Controllers/messageController');
const authController = require('../Controllers/authController');
const currentUserController = require('../Controllers/currentUserController');

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

router.post(
  '/send-file-patient',
  authController.protectpatient,
  messageController.uploadChatImages,
  messageController.createMessageFiles,
);

router.post(
  '/send-file-doctor',
  authController.protectdoctor,
  messageController.uploadChatImages,
  messageController.createMessageFiles,
);

module.exports = router;
