import { useQuery } from '@tanstack/react-query';
import { getReviews } from '../../services/apiReviews';
export function useGetReviews() {
  const { isPending, data: Reviews } = useQuery({
    queryKey: ['Reviews'],
    queryFn: getReviews,
    retry: 0,
  });

  return { isPending, Reviews };
}
