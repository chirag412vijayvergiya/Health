import Cookies from 'js-cookie';
import { toast } from 'react-hot-toast';
import customFetch from '../utils/customFetch';

export async function patientsignup({ fullName, email, password }) {
  try {
    await customFetch.post(
      '/patient/signup',
      {
        name: fullName,
        email,
        password,
        passwordConfirm: password,
      },
      { withCredentials: true },
    );
  } catch (err) {
    console.error(err);
    toast.error(err.message);
  }
}

export async function getCurrentUser() {
  try {
    const token = Cookies.get('jwt-client');
    const response = await customFetch.get('/patient/me', {
      withCredentials: true, // Include cookies in the request
      headers: {
        Authorization: `Bearer ${token}`, // Include JWT token in headers
      },
    });

    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data: ', error);
    throw new Error('Failed to fetch user data');
  }
}

export async function updatePateintData({ fullName, Gender, photo }) {
  try {
    const token = Cookies.get('jwt-client');
    const form = new FormData();
    form.append('name', fullName);
    form.append('gender', Gender);
    form.append('photo', photo);

    const response = await customFetch.patch('/patient/updateMe', form, {
      withCredentials: true, // Include cookies in the request
      headers: {
        Authorization: `Bearer ${token}`, // Include JWT token in headers
      },
    });

    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data: ', error);
    throw new Error('Failed to fetch user data');
  }
}
