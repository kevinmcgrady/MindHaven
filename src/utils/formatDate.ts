import { format } from 'date-fns';

export const formatDate = (date: Date) => {
  return format(date, 'do MMM yyyy');
};
