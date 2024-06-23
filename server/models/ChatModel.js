const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema(
  {
    chatName: {
      type: String,
      trim: true,
    },
    users: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          refPath: 'userModel',
          required: true,
        },
        userModel: {
          type: String,
          required: true,
          enum: ['Patient', 'Doctor'],
        },
      },
    ],
    latestMessage: {
      type: mongoose.Schema.ObjectId,
      ref: 'Message',
    },
  },
  {
    timestamps: true,
  },
);

// Ensure that a chat always contains one patient and one doctor
chatSchema.pre('save', function (next) {
  const users = this.users.map((user) => user.userModel);
  if (!users.includes('Patient') || !users.includes('Doctor')) {
    return next(new Error('A chat must have one patient and one doctor.'));
  }
  next();
});

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;
