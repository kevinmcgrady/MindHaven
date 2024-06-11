import { Journal } from '@prisma/client';

import { formatDate } from '@/lib/formatDate';

import ListenButton from '../ListenButton';
import { Badge } from '../ui/badge';

type JournalCardProps = {
  title?: string;
  journal: Journal;
};

const JournalCard = ({ title, journal }: JournalCardProps) => {
  return (
    <div>
      {title && (
        <h2 className='font-light text-muted-foreground mb-2'>{title}</h2>
      )}

      <h3 className='font-semibold mb-2 text-lg'>{journal.title}</h3>
      <p className='mb-4 text-muted-foreground'>&quot;{journal.entry}&quot;</p>

      <div className='flex items-center justify-between'>
        <p className='text-xs'>{formatDate(journal.createdAt)}</p>
        <Badge variant='outline'>{journal.mood}</Badge>
      </div>

      <ListenButton journal={journal} />
    </div>
  );
};

export default JournalCard;
