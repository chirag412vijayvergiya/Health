const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide your email'],
  },
  photo: {
    type: String,
    default: 'default.jpg',
  },
  // role: {
  //   type: String,
  //   enum: ['patient', 'doctor', 'nurse', 'admin'],
  //   default: 'patient',
  // },
  passwordChangedAt: Date,

  BloodGroup: {
    type: String,
    required: [true, 'Please provide your BloodGroup'],
    uppercase: true,
  },

  phone: {
    type: String,
    required: [true, 'Please provide your Mobile Number'],
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
