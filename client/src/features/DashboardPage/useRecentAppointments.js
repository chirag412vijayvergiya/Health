import { useQuery } from '@tanstack/react-query';
import { subDays } from 'date-fns';
import { useSearchParams } from 'react-router-dom';
import { getappointmentsAfterDate } from '../../services/apiAppointments';

export function useRecentAppointments() {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get('last')
    ? 7
    : Number(searchParams.get('last'));
  const queryDate = subDays(new Date(), numDays).toISOString();
  console.log(queryDate);
  const { isLoading, data: appointments } = useQuery({
    queryFn: () => getappointmentsAfterDate(queryDate),
    queryKey: ['appointments', `last-${numDays}`],
  });

  return { isLoading, appointments, numDays };
}
