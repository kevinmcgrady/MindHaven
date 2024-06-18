import FriendsActivity from '@/components/dashboard/FriendsActivity';

export const RightSidebar = async () => {
  return (
    <aside className='w-[310px] relative hidden xl:flex xl:flex-col rounded-xl'>
      <FriendsActivity />
    </aside>
  );
};
