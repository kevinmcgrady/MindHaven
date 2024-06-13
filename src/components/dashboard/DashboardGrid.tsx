import { formatDate } from '@/lib/formatDate';
import { getUserDetails } from '@/queries/auth';
import { getAllJournalCount, getLastJournalDate } from '@/queries/journal';

import DashboardCard from './DashboardCard';

const DashboardGrid = async () => {
  const user = await getUserDetails();
  const journalCount = await getAllJournalCount();
  const lastJournalDate = await getLastJournalDate();
  const journalMessage =
    journalCount && journalCount?._count > 0
      ? `Your last journal was ${formatDate(lastJournalDate!)}`
      : 'You have not created a journal yet!';

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4'>
      <div className='grid gap-4'>
        <DashboardCard
          description={`You are happier this month, based from your jornals 🔥 🙌`}
          gradient='red-yellow'
        />

        <DashboardCard
          description={journalMessage}
          gradient='teal-lime'
          cta={{ text: "Complete Today's Journal", url: '/journal' }}
        />
      </div>

      <div className='grid gap-4'>
        <DashboardCard
          description={`You have completed ${journalCount?._count} jounals since joining!`}
          gradient='pink-orange'
          cta={{ text: 'View Journals', url: '/journal' }}
        />

        <DashboardCard
          description={`You are currently on the FREE Plan`}
          gradient='green-blue'
          cta={{ text: 'Manage Plan', url: '/' }}
        />
      </div>
    </div>
  );
};

export default DashboardGrid;
