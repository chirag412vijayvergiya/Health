import toast from 'react-hot-toast';
import { createReview as createReviewApi } from '../../services/apiReviews';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useCreateReview() {
  const queryClient = useQueryClient();
  const { mutate: createReview, isPending: isCreating } = useMutation({
    mutationFn: createReviewApi,
    onSuccess: (data) => {
      toast.success('Review successfully created!');
      queryClient.invalidateQueries({
        queryKey: ['Reviews'],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { createReview, isCreating };
}
