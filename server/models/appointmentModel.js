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
    toJSON: { virtuals: true }, // By this we ensure that virtual properties are included when i
    toObject: { virtuals: true }, //convert a Mongoose document to either JSON or JavaScript object.
  },
);
appointmentSchema.index({ patient: 1, doctor: 1 });

// ******************************************************************************* //

appointmentSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'patient',
    select: 'name photo', // This will show ( populate ) the name and photo
  }).populate({
    path: 'doctor',
    select: 'name photo', // This will show ( populate ) the name and photo
  });
  next();
});

// ******************************************************************************* //

const Appointments = mongoose.model('Appointments', appointmentSchema);

module.exports = Appointments;
