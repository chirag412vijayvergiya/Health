import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { UpdateUserPassword } from '../../../services/apiCommonUser';

export function useUpdateUserPassword() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: UpdateUserPassword,
    onSuccess: () => {
      toast.success('User password successfully updated');
      //   queryClient.setQueryData(['user'], user);
      queryClient.invalidateQueries('user');
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateUser, isUpdating };
}
