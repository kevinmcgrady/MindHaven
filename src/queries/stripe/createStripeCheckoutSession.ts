'use server';

import { stripe } from '@/lib/stripe';
import { getUserDetails } from '@/queries/auth/getUsersDetails';
import { absoluteUrl } from '@/utils/absoluteUrl';

import { getUserSubscriptionPlan } from './getUserSubscriptionPlan';

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
