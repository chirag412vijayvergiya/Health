import Cookies from 'js-cookie';
import { toast } from 'react-hot-toast';
import customFetch from '../utils/customFetch';

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
    // const userRole = res.data.data.model.role;
    // Cookies.set('userRole', userRole, { expires: 7 });
    return res.data;
  } catch (err) {
    console.error(err);
    // toast.error(err.message);
    throw new Error('Failed to signup');
  }
}

export async function getCurrentUser() {
  try {
    let role = Cookies.get('userRole');
    if (!role) role = await getRole();
    if (role === 'admin') role = 'doctor';
    const response = await customFetch.get(`/${role}/me`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data: ', error);
    throw new Error('Failed to fetch user data');
  }
}

export async function updatePateintData({ fullName, Gender, photo }) {
  try {
    const token = Cookies.get('jwt-client');
    let role = Cookies.get('userRole');
    if (role === 'admin') role = 'doctor';
    const formdata = new FormData();
    formdata.append('name', fullName);
    formdata.append('gender', Gender);
    formdata.append('photo', photo);

    for (let [key, value] of formdata.entries()) {
      console.log(key, value);
    }
    const response = await customFetch.patch(`/${role}/updateMe`, formdata, {
      withCredentials: true, // Include cookies in the request
      headers: {
        Authorization: `Bearer ${token}`, // Include JWT token in headers
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data: ', error);
    throw new Error('Failed to fetch user data');
  }
}

export async function Patientlogout() {
  let role = Cookies.get('userRole');
  if (role === 'admin') role = 'doctor';
  const res = await customFetch.get(`/${role}/logout`, {
    withCredentials: true,
  });
  console.log(res.data);
  Cookies.remove('userRole');
  return res.data;
}

async function getRole() {
  try {
    const response = await customFetch.get('/patient/no-role');
    console.log(response.data.data);
    return response;
  } catch (error) {
    console.error('Error fetching patient data: ', error);
    throw new Error('Failed to fetch patient data');
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
    // const userRole = response.data.data.model.role;
    // Cookies.set('userRole', userRole, { expires: 7 });
    console.log(response.data.data.model.role);
    return response.data;
  } catch (error) {
    console.error('Error logging in: ', error);
    throw new Error('Failed to login');
  }
}
