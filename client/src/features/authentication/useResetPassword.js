import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { resetPassword as resetPasswordApi } from '../../services/apiCommonUser';
import { useNavigate } from 'react-router-dom';

export function useResetPassword() {
  const navigate = useNavigate();
  const { mutate: resetPassword, isPending: isReseting } = useMutation({
    mutationFn: resetPasswordApi,
    onSuccess: (data) => {
      toast.success('Your password has been reset!');
      navigate('/dashboard', { replace: true });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { resetPassword, isReseting };
}
