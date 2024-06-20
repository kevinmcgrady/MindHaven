'use server';

import { PLANS } from '@/config/plans';
import { stripe } from '@/lib/stripe';
import { getUserDetails } from '@/queries/auth/getUsersDetails';

export const getUserSubscriptionPlan = async () => {
  const user = await getUserDetails();

  if (!user) return;

  const isSubscribed = Boolean(
    user.stripePriceId &&
      user.stripeCurrentPeriodEnd && // 86400000 = 1 day
      user.stripeCurrentPeriodEnd.getTime() + 86_400_000 > Date.now(),
  );

  let isCanceled = false;

  if (isSubscribed && user.stripeSubscriptionId) {
    const stripePlan = await stripe.subscriptions.retrieve(
      user.stripeSubscriptionId,
    );

    isCanceled = stripePlan.cancel_at_period_end;
  }

  const plan = isSubscribed ? PLANS.pro : PLANS.free;

  return {
    ...plan,
    stripeSubscriptionId: user.stripeSubscriptionId,
    stripeCurrentPeriodEnd: user.stripeCurrentPeriodEnd,
    stripeCustomerId: user.stripeCustomerId,
    isSubscribed,
    isCanceled,
  };
};
