import { useMutation, useQueryClient } from '@tanstack/react-query';
import { sendMessage as sendMessageApi } from '../../services/apiMessages';
import toast from 'react-hot-toast';

export function useSendMessage() {
  const queryClient = useQueryClient();
  const { mutate: sendMessages, isPending: isSending } = useMutation({
    mutationFn: sendMessageApi,
    onSuccess: (data) => {
      toast.success('Message successfully sent!');
      queryClient.invalidateQueries('messages');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { isSending, sendMessages };
}
