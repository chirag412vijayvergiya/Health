import customFetch from '../utils/customFetch';

export async function GetPatientCount() {
  try {
    const response = await customFetch.get('/patient/patientCount');
    return response.data.data;
  } catch (error) {
    console.error("Error Getting Doctor's Count: ", error);
    throw new Error("Failed to Get doctor's Count");
  }
}
