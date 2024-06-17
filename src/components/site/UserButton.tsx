import { UserButton as ClerkUserButton } from '@clerk/nextjs';

const UserButton = () => {
  return (
    <div className='gap-2 items-center hidden xl:flex'>
      <ClerkUserButton />
    </div>
  );
};

export default UserButton;
