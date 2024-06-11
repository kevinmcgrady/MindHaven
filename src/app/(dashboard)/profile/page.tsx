import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { WelcomeScreen } from '@/components/WelcomeScreen';
import { formatDate } from '@/lib/formatDate';
import { getUserDetails } from '@/queries/auth';

const page = async () => {
  const user = await getUserDetails();

  if (!user?.hasCompletedProfile) {
    return <WelcomeScreen />;
  }

  return (
    <>
      <section className='bg-white p-2 rounded-xl'>
        <div className='bg-overlay bg-cover bg-no-repeat bg-right-bottom h-40 rounded-t-xl relative' />
        <div className='px-2'>
          <Image
            src={user?.imageUrl!}
            width={100}
            height={100}
            alt={user?.firstName!}
            className='aspect-square rounded-full mx-auto -mt-[50px] z-10 relative'
          />
          <p className='text-center font-light text-sm mt-4 text-muted-foreground'>
            @kevinmcgrady
          </p>
          <h2 className='text-center mt-2 font-semibold text-xl'>
            {user?.firstName} {user?.lastName}
          </h2>
          <div className='flex items-center justify-center gap-2 mt-2'>
            <p className='text-sm text-[#F77334] font-semibold'>
              {user.country}
            </p>
            <p className='text-sm text-muted-foreground'>
              Joined {formatDate(user?.createdAt)}
            </p>
          </div>

          <p className='text-center text-sm text-muted-foreground my-4'>
            {user.bio}
          </p>
        </div>
      </section>

      <section className='bg-white rounded-xl p-4 mt-4'>
        <h3 className='font-semibold text-lg mb-4'>Mental Health Goal</h3>
        <p className='text-muted-foreground'>{user.mentalHealthGoal}</p>
      </section>

      <section className='bg-white rounded-xl p-4 mt-4'>
        <h3 className='font-semibold text-lg mb-4'>Tags</h3>

        <div className='space-x-2'>
          <Button size='sm' variant='outline'>
            social anxiety
          </Button>
          <Button size='sm' variant='outline'>
            anxiety
          </Button>
          <Button size='sm' variant='outline'>
            autism
          </Button>
        </div>
      </section>

      <section className='bg-white rounded-xl p-4 mt-4'>
        <h3 className='font-semibold text-lg mb-4'>Badges</h3>
        <p className='text-muted-foreground'></p>
      </section>
    </>
  );
};

export default page;
