import { useQuery } from '@tanstack/react-query';
import { getAppointments } from '../../services/apiAppointments';

export function useAppointments() {
  const {
    data: appointments,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['appointments'],
    queryFn: getAppointments,
  });
  return { appointments, error, isLoading };
}
