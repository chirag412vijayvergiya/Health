import { useQuery } from '@tanstack/react-query';
import { getDoctors } from '../../services/apiDoctor';

// This is for all Doctors in the system
export function useDoctors() {
  const { isPending, data: doctors } = useQuery({
    queryKey: ['doctors'],
    queryFn: getDoctors,
  });

  return { isPending, doctors };
}
