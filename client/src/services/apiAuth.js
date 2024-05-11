import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-hot-toast';

export async function patientsignup({ fullName, email, password }) {
  try {
    const response = await axios.post(
      '/api/v1/patient/signup',
      {
        name: fullName,
        email,
        password,
        passwordConfirm: password,
      },
      { withCredentials: true },
    );

    if (response.status >= 200 && response.status < 300) {
      const token = response.data.token;
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      console.log(axios.defaults.headers.common['Authorization']);
      console.log('At the time of sign up :- ', response.data);
      console.log('same :- ', token);
      // Redirect to login page after successful registration
    }
  } catch (err) {
    console.error(err);
    toast.error(err.message);
  }
}

export async function getCurrentUser() {
  try {
    const token = Cookies.get('jwt-client');
    console.log(token);
    const response = await axios.get(
      'http://127.0.0.1:8000/api/v1/patient/me',
      {
        withCredentials: true, // Correct syntax for withCredentials option
        headers: {
          Authorization: `Bearer ${token}`, // Include JWT token in headers
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching user data: ', error);
    throw new Error('Failed to fetch user data');
  }
}
