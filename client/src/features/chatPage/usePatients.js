import { useQuery } from '@tanstack/react-query';
import { GetPatientList } from '../../services/apiPatient';

// This is for all Doctors in the system
export function usePatients() {
  const { isPending, data: patients } = useQuery({
    queryKey: ['patients'],
    queryFn: GetPatientList,
  });

  return { isPending, patients };
}
