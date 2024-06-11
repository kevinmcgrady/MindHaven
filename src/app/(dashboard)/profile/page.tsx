import Image from 'next/image';

import { WelcomeScreen } from '@/components/WelcomeScreen';
import { formatDate } from '@/lib/formatDate';
import { getUserDetails } from '@/queries/auth';

const page = async () => {
  const user = await getUserDetails();

  if (!user?.hasCompletedProfile) {
    return <WelcomeScreen />;
  }

  return (
    <section>
      <div className='bg-overlay bg-cover bg-no-repeat bg-right-bottom h-40 rounded-t-xl relative' />
      <div className='px-2'>
        <Image
          src={user?.imageUrl!}
          width={100}
          height={100}
          alt={user?.firstName!}
          className='aspect-square rounded-full mx-auto -mt-[50px] z-10 relative'
        />
        <h2 className='text-center mt-4 font-semibold text-lg'>
          {user?.firstName} {user?.lastName} 🥳
        </h2>
        <div className='flex items-center justify-center gap-2 mt-2'>
          <p className='font-semibold text-sm'>{user.country}</p>
          <p className=' font-light text-sm'>
            Joined <strong>{formatDate(user?.createdAt)}</strong>
          </p>
        </div>
      </div>

      <div className='px-4'>
        <div className='mb-8'>
          <h3 className='font-semibold text-lg mb-2'>Bio</h3>
          <p>{user.bio}</p>
        </div>

        <div className='mb-8'>
          <h3 className='font-semibold text-lg mb-4'>My Mental Health Goal</h3>
          <p className='font-semibold'>{user.mentalHealthGoal}</p>
        </div>
      </div>
    </section>
  );
};

export default page;
