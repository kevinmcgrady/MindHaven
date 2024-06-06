import { currentUser } from '@clerk/nextjs/server';

import DashboardGrid from '@/components/dashboard/DashboardGrid';
import DashboardHeader from '@/components/dashboard/DashboardHeader';

const DashboardPage = async () => {
  const user = await currentUser();

  return (
    <main>
      <DashboardHeader userFirstName={user?.firstName} />
      <div className='rounded-t-3xl p-8 border -mt-4 bg-white'>
        <DashboardGrid />
      </div>
    </main>
  );
};

export default DashboardPage;
