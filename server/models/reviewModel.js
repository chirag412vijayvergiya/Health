const mongoose = require('mongoose');
const Doctor = require('./doctorModel');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review can not be empty!'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    doctor: {
      type: mongoose.Schema.ObjectId,
      ref: 'Doctor',
      required: [true, 'Review must belong to a doctor.'],
    },
    patient: {
      type: mongoose.Schema.ObjectId,
      ref: 'Patient',
      required: [true, 'Review must belong to a patient.'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    id: false,
  },
);

reviewSchema.index({ patient: 1, doctor: 1 }, { unique: true });
reviewSchema.pre(/^find/, function (next) {
  //   this.populate({
  //     path: 'patient',
  //     select: 'name',
  //   }).populate({
  //     path: 'doctor',
  //     select: 'name',
  //   });

  this.populate({
    path: 'patient',
    select: ['name', 'photo'],
  });

  next();
});

reviewSchema.statics.calcAverageRatings = async function (doctorId) {
  console.log(doctorId);
  const stats = await this.aggregate([
    {
      $match: { doctor: doctorId },
    },
    {
      $group: {
        _id: '$doctor',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);
  console.log(stats);
  if (stats.length > 0) {
    await Doctor.findByIdAndUpdate(doctorId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating,
    });
  } else {
    await Doctor.findByIdAndUpdate(doctorId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5,
    });
  }
};

reviewSchema.post('save', function () {
  console.log(this.doctor._id);
  this.constructor.calcAverageRatings(this.doctor);
});

//findByIdAndUpdate
//findByIdAndDelete
/*
reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.findOne();
  // console.log(this.r);
  next();
});
*/
// In post query middleware we got doc parameter which is nothing but the executed document
reviewSchema.post(/^findOneAnd/, async (doc) => {
  if (doc) await doc.constructor.calcAverageRatings(doc.doctor);
});
// ******************************************************************************* //

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
