import { Button } from '../ui/button';

const DashboardGrid = () => {
  return (
    <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
      <div className='grid gap-4'>
        <div className='bg-[#B8C0D4] h-auto max-w-full rounded-2xl p-8'>
          <p>
            You are <strong>happier</strong> this month, based from your jornals
            🔥 🙌
          </p>
        </div>
        <div className='bg-[#E6AA8A] h-auto max-w-full rounded-lg p-8'>
          <p className='mb-4'>
            Your last journal was <strong>12th March 2024</strong>
          </p>
          <Button>Complete Today&apos;s Journal</Button>
        </div>
      </div>
      <div className='grid gap-4'>
        <div className='bg-[#BAAF98] h-auto max-w-full rounded-lg p-8'>
          <p className='mb-4'>
            You have completed <strong>200</strong> jounals since joining!
          </p>
          <Button>View Journals</Button>
        </div>
        <div className='bg-[#CBC0C6] h-auto max-w-full rounded-lg p-8'>
          <p className='mb-4'>
            You are currently on the <strong>Free Plan</strong>
          </p>
          <Button>Manage Plan</Button>
        </div>
      </div>
      <div className='grid gap-4'>
        <div className='bg-[#95BDB6] h-auto max-w-full rounded-lg p-8'></div>
        <div className='bg-[#D8D5B0] h-auto max-w-full rounded-lg p-8'></div>
        <div className='bg-[#B8C0D4] h-auto max-w-full rounded-lg p-8'></div>
      </div>
    </div>
  );
};

export default DashboardGrid;
