'use server';

import { PLANS } from '@/config/plans';
import { absoluteUrl } from '@/lib/absoluteUrl';
import { stripe } from '@/lib/stripe';

import { getUserDetails } from './auth';

export const createStripeCheckoutSession = async (productKey: string) => {
  const user = await getUserDetails();

  if (!user) return;

  const billingUrl = absoluteUrl('/billing');
  const subscriptionPlan = await getUserSubscriptionPlan();

  // The customer has already subscribed, return them the manage subscription URL
  if (subscriptionPlan?.isSubscribed && user.stripeCustomerId) {
    const stripeSession = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: billingUrl,
    });

    return stripeSession.url;
  }

  // The customer has not subscribed, return them the session URL to create a subscription for the pro plan
  const session = await stripe.checkout.sessions.create({
    billing_address_collection: 'auto',
    line_items: [
      {
        price: productKey,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: billingUrl,
    cancel_url: billingUrl,
    metadata: {
      userId: user.id,
    },
  });

  return session.url;
};

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
