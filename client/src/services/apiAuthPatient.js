import customFetch from '../utils/customFetch';
import Cookies from 'js-cookie';
export async function patientsignup({ fullName, email, password }) {
  try {
    const res = await customFetch.post(
      '/patient/signup',
      {
        name: fullName,
        email,
        password,
        passwordConfirm: password,
      },
      { withCredentials: true },
    );
    const userRole = res.data.data.model.role;
    Cookies.set('userRole', userRole, { expires: 90 });
    return res.data;
  } catch (err) {
    console.error(err);
    // toast.error(err.message);
    throw new Error('Failed to signup');
  }
}

export async function patientLogin({ email, password }) {
  try {
    const response = await customFetch.post(
      `/patient/login`,
      {
        email,
        password,
      },
      { withCredentials: true },
    );
    console.log(response.data.data.model.role);
    const userRole = response.data.data.model.role;
    Cookies.set('userRole', userRole, { expires: 90 });
    return response.data;
  } catch (error) {
    console.error('Error logging in: ', error);
    throw new Error('Failed to login');
  }
}

export async function resetPasswordPatient({
  password,
  passwordConfirm,
  token,
}) {
  try {
    console.log('email from api Patient:- ', password, passwordConfirm, token);
    const response = await customFetch.patch(
      `/patient/resetPassword/${token}`,
      {
        password,
        passwordConfirm,
      },
    );
    Cookies.set('userRole', 'patient', { expires: 90 });
    return response.data;
  } catch (error) {
    console.error('Error: ', error);
    throw new Error('Failed to Reset Password');
  }
}

export async function forgotPasswordPatient({ email }) {
  try {
    console.log('email from api Patient:- ', email);
    const response = await customFetch.post('/patient/forgotPassword', {
      email,
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error: ', error);
    throw new Error('Failed to Send Reset token to Email Address');
  }
}
