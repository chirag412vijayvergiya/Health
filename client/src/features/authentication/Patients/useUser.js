import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../../../services/apiCommonUser';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

export function useUser() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const userRole = Cookies.get('userRole');
    if (userRole) {
      setRole(userRole === 'admin' ? 'doctor' : userRole);
    }
  }, []);

  const { isPending, data: user } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
    enabled: !!role,
    retry: 0,
  });

  return { isPending, user, isAuthenticated: user?.status };
}
