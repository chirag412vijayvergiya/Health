const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/AppError');
//
//const userRoute = require('./Routes/userRoute');
const doctorRoute = require('./Routes/doctorRoute');
const patientRoute = require('./Routes/patientRoute');
const appointmentRoute = require('./Routes/appointmentRoute');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`),
// );

// app.use((req, res, next) => {
//   console.log('Hello from the middleware 👋');
//   next();
// });

app.use(express.json());
app.use('/api/v1/patient', patientRoute);
app.use('/api/v1/doctor', doctorRoute);
app.use('/api/v1/appointment', appointmentRoute);

//For other route which we have not defned!
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;
