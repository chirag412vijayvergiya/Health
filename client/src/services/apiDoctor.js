import customFetch from '../utils/customFetch';

export async function getDoctors() {
  try {
    const response = await customFetch.get('/doctor/all-doctors');
    return response.data.data.data;
  } catch (error) {
    console.error('Error fetching doctors: ', error);
    throw new Error('Failed to fetch doctors');
  }
}

export async function getDoctor(doctorId) {
  try {
    const response = await customFetch.get(`/doctor/${doctorId}`);
    return response.data.data.data;
  } catch (error) {
    console.error('Error fetching doctor: ', error);
    throw new Error('Failed to fetch doctor');
  }
}
