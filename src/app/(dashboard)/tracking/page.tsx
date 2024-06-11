import { format } from 'date-fns';

import { Chart } from '@/components/Chart';
import PageHeader from '@/components/PageHeader';
import { getJournalsByMonthAndYear } from '@/queries/journal';

const page = async () => {
  const currentMonth = format(new Date(), 'MMM');
  const currentYear = format(new Date(), 'yyyy');

  const usersJournals = await getJournalsByMonthAndYear(
    currentMonth,
    currentYear,
  );

  return (
    <section className='h-full flex flex-col'>
      <PageHeader
        title='My Progress'
        description='You can track your monthly progress, based from your journals.'
      />

      {!usersJournals || usersJournals.length === 0 ? (
        <p>You don&apos;t have any journals yet!</p>
      ) : (
        <Chart journals={usersJournals} />
      )}
    </section>
  );
};

export default page;
