import { useQuery } from '@tanstack/react-query';
import { getOneReviewByDoctor } from '../../services/apiReviews';
export function useGetReviewByDoctor(doctorId) {
  const {
    isPending,
    data: Review,
    error,
  } = useQuery({
    queryKey: ['ReviewDoctor', doctorId],
    queryFn: () => getOneReviewByDoctor(doctorId),
    retry: 0,
  });

  return { isPending, Review, error };
}
