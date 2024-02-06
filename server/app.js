const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit'); // Limit requests from same API
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const AppError = require('./utils/AppError');

//
//const userRoute = require('./Routes/userRoute');
const doctorRoute = require('./Routes/doctorRoute');
const patientRoute = require('./Routes/patientRoute');
const appointmentRoute = require('./Routes/appointmentRoute');
const GlobalErrorHandler = require('./Controllers/errorController');

const app = express();
// ******************************************************************************* //

// GLOBAL MIDDLEWARES
// Set security HTTP headers :-  A powerful allow-list of what can happen on your page which mitigates many attacks
app.use(helmet());

// ******************************************************************************* //

// Morgen is logging MIDDLEWARE that log the HTTP request
if (process.env.NODE_ENV === 'development') {
  //(dev) is a predefined log format
  app.use(morgan('dev'));
}

// ******************************************************************************* //

// GLOBAL MIDDLEWARES
// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000, // 60 minutes
  message: 'Too many requests from this IP, please try again in an hour!',
});

// '/api' will affect the all routes which start from api url
app.use('/api', limiter);

// ******************************************************************************* //

//It should be used before route defined
//the parsed JSON data is converted into a JavaScript object
// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// ******************************************************************************* //

// Data sanitization against NoSQL query injection like $ or . malicious characters
app.use(mongoSanitize());

// ******************************************************************************* //

// Data sanitization of user input against XSS
//This function removes or escapes malicious code
app.use(xss());

// ******************************************************************************* //

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`),
// );

// app.use((req, res, next) => {
//   console.log('Hello from the middleware 👋');
//   next();
// });

app.use('/api/v1/patient', patientRoute);
app.use('/api/v1/doctor', doctorRoute);
app.use('/api/v1/appointment', appointmentRoute);

//For other route which we have not defned!
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(GlobalErrorHandler);
module.exports = app;
