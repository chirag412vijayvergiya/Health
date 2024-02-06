const mongoose = require('mongoose');
// const slugify = require('slugify');
const validator = require('validator');
const bcrypt = require('bcrypt');

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
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating muust be below 5.0'],
      set: (val) => Math.round(val * 10) / 10,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
  },
  {
    toJSON: { virtuals: true }, // By this we ensure that virtual properties are included when i
    toObject: { virtuals: true }, //convert a Mongoose document to either JSON or JavaScript object.
  },
);

// ******************************************************************************* //

// Virtual populate(Means this will not store in database for high quality)
doctorSchema.virtual('appointment', {
  ref: 'Appointments', // Name of Schema
  foreignField: 'doctor', // In foreign feild (Appointments Schema) the id is store in doctor attribute
  localField: '_id', // In this schema id is store as _id by monoose (so both must be equal for connecting)
});

// ******************************************************************************* //

// Set the Password when password will actually modified
doctorSchema.pre('save', async function (next) {
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
doctorSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// ******************************************************************************* //

//The pre middleware that runs before any query with a method starting with "find".
//At the time of find it will select only user which is not equal to false.
doctorSchema.pre(/^find/, function (next) {
  // this points to the current query
  this.find({ active: { $ne: false } });
  next();
});

// ******************************************************************************* //

// This is the method that will check whether user credentials is correct or not (It will not save in the databases).
doctorSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

doctorSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
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

doctorSchema.methods.createPasswordResetToken = function () {
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
const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
