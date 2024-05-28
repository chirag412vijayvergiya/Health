import toast from 'react-hot-toast';
import { useMoveBack } from '../../hooks/useMoveBack';
import { createReview as createReviewApi } from '../../services/apiReviews';
import { useMutation } from '@tanstack/react-query';

export function useCreateReview() {
  const moveback = useMoveBack();
  const { mutate: createReview, isPending: isCreating } = useMutation({
    mutationFn: createReviewApi,
    onSuccess: (data) => {
      toast.success('Review successfully created!');
      moveback();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { createReview, isCreating };
}
