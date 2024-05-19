import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateReview } from '../../services/apiReviews';
import toast from 'react-hot-toast';

export function useUpdateReview() {
  const queryClient = useQueryClient();

  const { mutate: updatedReview, isPending: isUpdating } = useMutation({
    mutationFn: updateReview,
    onSuccess: () => {
      toast.success('Review successfully updated');
      queryClient.invalidateQueries('Reviews');
    },
    onError: (err) => toast.error(err.message),
  });

  return { updatedReview, isUpdating };
}
