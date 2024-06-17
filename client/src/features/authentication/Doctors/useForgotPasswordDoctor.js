import { useMutation } from '@tanstack/react-query';
import { forgotPasswordDoctor as forgotPasswordApi } from '../../../services/apiAuthDoctor';
import toast from 'react-hot-toast';

export function useForgotPasswordDoctor() {
  const { mutate: forgotPasswordDoctor, isPending: isSending2 } = useMutation({
    mutationFn: forgotPasswordApi,
    onSuccess: (data) => {
      toast.success('Reset token sent to your email address!');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { isSending2, forgotPasswordDoctor };
}
