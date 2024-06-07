const jwt = require('jsonwebtoken');

const signToken = (id) =>
  //payload includes the id
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

// ******************************************************************************* //

//This function is responsible for creating a JWT using the signToken function and sending it to the client in the form of a cookie.
const createSendToken = (model, statusCode, res) => {
  //   console.log('createSendToken', model);
  const token = signToken(model._id);
  const cookiesOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    // expires: new Date(Date.now() + 1 * 60 * 1000), // 1 minute from now

    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Set secure attribute based on environment
    sameSite: 'None', // Set sameSite attribute
    // domain: 'ocalhost', // Set domain to localhost
    // domain: 'jeevan-frontend.vercel.app',
  };
  const userRoleOptions = {
    expires: cookiesOptions.expires,
    httpOnly: false,
    secure: cookiesOptions.secure,
    sameSite: cookiesOptions.sameSite,
    domain: process.env.NODE_ENV === 'production' ? '.vercel.app' : 'localhost',
  };

  res.cookie('jwt', token, cookiesOptions);
  res.cookie('userRole', model.role, userRoleOptions);

  model.password = undefined;

  //   res.status(statusCode).json({
  //     status: 'success',
  //     token,
  //     data: {
  //       model,
  //     },
  //   });
  // It's important to redirect after setting the cookie
  //   res.redirect('http://localhost:5173/dashboard');
};

module.exports = { signToken, createSendToken };
