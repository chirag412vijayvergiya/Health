import { useQuery } from '@tanstack/react-query';
import { GetDoctorsCount } from '../../services/apiDoctor';

export function useGetDoctorsCount() {
  const { isPending, data: DoctorsCount } = useQuery({
    queryKey: ['DoctorsCount'],
    queryFn: GetDoctorsCount,
    retry: 0,
  });

  return { isPending, DoctorsCount };
}
