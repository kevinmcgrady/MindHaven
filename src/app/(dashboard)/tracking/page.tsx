import { format } from 'date-fns';
import Link from 'next/link';

import { Chart } from '@/components/Chart';
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

  const noJournals = !usersJournals || usersJournals.length === 0;

  return (
    <div className='h-full flex flex-col'>
      <section className='bg-white p-4 rounded-xl mb-4'>
        <PageHeader
          title='My Progress'
          description='You can track your monthly progress, based from your journals.'
        />
      </section>

      <section
        className={cn('bg-white p-4 rounded-xl flex flex-col', {
          'h-full': !noJournals,
          'h-fit': noJournals,
        })}
      >
        {noJournals ? (
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
      </section>
    </div>
  );
};

export default page;
