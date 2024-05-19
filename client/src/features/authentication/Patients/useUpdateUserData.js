import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserData } from '../../../services/apiCommonUser';
import toast from 'react-hot-toast';

export function useUpdateUserData() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: updateUserData,
    onSuccess: () => {
      toast.success('User account successfully updated');
      //   queryClient.setQueryData(['user'], user);
      queryClient.invalidateQueries('user');
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateUser, isUpdating };
}
