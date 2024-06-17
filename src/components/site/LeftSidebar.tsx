import { getUserSubscriptionPlan } from '@/queries/stripe';

import { PlanUpgrade } from '../PlanUpgrade';
import { Nav } from './Nav';

export const LeftSidebar = async () => {
  const subscriptionPlan = await getUserSubscriptionPlan();

  return (
    <aside className='w-[310px] relative hidden md:flex md:flex-col rounded-xl'>
      <Nav />
      {!subscriptionPlan?.isSubscribed && <PlanUpgrade />}
    </aside>
  );
};
