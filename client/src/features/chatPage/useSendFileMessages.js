import { useMutation, useQueryClient } from '@tanstack/react-query';
import { sendFileMessage } from '../../services/apiMessages';
import toast from 'react-hot-toast';

export function useSendFileMessage() {
  const queryClient = useQueryClient();
  const { mutate: sendFile, isPending: isSending } = useMutation({
    mutationFn: sendFileMessage,
    onSuccess: (data) => {
      toast.success('file successfully sent!');
      queryClient.invalidateQueries('messages');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { isSending, sendFile };
}
