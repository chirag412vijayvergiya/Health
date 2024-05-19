import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../../../services/apiAuthPatient';
import Cookies from 'js-cookie';
export function useUser() {
  const { isPending, data: user } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
    retry: 0,
  });

  return { isPending, user, isAuthenticated: user?.status };
}
