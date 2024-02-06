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
  // stats is array of
  const stats = await this.aggregate([
    {
      $match: { doctor: doctorId },
    },
    {
      $group: {
        _id: '$doctor', // group the document by the doctor field
        nRating: { $sum: 1 }, // Calculating the total no of ratings
        avgRating: { $avg: '$rating' }, // Calculate the average rating for each doctor group by averaging the field within each group
      },
    },
  ]);
  //   console.log(stats);
  if (stats.length > 0) {
    await Doctor.findByIdAndUpdate(doctorId, {
      // Update ratingsQunatity and ratingsAverage
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating,
    });
  } else {
    await Doctor.findByIdAndUpdate(doctorId, {
      // if no doctor then doctor update use default things
      ratingsQuantity: 0,
      ratingsAverage: 4.5,
    });
  }
};

// ******************************************************************************* //

//The post-save middleware calculates average ratings for a doctor after a review is saved.
reviewSchema.post('save', function () {
  //call model constructor function (class)
  this.constructor.calcAverageRatings(this.doctor);
});

// ******************************************************************************* //

// This pre middleware is triggered before any query that starts with findOneAnd.
reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.findOne();
  //this.findOne() is used to execute the query and retrieve the document that matches the query conditions.
  //this.r stored the retrieved document
  // console.log(this.r);
  next();
});

// ******************************************************************************* //

// This pre middleware is triggered after any query that starts with findOneAnd.
reviewSchema.post(/^findOneAnd/, async function () {
  await this.r.constructor.calcAverageRatings(this.r.doctor);
});

// ******************************************************************************* //

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
