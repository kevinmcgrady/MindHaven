import DashboardGrid from '@/components/dashboard/DashboardGrid';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { getUserDetails } from '@/queries/auth';

const DashboardPage = async () => {
  const user = await getUserDetails();

  return (
    <section>
      <DashboardHeader userFirstName={user?.firstName} />
      <div className='rounded-b-xl p-8 mt-4 bg-white'>
        <DashboardGrid />
      </div>
    </section>
  );
};

export default DashboardPage;
