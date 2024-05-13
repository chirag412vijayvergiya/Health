import { useQuery } from '@tanstack/react-query';
import { getDoctors } from '../../services/apiDoctor';

export function useDoctors() {
  const { isPending, data: doctors } = useQuery({
    queryKey: ['doctors'],
    queryFn: getDoctors,
  });

  return { isPending, doctors };
}
