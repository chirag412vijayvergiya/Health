import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../../../services/apiAuth';

export function useUser() {
  const { isPending, data: user } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
  });

  return { isPending, user, isAuthenticated: user?.status };
}
