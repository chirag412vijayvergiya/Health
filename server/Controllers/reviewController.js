const Review = require('../models/reviewModel');
// const AppError = require('../utils/AppError');
// const catchAsync = require('../utils/catchAsync');
const factory = require('./handleFactory');

exports.getAllReview = factory.getAll(Review);

exports.setdoctorpatientIds = (req, res, next) => {
  //Allows nested routes
  if (!req.body.doctor) req.body.doctor = req.params.doctorId; // This come from url
  if (!req.body.patient) req.body.patient = req.user.id; // This actually comes from protect middleware
  next();
};

exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
exports.getMyReviews = async (req, res, next) => {
  const reviews = await Review.find({ patient: req.user.id }).populate({
    path: 'doctor',
    fields: 'name photo email rating review ',
  });
  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews,
    },
  });
  next();
};

/*
exports.deleteOneReview = catchAsync(async (req, res, next) => {
  // Find the appointment with the given ID and ensure it belongs to the logged-in user
  const appointment = await Review.findOneAndDelete({
    _id: req.params.id,
    patient: req.user.id,
  });

  // If the appointment does not exist or does not belong to the user, throw an error
  if (!appointment) {
    return next(
      new AppError(
        'No appointment found with that ID for the current user',
        404,
      ),
    );
  }

  // Find and delete the review associated with this appointment
  const review = await Review.findOneAndDelete({
    _id: appointment.review,
    patient: req.user.id,
  });

  // If the review does not exist, throw an error
  if (!review) {
    return next(
      new AppError(
        'No review found for this appointment for the current user',
        404,
      ),
    );
  }

  // Remove the reference to the review in the appointment document
  appointment.review = undefined;
  await appointment.save();

  // Respond with success message
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
*/
