import { Journal } from '@prisma/client';
import { Fragment } from 'react';

import { Separator } from '../ui/separator';
import JournalCard from './JournalCard';

type JournalTableProps = {
  journals: Journal[];
};

const JournalTable = ({ journals }: JournalTableProps) => {
  return (
    <div className='space-y-4'>
      {journals.map((journal, index) => (
        <Fragment key={journal.id}>
          <JournalCard dense journal={journal} />
          {index !== journals.length - 1 && <Separator />}
        </Fragment>
      ))}
    </div>
  );
};

export default JournalTable;
