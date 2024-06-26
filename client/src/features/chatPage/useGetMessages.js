import { useQuery } from '@tanstack/react-query';
import { GetMessages } from '../../services/apiMessages';

export function useGetMessages({ Role, page, selectedChatId }) {
  return useQuery({
    queryKey: ['messages', Role, selectedChatId?.['_id'], page],
    queryFn: () => GetMessages({ Role, page, selectedChatId }),
    enabled: !!selectedChatId && !!selectedChatId._id, // only run the query if selectedChatId is defined
    keepPreviousData: true,
  });
}
