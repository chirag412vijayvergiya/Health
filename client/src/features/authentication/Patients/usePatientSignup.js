import { toast } from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { patientsignup as patientsignupApi } from './../../../services/apiAuth';

export function usePatinetSignup() {
  const navigate = useNavigate();
  const { mutate: signup, isPending } = useMutation({
    mutationFn: patientsignupApi,
    onSuccess: (user) => {
      toast.success(
        "Account successfully created! Please verufy the new account from the user's email address.",
      );
      navigate('/dashboard');
    },
  });

  return { signup, isPending };
}
