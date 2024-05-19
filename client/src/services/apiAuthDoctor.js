import customFetch from '../utils/customFetch';
import Cookies from 'js-cookie';

export async function doctorLogin({ email, password }) {
  try {
    const response = await customFetch.post('/doctor/login', {
      email,
      password,
    });
    const userRole = response.data.data.model.role;
    Cookies.set('userRole', userRole, { expires: 7 });
    return response.data;
  } catch (error) {
    console.error('Error logging in: ', error);
    throw new Error('Failed to login');
  }
}
