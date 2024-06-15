import { urls } from '@/constants/urls';
import { getAllJournalCount, getLastJournalDate } from '@/queries/journal';
import { getUserSubscriptionPlan } from '@/queries/stripe';
import { formatDate } from '@/utils/formatDate';

import DashboardCard from './DashboardCard';

const DashboardGrid = async () => {
  const subscriptionPlan = await getUserSubscriptionPlan();
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
          cta={{
            text: "Complete Today's Journal",
            url: urls.dashboard.journal,
          }}
        />
      </div>

      <div className='grid gap-4'>
        <DashboardCard
          description={`You have completed ${journalCount?._count} jounals since joining!`}
          gradient='pink-orange'
          cta={{ text: 'View Journals', url: urls.dashboard.journal }}
        />

        <DashboardCard
          description={`You are currently on the ${subscriptionPlan?.name} Plan`}
          gradient='green-blue'
          cta={{ text: 'Manage Plan', url: urls.dashboard.billing }}
        />
      </div>
    </div>
  );
};

export default DashboardGrid;
