const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.ObjectId,
      ref: 'Patient',
      required: [true, 'Patient should be exist'],
    },
    doctor: {
      type: mongoose.Schema.ObjectId,
      ref: 'Doctor',
      required: [true, 'Doctor should be exist'],
    },
    appointmentDate: {
      type: Date,
      required: [true, 'Appointment date is required'],
      validate: {
        validator: function (value) {
          // Create a new Date object combining appointmentDate and appointmentTime

          return value >= this.bookingDate;
        },
        message: 'Appointment date and time must be greater than booking date',
      },
    },
    appointmentTime: {
      type: String,
      required: [true, 'Appointment time is required'],
      validate: {
        validator: function (value) {
          // Validate time range format (HH:mm - HH:mm)
          return /^(?:[01]\d|2[0-3]):?([0-5]\d)\s*-\s*(?:[01]\d|2[0-3]):?([0-5]\d)$/.test(
            value,
          );
        },
        message: 'Invalid time range format. Use HH:mm - HH:mm format.',
      },
    },
    bookingDate: {
      type: Date,
      default: Date.now,
    },
    disease: {
      type: String,
      required: [true, 'Disease must exist for appointments'],
    },
    status: {
      type: String,
      default: 'scheduled',
      enum: ['scheduled', 'completed', 'cancelled'],
    },
  },
  {
    toJSON: { virtuals: true }, // By this we ensure that virtual properties are included when i
    toObject: { virtuals: true }, //convert a Mongoose document to either JSON or JavaScript object.
    id: false,
  },
);
appointmentSchema.index({ patient: 1, doctor: 1 });
// Create a unique index to ensure no double booking for the same doctor, date, and time
appointmentSchema.index(
  { doctor: 1, appointmentDate: 1, appointmentTime: 1 },
  { unique: true },
);
// ******************************************************************************* //

appointmentSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'patient',
    select: 'name photo email', // This will show ( populate ) the name and photo
  }).populate({
    path: 'doctor',
    select: 'name photo fees email', // This will show ( populate ) the name and photo
  });
  next();
});

// ******************************************************************************* //

const Appointments = mongoose.model('Appointments', appointmentSchema);

module.exports = Appointments;
