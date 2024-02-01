const mongoose = require('mongoose');
const validator = require('validator');

const patientSchema = new mongoose.Schema({
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
  gender: {
    type: String,
  },
  photo: {
    type: String,
    default: 'default.jpg',
  },
  role: {
    type: String,
    default: 'patient',
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false,
  },
  //   passwordChangedAt: Date,
  FeePaid: {
    type: String,
    enum: ['paid', 'Unpaid', 'pending'],
  },
  BillDate: {
    type: Date,
    default: Date.now(),
    // We can use a custom getter to format the date when retrieving from the database
    get: function (value) {
      return value.toLocaleDateString('en-IN'); //Indian date
    },
  },
  BloodGroup: {
    type: String,
    required: [true, 'Please provide your BloodGroup'],
    uppercase: true,
  },
  phone: {
    type: String,
    required: [true, 'Please provide your Mobile Number'],
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  InsuranceProviderCompany: String,
  PolicyNumber: Number,
});

//Will make virtual fees, option
const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;
