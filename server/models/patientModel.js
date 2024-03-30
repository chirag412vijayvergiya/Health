const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const patientSchema = new mongoose.Schema(
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
      default: 'patient',
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 8,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password'],
      validate: {
        // This only works on CREATE and SAVE!!!
        validator: function (el) {
          return el === this.password;
        },
        message: 'Passwords are not the same!',
      },
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
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
      // required: [true, 'Please provide your BloodGroup'],
      uppercase: true,
    },
    phone: {
      type: String,
      // required: [true, 'Please provide your Mobile Number'],
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },

    InsuranceProviderCompany: String,
    PolicyNumber: Number,
  },
  {
    toJSON: { virtuals: true }, // By this we ensure that virtual properties are included when i
    toObject: { virtuals: true }, //convert a Mongoose document to either JSON or JavaScript object.
  },
);

// ******************************************************************************* //

// Virtual populate(Means this will not store in database for high quality)
patientSchema.virtual('appointment', {
  ref: 'Appointments', // Name of Schema
  foreignField: 'patient', // In foreign feild (Appointments Schema) the id is store in patient attribute
  localField: '_id', // In this schema id is store as _id by monoose (so both must be equal for connecting)
});

// ******************************************************************************* //

// Set the Password when password will actually modified
patientSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified (isModified is inbuilt method).
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

// ******************************************************************************* //

// Set the Password changed date when password change
patientSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// ******************************************************************************* //

//The pre middleware that runs before any query with a method starting with "find".
//At the time of find it will select only user which is not equal to false.
patientSchema.pre(/^find/, function (next) {
  // this points to the current query
  this.find({ active: { $ne: false } });
  next();
});

// ******************************************************************************* //

// This is the method that will check whether user credentials is correct or not (It will not save in the databases).
patientSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// ******************************************************************************* //

patientSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  // Convert the passwordChangedAt timestamp to seconds
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000, // 1000 for miliseconds to seconds and result will be store in decimal (base 10)
      10,
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};

patientSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256') // 'sha256 is a hashing algorithm '
    .update(resetToken)
    .digest('hex');

  // console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // Current time + 10 minutes

  return resetToken;
};

// ******************************************************************************* //
//Will make virtual fees, option
const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;
