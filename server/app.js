const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit'); // Limit requests from same API
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cors = require('cors');
const path = require('path');
const AppError = require('./utils/AppError');

// const session = require('express-session');

//
//const userRoute = require('./Routes/userRoute');
const doctorRouter = require('./Routes/doctorRoute');
const patientRouter = require('./Routes/patientRoute');
const appointmentRouter = require('./Routes/appointmentRoute');
const reviewRouter = require('./Routes/reviewRoute');
const GlobalErrorHandler = require('./Controllers/errorController');
const appointmentController = require('./Controllers/appointmentContoller');

const app = express();

app.enable('trust proxy');
app.use(cookieParser());
// Use express-session middleware

app.use('/users', express.static(path.join(__dirname, 'public/users')));

app.use(
  cors({
    origin: ['https://jeevan-frontend.vercel.app', 'http://localhost:5173'],
    credentials: true,
    headers: [
      'Content-Type',
      'Authorization',
      'X-Frame-Options',
      'access-control-allow-origin',
    ],
  }),
);

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

app.post(
  '/webhook-checkout',
  bodyParser.raw({ type: 'application/json' }),
  appointmentController.webhookCheckout,
);

//It should be used before route defined
//the parsed JSON data is converted into a JavaScript object
// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false }));
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

app.use('/api/v1/patient', patientRouter);
app.use('/api/v1/doctor', doctorRouter);
app.use('/api/v1/appointment', appointmentRouter);
app.use('/api/v1/reviews', reviewRouter);

//For other route which we have not defned!
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(GlobalErrorHandler);
module.exports = app;
