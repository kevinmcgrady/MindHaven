import DashboardGrid from '@/components/dashboard/DashboardGrid';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import CardSection from '@/components/layout/CardSection';
import MoodNotification from '@/components/MoodNotification';
import { getUserDetails } from '@/queries/auth';
import { getUserMoodForToday } from '@/queries/moods';

const DashboardPage = async () => {
  const user = await getUserDetails();
  const userMood = await getUserMoodForToday();

  return (
    <section>
      <DashboardHeader userFirstName={user?.firstName} />
      {userMood && <MoodNotification message={userMood.message} />}
      <CardSection>
        <DashboardGrid />
      </CardSection>
    </section>
  );
};

export default DashboardPage;
