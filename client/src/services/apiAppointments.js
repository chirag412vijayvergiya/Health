import Cookies from 'js-cookie';
import customFetch from '../utils/customFetch';
export async function getAppointments() {
  try {
    const token = Cookies.get('jwt-client');
    const response = await customFetch.get('/appointment/my-appointments', {
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
