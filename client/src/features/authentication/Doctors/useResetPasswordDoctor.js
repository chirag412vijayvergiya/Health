import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { resetPasswordDoctor as resetPasswordApi } from '../../../services/apiAuthDoctor';
import { useNavigate } from 'react-router-dom';

export function useResetPasswordDoctor() {
  const navigate = useNavigate();
  const { mutate: resetPasswordDoctor, isPending: isReseting2 } = useMutation({
    mutationFn: resetPasswordApi,
    onSuccess: (data) => {
      toast.success('Your password has been reset!');
      navigate('/dashboard', { replace: true });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { isReseting2, resetPasswordDoctor };
}
