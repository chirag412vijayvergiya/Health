import axios from 'axios';

export async function getDoctors() {
  try {
    const response = await axios.get(
      'http://127.0.0.1:8000/api/v1/doctor/all-doctors',
    );
    return response.data.data.data;
  } catch (error) {
    console.error('Error fetching doctors: ', error);
    throw new Error('Failed to fetch doctors');
  }
}
