import { useQuery } from '@tanstack/react-query';
import { GetPatientCount } from '../../services/apiPatient';

export function useGetPatientsCount() {
  const { isPending, data: PatientsCount } = useQuery({
    queryKey: ['PatinetCount'],
    queryFn: GetPatientCount,
    retry: 0,
  });

  return { isPending, PatientsCount };
}
