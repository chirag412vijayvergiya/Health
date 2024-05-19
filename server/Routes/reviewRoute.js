const express = require('express');
const reviewController = require('../Controllers/reviewController');
const authController = require('../Controllers/authController');

// When mergeParams is set to true, it means that if the router is nested within another router,
//it will inherit the parameters from the parent router.

// It is because I am grabing doctorId from doctor route.
const router = express.Router({ mergeParams: true });

router.use(authController.protectpatient);
router.get('/my-reviews', reviewController.getMyReviews);
router
  .route('/')
  .get(reviewController.getAllReview)
  .post(
    authController.restrictTo('patient'),
    reviewController.setdoctorpatientIds,
    reviewController.createReview,
  );
router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(authController.restrictTo('patient'), reviewController.updateReview)
  .delete(authController.restrictTo('patient'), reviewController.deleteReview);

module.exports = router;
