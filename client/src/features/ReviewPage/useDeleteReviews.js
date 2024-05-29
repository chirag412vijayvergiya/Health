import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteReview as deleteReviewApi } from '../../services/apiReviews';
import toast from 'react-hot-toast';
export function useDeleteReviews() {
  const queryClient = useQueryClient();
  const { isPending: isDeleting, mutate: deleteReview } = useMutation({
    mutationFn: deleteReviewApi,
    onSuccess: () => {
      toast.success('Review successfully deleted');

      queryClient.invalidateQueries({
        queryKey: ['Reviews'],
      });
      queryClient.invalidateQueries({
        queryKey: ['ReviewDoctor'],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteReview };
}
