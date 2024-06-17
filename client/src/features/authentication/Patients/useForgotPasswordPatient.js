import { useMutation } from '@tanstack/react-query';
import { forgotPasswordPatient as forgotPasswordApi } from '../../../services/apiAuthPatient';
import toast from 'react-hot-toast';

export function useForgotPasswordPatient() {
  const { mutate: forgotPasswordPatient, isPending: isSending1 } = useMutation({
    mutationFn: forgotPasswordApi,
    onSuccess: (data) => {
      toast.success('Reset token sent to your email address!');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { isSending1, forgotPasswordPatient };
}
