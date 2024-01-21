const express = require('express');
const appointmentController = require('../Controllers/appointmentContoller');

const router = express.Router();

router
  .route('/')
  .get(appointmentController.getAllAppointments)
  .post(appointmentController.createAppointment);

router
  .route('/:id')
  .get(appointmentController.getAppointment)
  .delete(appointmentController.deleteAppointment)
  .patch(appointmentController.updateAppointment);
// router.get('/', userController.getAllUsers);

module.exports = router;
