import { toast } from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { patientsignup as patientsignupApi } from '../../../services/apiAuthPatient';

export function usePatinetSignup() {
  const navigate = useNavigate();
  const { mutate: signup, isPending } = useMutation({
    mutationFn: patientsignupApi,
    onSuccess: (user) => {
      toast.success('Account successfully created!');
      navigate('/dashboard');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { signup, isPending };
}
