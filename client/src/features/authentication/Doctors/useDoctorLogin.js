import { useMutation } from '@tanstack/react-query';
import { doctorLogin as loginApi } from '../../../services/apiAuthDoctor';
import { useNavigate } from 'react-router-dom';

import toast from 'react-hot-toast';

export function useDoctorLogin() {
  const navigate = useNavigate();

  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (data) => {
      navigate('/dashboard', { replace: true });
    },
    onError: (err) => {
      console.log('ERROR', err);
      toast.error('Provided email or password are incorrect');
    },
  });

  return { login, isPending };
}
