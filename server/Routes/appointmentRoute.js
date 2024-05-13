const express = require('express');
const appointmentController = require('../Controllers/appointmentContoller');
const authController = require('../Controllers/authController');

const router = express.Router();
router.get(
  '/my-appointments',
  authController.protectpatient,
  appointmentController.getMyAppointments,
);
router.use(authController.protectdoctor);
router
  .route('/')
  .get(appointmentController.getAllAppointments)
  .post(
    authController.restrictTo('doctor'),
    appointmentController.setPatientDoctorIDs,
    appointmentController.createAppointment,
  );

router
  .route('/:id')
  .get(appointmentController.getAppointment)
  .delete(appointmentController.deleteAppointment)
  .patch(appointmentController.updateAppointment);
// router.get('/', userController.getAllUsers);

module.exports = router;
