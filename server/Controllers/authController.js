const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
// const User = require('../models/doctorModel');
const patient = require('../models/patientModel');
const doctor = require('../models/doctorModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const sendEmail = require('../utils/email');

// ******************************************************************************* //

// This function will generate json web token based on the given id
const signToken = (id) =>
  //payload includes the id
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

// ******************************************************************************* //

//This function is responsible for creating a JWT using the signToken function and sending it to the client in the form of a cookie.
const createSendToken = (model, statusCode, res) => {
  const token = signToken(model._id);
  const cookiesOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') cookiesOptions.secure = true;

  res.cookie('jwt', token, cookiesOptions);

  model.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      model,
    },
  });
};

// ******************************************************************************* //

// For new user
const signup = async (req, res, model, next) => {
  const newUser = await model.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    // phone: req.body.phone,
    // BloodGroup: req.body.BloodGroup,
  });

  createSendToken(newUser, 201, res);
};

// For signup Doctor
exports.signupdoctor = catchAsync(async (req, res, next) => {
  await signup(req, res, doctor, next);
});

// For signup Patient
exports.signuppatient = catchAsync(async (req, res, next) => {
  await signup(req, res, patient, next);
});

// ******************************************************************************* //
// For logging in
const login = async (req, res, model, next) => {
  const { email, password } = req.body;
  //check if email or password exist
  if (!email || !password) {
    return next(new AppError('Please provide email or password', 400));
  }

  //Check if user exist and password is correct
  // It query to find a document where the email field matches the specified the value
  const user = await model.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password'));
  }
  // 3) If everything ok, send token to client
  createSendToken(user, 200, res);
};

// For login Doctor
exports.logindoctor = catchAsync(async (req, res, next) => {
  await login(req, res, doctor, next);
});

// For login Patient
exports.loginpatient = catchAsync(async (req, res, next) => {
  await login(req, res, patient, next);
});

// ******************************************************************************* //

const protect = async (req, res, model, next) => {
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
  // console.log(decoded);

  //3) check if user still exist
  const currentUser = await model.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401,
      ),
    );
  }

  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again.', 401),
    );
  }
  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
};

// For protect Doctor
exports.protectdoctor = catchAsync(async (req, res, next) => {
  await protect(req, res, doctor, next);
});

// For protect Patient
exports.protectpatient = catchAsync(async (req, res, next) => {
  await protect(req, res, patient, next);
});

// ******************************************************************************* //

// Give different permissions to different users
exports.restrictTo =
  (...roles) =>
  (req, res, next) => {
    // roles ['admin', 'lead-guide']. role='user'
    console.log(req.user.role);
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403),
      );
    }

    next();
  };

// ******************************************************************************* //

const forgotPassword = async (req, res, model, UserUrl, next) => {
  //Get's User based on Posted email
  const user = await model.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('There is no user with email address.', 404));
  }

  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3) Send it to user's email
  const resetURL = `${req.protocol}://${req.get(
    'host',
  )}/api/v1/${UserUrl}/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;
  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token (valid for 10 min)',
      message,
    });

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError('There was an error sending the email. Try again later!'),
      500,
    );
  }
};

// For forgotPassword Doctor
exports.forgotPasswordDoctor = catchAsync(async (req, res, next) => {
  await forgotPassword(req, res, doctor, 'doctor', next);
});

// For forgotPassword Patient
exports.forgotPasswordPatient = catchAsync(async (req, res, next) => {
  await forgotPassword(req, res, patient, 'patient', next);
});

// ******************************************************************************* //

const resetPassword = async (req, res, model, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await model.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2) If token has not expired, and there is user, set the new password
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 3) Update changedPasswordAt property for the user
  user.passwordChangedAt = Date.now();
  // 4) Log the user in, send JWT
  createSendToken(user, 200, res);
};

// For resetPassword Doctor
exports.resetPasswordDoctor = catchAsync(async (req, res, next) => {
  await resetPassword(req, res, doctor, next);
});

// For resetPassword Patient
exports.resetPasswordPatient = catchAsync(async (req, res, next) => {
  await resetPassword(req, res, patient, next);
});

// ******************************************************************************* //

const updatePassword = async (req, res, model, next) => {
  // 1) Get user from collection
  const user = await model.findById(req.user.id).select('+password');

  // 2) Check if POSTed current password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError('Your current password is wrong.', 401));
  }
  // 3) If so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  // 4) Log user in, send JWT
  createSendToken(user, 200, res);
};

// For updatePassword Doctor
exports.updatePasswordDoctor = catchAsync(async (req, res, next) => {
  await updatePassword(req, res, doctor, next);
});

// For updatePassword Patient
exports.updatePasswordPatient = catchAsync(async (req, res, next) => {
  await updatePassword(req, res, patient, next);
});

// ******************************************************************************* //

/*
// ******************************************************************************* //

// This function will generate json web token based on the given id
const signToken = (id) =>
  //payload includes the id
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

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
  // console.log(decoded);

  //3) check if user still exist
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401,
      ),
    );
  }

  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again.', 401),
    );
  }
  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
});

// ******************************************************************************* //

// Give different permissions to different users
exports.restrictTo =
  (...roles) =>
  (req, res, next) => {
    // roles ['admin', 'lead-guide']. role='user'
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403),
      );
    }

    next();
  };

// ******************************************************************************* //

exports.forgotPassword = catchAsync(async (req, res, next) => {
  //Get's User based on Posted email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('There is no user with email address.', 404));
  }

  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3) Send it to user's email
  const resetURL = `${req.protocol}://${req.get(
    'host',
  )}/api/v1/patient/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;
  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token (valid for 10 min)',
      message,
    });

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError('There was an error sending the email. Try again later!'),
      500,
    );
  }
});

// ******************************************************************************* //

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2) If token has not expired, and there is user, set the new password
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 3) Update changedPasswordAt property for the user
  user.passwordChangedAt = Date.now();
  // 4) Log the user in, send JWT
  createSendToken(user, 200, res);
});

// ******************************************************************************* //

exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await User.findById(req.user.id).select('+password');

  // 2) Check if POSTed current password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError('Your current password is wrong.', 401));
  }
  // 3) If so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  // 4) Log user in, send JWT
  createSendToken(user, 200, res);
});

// ******************************************************************************* //
*/
