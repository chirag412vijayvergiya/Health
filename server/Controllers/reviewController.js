const Review = require('../models/reviewModel');
const factory = require('./handleFactory');

exports.getAllReview = factory.getAll(Review);

exports.setdoctorpatientIds = (req, res, next) => {
  //Allows nested routes
  if (!req.body.doctor) req.body.doctor = req.params.doctorId;
  if (!req.body.patient) req.body.patient = req.patient.id;
  next();
};

exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
