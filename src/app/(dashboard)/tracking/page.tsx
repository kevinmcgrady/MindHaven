import { format } from 'date-fns';
import Link from 'next/link';

import { Chart } from '@/components/Chart';
import CardSection from '@/components/layout/CardSection';
import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getJournalsByMonthAndYear } from '@/queries/journal';

const page = async () => {
  const currentMonth = format(new Date(), 'MMM');
  const currentYear = format(new Date(), 'yyyy');

  const usersJournals = await getJournalsByMonthAndYear(
    currentMonth,
    currentYear,
  );

  const hasJournals = usersJournals && usersJournals.length > 0;

  return (
    <div className='h-full flex flex-col'>
      <CardSection noSpacing>
        <PageHeader
          title='My Progress'
          description='You can track your monthly progress, based from your journals.'
        />
      </CardSection>

      <CardSection
        className={cn('flex flex-col', {
          'h-1/2': hasJournals,
          'h-fit': !hasJournals,
        })}
      >
        {!hasJournals ? (
          <>
            <p className='text-muted-foreground text-center'>
              You don&apos;t have any journals yet!
            </p>
            <Button size='sm' className='w-fit mx-auto mt-4'>
              <Link href='/journal'>Create your first journal</Link>
            </Button>
          </>
        ) : (
          <Chart journals={usersJournals} />
        )}
      </CardSection>

      {hasJournals && <CardSection>x</CardSection>}
    </div>
  );
};

export default page;
