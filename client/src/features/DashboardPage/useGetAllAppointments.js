import { useQuery } from '@tanstack/react-query';
import { getAllAppointments } from '../../services/apiAppointments';

export function useGetAllAppointments() {
  const { isPending, data: GetAppointments } = useQuery({
    queryKey: ['AppointmentsDashboard'],
    queryFn: getAllAppointments,
    retry: 0,
  });
  return { isPending, GetAppointments };
}
