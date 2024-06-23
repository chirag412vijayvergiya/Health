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

export async function GetPatientList() {
  try {
    const response = await customFetch.get('/patient');
    console.log('Response from getPatients:', response.data);
    return response.data.data.data;
  } catch (error) {
    console.error("Error Getting Doctor's List: ", error);
    throw new Error("Failed to Get doctor's List");
  }
}
