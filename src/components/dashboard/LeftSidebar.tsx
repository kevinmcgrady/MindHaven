import { getUserSubscriptionPlan } from '@/queries/stripe';

import { PlanUpgrade } from '../PlanUpgrade';
import { Nav } from '../site/Nav';

export const LeftSidebar = async () => {
  const subscriptionPlan = await getUserSubscriptionPlan();

  return (
    <aside className='w-[310px] relative hidden xl:flex xl:flex-col rounded-xl'>
      <Nav />
      {!subscriptionPlan?.isSubscribed && <PlanUpgrade />}
    </aside>
  );
};
