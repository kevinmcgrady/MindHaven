type DashboardHeaderProps = {
  userFirstName: string | undefined | null;
};

const DashboardHeader = ({ userFirstName }: DashboardHeaderProps) => {
  return (
    <div className='bg-overlay bg-cover bg-no-repeat bg-right-top rounded-xl p-8'>
      <h2 className='font-extrabold text-4xl mb-4'>Hi, {userFirstName}! 👋</h2>
      <p className='mb-8'>Let&apos;s help you stay on top of your health</p>
    </div>
  );
};

export default DashboardHeader;
