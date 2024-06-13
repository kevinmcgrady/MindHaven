'use server';

import { currentUser } from '@clerk/nextjs/server';

import { stripe } from '@/lib/stripe';

export const createStripeCheckoutSession = async (productKey: string) => {
  const user = await currentUser();

  if (!user) return;

  const session = await stripe.checkout.sessions.create({
    billing_address_collection: 'auto',
    line_items: [
      {
        price: productKey,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: `http://localhost:3000/billing`,
    cancel_url: `http://localhost:3000/billing`,
    metadata: {
      userId: user.id,
    },
  });

  return session.url;
};

// export const createPortalSession = async () => {
//     const { session_id } = req.body;
//     const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);

//     // This is the url to which the customer will be redirected when they are done
//     // managing their billing with the portal.
//     const returnUrl = '';

//     const portalSession = await stripe.billingPortal.sessions.create({
//       customer: '',
//       return_url: returnUrl,
//     });
//   });
