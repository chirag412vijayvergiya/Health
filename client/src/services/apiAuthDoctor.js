import customFetch from '../utils/customFetch';
import Cookies from 'js-cookie';

export async function doctorLogin({ email, password }) {
  try {
    const response = await customFetch.post('/doctor/login', {
      email,
      password,
    });
    const userRole = response.data.data.model.role;
    Cookies.set('userRole', userRole, { expires: 90 });
    return response.data;
  } catch (error) {
    console.error('Error logging in: ', error);
    throw new Error('Failed to login');
  }
}

export async function forgotPasswordDoctor({ email }) {
  try {
    console.log('email from api Doctor:- ', email);
    const response = await customFetch.post('/doctor/forgotPassword', {
      email,
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error: ', error);
    throw new Error('Failed to Send Reset token to Email Address');
  }
}

export async function resetPasswordDoctor({
  password,
  passwordConfirm,
  token,
}) {
  try {
    console.log('email from api Doctor:- ', password, passwordConfirm, token);
    const response = await customFetch.patch(`/doctor/resetPassword/${token}`, {
      password,
      passwordConfirm,
    });

    Cookies.set('userRole', 'doctor', { expires: 90 });
    return response.data;
  } catch (error) {
    console.error('Error: ', error);
    throw new Error('Failed to Reset Password');
  }
}
