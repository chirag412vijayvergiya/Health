const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/patientModel');
const catchAsync = require('../utils/catchAsync');

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
