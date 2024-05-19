import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Userlogout as logoutApi } from '././../../../services/apiCommonUser';

export function usePatientLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.resetQueries('user');
      navigate('/login', { replace: true });
    },
  });

  return { logout, isPending };
}
