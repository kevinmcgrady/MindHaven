import { PlanUpgrade } from '@/components/PlanUpgrade';
import { Nav } from '@/components/site/Nav';
import { getUserDetails } from '@/queries/auth';
import { getUserSubscriptionPlan } from '@/queries/stripe';

export const LeftSidebar = async () => {
  const user = await getUserDetails();
  const subscriptionPlan = await getUserSubscriptionPlan();

  return (
    <aside className='w-[310px] relative hidden xl:flex xl:flex-col rounded-xl'>
      <Nav userFirstName={user?.firstName} userLastName={user?.lastName} />
      {!subscriptionPlan?.isSubscribed && <PlanUpgrade />}
    </aside>
  );
};
