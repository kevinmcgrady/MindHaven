import DashboardGrid from '@/components/dashboard/DashboardGrid';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { getUserDetails } from '@/queries/auth';

const DashboardPage = async () => {
  const user = await getUserDetails();

  return (
    <section>
      <DashboardHeader userFirstName={user?.firstName} />
      <section className='bg-white p-4 mt-4 rounded-xl flex gap-4'>
        <p className='text-5xl'>😀</p>
        <div>
          <h2 className='font-semibold mb-2'>Your mood is good</h2>
          <p className='text-sm font-light'>
            We are pleased you are having a good day!
          </p>
        </div>
      </section>

      <div className='rounded-xl p-4 mt-4 bg-white'>
        <DashboardGrid />
      </div>
    </section>
  );
};

export default DashboardPage;
