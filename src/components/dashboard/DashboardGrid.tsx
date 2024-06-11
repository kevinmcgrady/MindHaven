import Link from 'next/link';

import { formatDate } from '@/lib/formatDate';
import { getUserDetails } from '@/queries/auth';
import { getAllJournalCount, getLastJournalDate } from '@/queries/journal';

import { Button } from '../ui/button';

const DashboardGrid = async () => {
  const user = await getUserDetails();
  const journalCount = await getAllJournalCount();
  const lastJournalDate = await getLastJournalDate();

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4'>
      <div className='grid gap-4'>
        <div className='bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 h-auto max-w-full rounded-lg p-8'>
          <p>
            You are <strong>happier</strong> this month, based from your jornals
            🔥 🙌
          </p>
        </div>
        <div className='bg-gradient-to-r from-teal-200 to-lime-200 h-auto max-w-full rounded-lg p-8'>
          <p className='mb-4'>
            Your last journal was{' '}
            <strong>{formatDate(lastJournalDate!)}</strong>
          </p>
          <Link href='/journal'>
            <Button>Complete Today&apos;s Journal</Button>
          </Link>
        </div>
      </div>
      <div className='grid gap-4'>
        <div className='bg-gradient-to-br from-pink-500 to-orange-400 h-auto max-w-full rounded-lg p-8'>
          <p className='mb-4'>
            You have completed <strong>{journalCount?._count}</strong> jounals
            since joining!
          </p>
          <Link href='/journal'>
            <Button>View Journals</Button>
          </Link>
        </div>
        <div className='bg-gradient-to-br from-green-400 to-blue-600 h-auto max-w-full rounded-lg p-8'>
          <p className='mb-4'>
            You are currently on the <strong>{user?.plan} Plan</strong>
          </p>
          <Button>Manage Plan</Button>
        </div>
      </div>
      {/* <div className='grid gap-4'>
        <div className='bg-[#95BDB6] h-auto max-w-full rounded-lg p-8'></div>
        <div className='bg-[#D8D5B0] h-auto max-w-full rounded-lg p-8'></div>
        <div className='bg-[#B8C0D4] h-auto max-w-full rounded-lg p-8'></div>
      </div> */}
    </div>
  );
};

export default DashboardGrid;
