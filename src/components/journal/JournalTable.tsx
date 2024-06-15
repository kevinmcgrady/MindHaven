import { Journal } from '@prisma/client';
import { Fragment } from 'react';

import { moods } from '@/constants/moods';

import { Separator } from '../ui/separator';
import JournalCard from './JournalCard';

type JournalTableProps = {
  journals: Journal[];
};

const JournalTable = ({ journals }: JournalTableProps) => {
  return (
    <div className='space-y-4'>
      {journals.map((journal, index) => {
        const badgeColor = moods.find(
          (mood) => mood.name === journal.mood.toLowerCase(),
        )?.color;
        return (
          <Fragment key={journal.id}>
            <JournalCard badgeColor={badgeColor!} dense journal={journal} />
            {index !== journals.length - 1 && <Separator />}
          </Fragment>
        );
      })}
    </div>
  );
};

export default JournalTable;
