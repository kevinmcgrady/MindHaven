import { currentUser } from '@clerk/nextjs/server';
import Image from 'next/image';

const page = async () => {
  const user = await currentUser();

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
          <p className='font-semibold text-sm'>Glasgow</p>
          <p className=' font-light text-sm'>
            Joined <strong>21st July 2024</strong>
          </p>
        </div>
      </div>

      <div className='px-4'>
        <div className='mb-8'>
          <h3 className='font-semibold text-lg mb-2'>Bio</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum nam
            atque consequatur! Maxime labore qui quia saepe amet sit commodi
            dolores, soluta ipsa numquam quisquam, aut quae modi, quod velit.
          </p>
        </div>

        <div className='mb-8'>
          <h3 className='font-semibold text-lg mb-4'>My Mental Health Goal</h3>
          <p className='font-semibold'>
            &ldqu;Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Illum nam atque consequatur! Maxime labore qui quia saepe amet sit
            commodi dolores, soluta ipsa numquam quisquam, aut quae modi, quod
            velit.&rbquo;
          </p>
        </div>
      </div>
    </section>
  );
};

export default page;
