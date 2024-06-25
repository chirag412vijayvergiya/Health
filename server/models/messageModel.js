const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.ObjectId,
      refPath: 'senderModel',
      required: true,
    },
    senderModel: {
      type: String,
      required: true,
      enum: ['Patient', 'Doctor'],
    },
    recipient: {
      type: mongoose.Schema.ObjectId,
      refPath: 'recipientModel',
      required: true,
    },
    recipientModel: {
      type: String,
      required: true,
      enum: ['Patient', 'Doctor'],
    },
    chat: {
      type: mongoose.Schema.ObjectId,
      ref: 'Chat',
      required: true,
    },
    content: {
      type: String,
      // required: true,
    },
    attachments: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
