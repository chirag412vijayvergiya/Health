import { formatDistanceToNow } from 'date-fns';

export const formatRelativeTime = (date) => {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};
