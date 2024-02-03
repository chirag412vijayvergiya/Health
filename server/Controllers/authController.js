const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/patientModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const { promisify } = require('util');

// ******************************************************************************* //

// This function will generate json web token based on the given id
const signToken = (id) => {
  //payload includes the id
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// ******************************************************************************* //

//This function is responsible for creating a JWT using the signToken function and sending it to the client in the form of a cookie.
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookiesOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') cookiesOptions.secure = true;

  res.cookie('jwt', token, cookiesOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

// ******************************************************************************* //

// For new user
exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    phone: req.body.phone,
    BloodGroup: req.body.BloodGroup,
  });

  createSendToken(newUser, 201, res);
});

// ******************************************************************************* //
// For logging in
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //check if email or password exist
  if (!email || !password) {
    return next(new AppError('Please provide email or password', 400));
  }

  //Check if user exist and password is correct
  // It query to find a document where the email field matches the specified the value
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password'));
  }
  // 3) If everything ok, send token to client
  createSendToken(user, 200, res);
});

// ******************************************************************************* //

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401),
    );
  }

  //Verification token
  // promisify converts callback-based functions into promise-based functions.
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
});
