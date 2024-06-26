import { describe, expect, it, vi } from 'vitest';

import { stripe } from '@/lib/stripe';
import { getUserDetails } from '@/queries/auth/getUsersDetails';
import { createStripeCheckoutSession } from '@/queries/stripe/createStripeCheckoutSession';
import { getUserSubscriptionPlan } from '@/queries/stripe/getUserSubscriptionPlan';
import { absoluteUrl } from '@/utils/absoluteUrl';

vi.mock('@/queries/auth/getUsersDetails');
vi.mock('@/queries/stripe/getUserSubscriptionPlan');
vi.mock('@/utils/absoluteUrl');
vi.mock('@/lib/stripe', () => {
  return {
    stripe: {
      billingPortal: {
        sessions: {
          create: vi.fn(),
        },
      },
      checkout: {
        sessions: {
          create: vi.fn(),
        },
      },
    },
  };
});

describe('createStripeCheckoutSession', () => {
  it('it should return undefined if the user is not logged in', async () => {
    vi.mocked(getUserDetails);

    const actual = await createStripeCheckoutSession('key');

    expect(actual).toBeUndefined();
  });

  it('should return the session url if the user is subscribed', async () => {
    vi.mocked(getUserDetails).mockResolvedValue({
      emailAddress: 'email.com',
      stripeCustomerId: 'stripeCustomerId',
    } as any);

    vi.mocked(getUserSubscriptionPlan).mockResolvedValue({
      isSubscribed: true,
    } as any);

    vi.mocked(absoluteUrl).mockReturnValue('absoluteUrl');

    const billingMock = vi
      .mocked(stripe.billingPortal.sessions.create)
      .mockResolvedValue({ url: 'billingUrl' } as any);

    const actual = await createStripeCheckoutSession('id');

    expect(billingMock).toBeCalledTimes(1);
    expect(billingMock).toBeCalledWith({
      customer: 'stripeCustomerId',
      return_url: 'absoluteUrl',
    });

    expect(actual).toBe('billingUrl');
  });

  it('it should create a new session and return the url if the user has not subscribed', async () => {
    vi.mocked(getUserDetails).mockResolvedValue({
      emailAddress: 'email.com',
      stripeCustomerId: 'stripeCustomerId',
      id: 'userId',
    } as any);

    vi.mocked(getUserSubscriptionPlan).mockResolvedValue({
      isSubscribed: false,
    } as any);

    vi.mocked(absoluteUrl).mockReturnValue('absoluteUrl');

    const createSessionMock = vi
      .mocked(stripe.checkout.sessions.create)
      .mockResolvedValue({ url: 'sessionUrl' } as any);

    const actual = await createStripeCheckoutSession('priceId');

    expect(createSessionMock).toBeCalledTimes(1);
    expect(createSessionMock).toBeCalledWith({
      billing_address_collection: 'auto',
      line_items: [
        {
          price: 'priceId',
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: 'absoluteUrl',
      cancel_url: 'absoluteUrl',
      metadata: {
        userId: 'userId',
      },
    });

    expect(actual).toBe('sessionUrl');
  });
});
