import { format } from 'date-fns';
import Link from 'next/link';

import CardSection from '@/components/layout/CardSection';
import ProgressSection from '@/components/progress/ProgressSection';
import PageHeader from '@/components/site/PageHeader';
import { Button } from '@/components/ui/button';
import { urls } from '@/constants/urls';
import {
  getAllJournalCount,
  getJournalsByMonthAndYear,
} from '@/queries/journal';

const page = async () => {
  const currentMonth = format(new Date(), 'MMM');
  const currentYear = format(new Date(), 'yyyy');

  const journalCount = await getAllJournalCount();
  const usersJournals = await getJournalsByMonthAndYear(
    currentMonth,
    currentYear,
  );

  const hasCreatedAJournalBefore = journalCount && journalCount._count > 0;

  return (
    <div className='h-full flex flex-col'>
      <CardSection noSpacing>
        <PageHeader
          title='My Progress'
          description='You can track your monthly progress, based from your journals.'
        />
      </CardSection>

      {hasCreatedAJournalBefore && (
        <ProgressSection
          defaultJournals={usersJournals || []}
          defaultMonth={currentMonth}
          defaultYear={currentYear}
        />
      )}

      {!hasCreatedAJournalBefore && (
        <CardSection>
          <h2 className='mb-2 font-light text-muted-foreground'>
            Create your first journal
          </h2>
          <Link href={urls.dashboard.journal}>
            <Button>Create Journal</Button>
          </Link>
        </CardSection>
      )}
    </div>
  );
};

export default page;
