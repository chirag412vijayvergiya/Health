import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getDoctor } from '../../services/apiDoctor';

export function useDoctor() {
  const { doctorId } = useParams();

  const {
    isPending,
    data: doctor,
    error,
  } = useQuery({
    queryKey: ['doctor', doctorId],
    queryFn: () => getDoctor(doctorId),
    retry: false,
  });

  return { isPending, doctor, error };
}
