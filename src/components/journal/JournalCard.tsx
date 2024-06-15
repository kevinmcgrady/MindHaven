import { Journal } from '@prisma/client';

import { cn } from '@/lib/utils';
import { formatDate } from '@/utils/formatDate';

import ListenButton from '../ListenButton';
import { Badge } from '../ui/badge';

type JournalCardProps = {
  title?: string;
  journal: Journal;
  dense?: boolean;
};

const JournalCard = ({ title, journal, dense = false }: JournalCardProps) => {
  return (
    <div>
      {title && (
        <h2 className='font-light text-muted-foreground mb-2'>{title}</h2>
      )}

      <h3 className='font-semibold mb-2 text-lg'>{journal.title}</h3>
      {!dense && (
        <p className='mb-4 text-muted-foreground'>
          &quot;{journal.entry}&quot;
        </p>
      )}
      <div className={cn('flex items-center justify-between')}>
        <p className='text-xs'>{formatDate(journal.createdAt)}</p>
        <Badge variant='outline'>{journal.mood}</Badge>
      </div>
      <ListenButton journal={journal} />
    </div>
  );
};

export default JournalCard;
