// import Cookies from 'js-cookie';
import customFetch from '../utils/customFetch';

// Appointments only of authenitcated user
export async function getAppointments() {
  try {
    const response = await customFetch.get('/appointment/my-appointments');
    return response.data.data.appointment;
  } catch (error) {
    console.error('Error fetching appointments: ', error);
    throw new Error('Failed to fetch Appointments');
  }
}

export async function getOneAppointmentPatient(appointmentId) {
  try {
    console.log(appointmentId);
    const response = await customFetch.get(`/appointment/${appointmentId}`);
    console.log(response.data);
    return response.data.data.appointment;
  } catch (err) {
    console.error('Error fetching Appointment: ', err);
    throw new Error('Failed to fetch Appointment');
  }
}

// Appointments of all users for Dashboard
export async function getAllAppointments() {
  try {
    const response = await customFetch.get('/appointment');
    return response.data;
  } catch (error) {
    console.error('Error fetching appointments: ', error);
    throw new Error('Failed to fetch Appointments');
  }
}
