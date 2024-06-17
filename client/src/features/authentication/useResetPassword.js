import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { resetPassword as resetPasswordApi } from '../../services/apiCommonUser';

export function useResetPassword() {
  const { mutate: resetPassword, isPending: isReseting } = useMutation({
    mutationFn: resetPasswordApi,
    onSuccess: (data) => {
      toast.success('Your password has been reset!');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { resetPassword, isReseting };
}
