import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getOneAppointmentPatient } from '../../services/apiAppointments';

export function useAppointment() {
  const { appointmentId } = useParams();
  console.log(appointmentId);
  const {
    isPending,
    data: appointment,
    error,
  } = useQuery({
    queryKey: ['Appointment', appointmentId],
    queryFn: () => getOneAppointmentPatient(appointmentId),
    retry: false,
  });

  return { isPending, appointment, error };
}
