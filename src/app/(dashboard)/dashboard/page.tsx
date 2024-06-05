import { currentUser } from '@clerk/nextjs/server';

const DashboardPage = async () => {
  const user = await currentUser();

  return (
    <main>
      <div className='bg-gradient-to-r from-[#CCD9D7] to-[#f8f8f3] rounded-t-3xl p-8 border'>
        <h2 className='font-extrabold text-4xl mb-4'>
          Hi, {user?.firstName}! 👋
        </h2>
        <p className='mb-8'>Let&apos;s help you stay on top of your health</p>
      </div>
      <div className='rounded-t-3xl p-8 border -mt-4 bg-white'>
        <h2 className='text-lg font-semibold'>Due now</h2>
        <h2 className='text-lg font-semibold'>Completed</h2>
      </div>
    </main>
  );
};

export default DashboardPage;
