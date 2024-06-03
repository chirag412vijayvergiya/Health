// import Cookies from 'js-cookie';
import customFetch from '../utils/customFetch';

// Appointments only of authenitcated user
// Done
export async function getAppointments() {
  try {
    const response = await customFetch.get('/appointment/my-appointments');
    return response.data.data.appointment;
  } catch (error) {
    console.error('Error fetching appointments: ', error);
    throw new Error('Failed to fetch Appointments');
  }
}

// Done
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
// Done
export async function getAllAppointments() {
  try {
    const response = await customFetch.get('/appointment');
    return response.data;
  } catch (error) {
    console.error('Error fetching appointments: ', error);
    throw new Error('Failed to fetch Appointments');
  }
}

// Done
export async function createAppointment({ data }) {
  try {
    console.log('from api :- ', data);
    const response = await customFetch.post('/appointment/book-appointment', {
      data,
    });
    console.log(response.data.session);
    return response.data.session;
  } catch (error) {
    // console.error('Error creating appointment: ', error.response.data.message);
    throw new Error(error.response.data.message);
  }
}
