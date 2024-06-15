// import Cookies from 'js-cookie';
import customFetch from '../utils/customFetch';
import { PAGE_SIZE } from '../utils/constants';
import { isAfter } from 'date-fns';

export async function getAppointments({ page, sortBy }) {
  try {
    // console.log('from api :- ', page, sortBy);
    const response = await customFetch.get('/appointment/my-appointments');
    let appointments = response.data.data.appointment;

    // Apply sorting
    if (sortBy) {
      sortBy.field === 'payment'
        ? (sortBy.field = 'doctor.fees')
        : (sortBy.field = 'appointmentDate');
      appointments.sort((a, b) => {
        const fieldA = sortBy.field
          .split('.')
          .reduce((obj, key) => obj[key], a);
        const fieldB = sortBy.field
          .split('.')
          .reduce((obj, key) => obj[key], b);
        // console.log(fieldA, fieldB, sortBy.direction);
        if (fieldA < fieldB) return sortBy.direction === 'asc' ? -1 : 1;
        if (fieldA > fieldB) return sortBy.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    //  Apply pagination
    let paginatedAppointments = appointments;
    if (page) {
      const from = (page - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE;
      paginatedAppointments = appointments.slice(from, to);

      return { data: paginatedAppointments, count: appointments.length };
    }
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
export async function getappointmentsAfterDate(date) {
  try {
    const response = await customFetch.get('/appointment');
    const allAppointments = response.data;
    // console.log(allAppointments);
    const result = allAppointments.result;
    console.log(result);
    const filterDate = new Date(date);
    // // Filter appointments that have appointmentDate after the provided date
    const filteredAppointments = allAppointments.data.data.filter(
      (appointment) => {
        const appointmentDate = new Date(appointment.appointmentDate);
        return isAfter(appointmentDate, filterDate);
      },
    );
    // console.log({ data: filteredAppointments });
    return { data: { filteredAppointments, result } };
  } catch (error) {
    // console.error('Error fetching appointments: ', error);
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
