import { Journal } from '@prisma/client';

import { Separator } from '../ui/separator';
import JournalCard from './JournalCard';

type JournalTableProps = {
  journals: Journal[];
};

const JournalTable = ({ journals }: JournalTableProps) => {
  return (
    <div className='space-y-4'>
      {journals.map((journal, index) => (
        <>
          <JournalCard dense journal={journal} />
          {index !== journals.length - 1 && <Separator />}
        </>
      ))}
    </div>
  );
};

export default JournalTable;
