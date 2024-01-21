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
      required: [true, 'Patient should be exist'],
    },
    appointmentDate: {
      type: Date,
      default: () => {
        // Calculate the current date plus one day
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 1);
        return currentDate;
      },
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
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);
appointmentSchema.index({ patient: 1, doctor: 1 }, { unique: true });

appointmentSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'patient',
    select: ['name', 'photo', 'gender', 'BloodGroup'],
  });
  next();
});

// appointmentSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: 'doctor',
//     select: '-patients',
//   });
//   next();
// });

const Appointments = mongoose.model('Appointments', appointmentSchema);

module.exports = Appointments;
