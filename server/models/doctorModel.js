const mongoose = require('mongoose');
// const slugify = require('slugify');
const validator = require('validator');

const doctorSchema = new mongoose.Schema(
  {
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
      enum: ['doctor', 'admin'],
      default: 'doctor',
    },
    MedicalLicenseNo: {
      type: Number,
    },
    specialization: {
      type: [String],
      validate: {
        validator: function (value) {
          // Custom validator function to check if the array is not empty
          return value && value.length > 0;
        },
        message: 'At least one specialization is required.',
      },
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 8,
      select: false,
    },
    //   passwordChangedAt: Date,
    BloodGroup: {
      type: String,
      required: [true, 'Please provide your BloodGroup'],
      uppercase: true,
    },
    phone: {
      type: String,
      required: [true, 'Please provide your Mobile Number'],
    },
    patients: [{ type: mongoose.Schema.ObjectId, ref: 'Patient' }],
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  // {
  //   toJSON: { virtuals: true },
  //   toObject: { virtuals: true },
  // },
);

doctorSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'patients',
    select: 'name email gender BloodGroup',
  });

  next();
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
