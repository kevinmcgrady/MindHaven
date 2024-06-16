import { UserButton as ClerkUserButton } from '@clerk/nextjs';

const UserButton = () => {
  return (
    <div className='gap-2 items-center hidden md:flex'>
      <ClerkUserButton />
    </div>
  );
};

export default UserButton;
