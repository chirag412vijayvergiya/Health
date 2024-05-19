import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePateintData } from '../../../services/apiAuthPatient';
import toast from 'react-hot-toast';

export function useUpdatePatient() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: updatePateintData,
    onSuccess: () => {
      toast.success('User account successfully updated');
      //   queryClient.setQueryData(['user'], user);
      queryClient.invalidateQueries('user');
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateUser, isUpdating };
}