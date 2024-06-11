import DashboardGrid from '@/components/dashboard/DashboardGrid';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import CardSection from '@/components/layout/CardSection';
import MoodNotification from '@/components/MoodNotification';
import { getUserDetails } from '@/queries/auth';

const DashboardPage = async () => {
  const user = await getUserDetails();

  return (
    <section>
      <DashboardHeader userFirstName={user?.firstName} />
      <MoodNotification />
      <CardSection>
        <DashboardGrid />
      </CardSection>
    </section>
  );
};

export default DashboardPage;
