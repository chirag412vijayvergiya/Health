const Review = require('../models/reviewModel');
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
