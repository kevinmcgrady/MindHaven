import { UserButton as ClerkUserButton } from '@clerk/nextjs';
type UserButtonProps = {
  userFirstName: string;
  userLastName: string;
};

const UserButton = ({ userFirstName, userLastName }: UserButtonProps) => {
  return (
    <div className='gap-2 items-center hidden md:flex'>
      <ClerkUserButton />
      <p className='text-sm font-semibold'>
        {userFirstName} {userLastName}
      </p>
    </div>
  );
};

export default UserButton;
