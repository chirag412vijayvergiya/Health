import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getAppointments } from '../../services/apiAppointments';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/constants';

export function useAppointments() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const sortByRaw = searchParams.get('sortBy') || 'Date-desc';
  const [field, direction] = sortByRaw.split('-');
  const sortBy = { field, direction };

  // PAGINATION
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  const {
    data: { data: appointments, count } = {},
    error,
    isLoading,
  } = useQuery({
    queryKey: ['appointments', page, sortBy],
    queryFn: () => getAppointments({ page, sortBy }),
  });

  // PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ['appointments', page + 1, sortBy],
      queryFn: () => getAppointments({ page: page + 1, sortBy }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ['appointments', page - 1, sortBy],
      queryFn: () => getAppointments({ page: page - 1, sortBy }),
    });

  return { appointments, error, isLoading, count };
}
