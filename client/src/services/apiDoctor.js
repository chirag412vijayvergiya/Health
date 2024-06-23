import customFetch from '../utils/customFetch';

// Done
export async function getDoctors() {
  try {
    const response = await customFetch.get('/doctor/all-doctors');
    console.log('Response from getDoctors:', response.data);
    return response.data.data.data;
  } catch (error) {
    console.error('Error fetching doctors: ', error);
    throw new Error('Failed to fetch doctors');
  }
}

// Done
export async function getDoctor(doctorId) {
  try {
    const response = await customFetch.get(`/doctor/${doctorId}`);
    return response.data.data.data;
  } catch (error) {
    console.error('Error fetching doctor: ', error);
    throw new Error('Failed to fetch doctor');
  }
}

export async function GetDoctorsCount() {
  try {
    const response = await customFetch.get('/doctor/doctorCount');
    return response.data;
  } catch (error) {
    console.error("Error Getting Doctor's Count: ", error);
    throw new Error("Failed to Get doctor's Count");
  }
}
