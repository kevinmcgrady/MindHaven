import { add } from 'date-fns';
import { describe, expect, it, vi } from 'vitest';

import { PLANS } from '@/config/plans';
import { stripe } from '@/lib/stripe';
import { getUserDetails } from '@/queries/auth/getUsersDetails';
import { getUserSubscriptionPlan } from '@/queries/stripe/getUserSubscriptionPlan';

vi.mock('@/queries/auth/getUsersDetails');
vi.mock('@/lib/stripe', () => {
  return {
    stripe: {
      subscriptions: {
        retrieve: vi.fn(),
      },
    },
  };
});

describe('getUserSubscriptionPlan', () => {
  it('should return undefined if the user is logged out', async () => {
    vi.mocked(getUserDetails).mockResolvedValue(null);

    const actual = await getUserSubscriptionPlan();
    expect(actual).toBeUndefined();
  });

  it('should return is subscribed and the pro plan', async () => {
    vi.mocked(stripe.subscriptions.retrieve).mockResolvedValue({
      cancel_at_period_end: false,
    } as any);
    const stripeCurrentPeriodEnd = add(new Date(), { days: 1 });

    vi.mocked(getUserDetails).mockResolvedValue({
      emailAddress: 'email.com',
      firstName: 'Kevin',
      lastName: 'McGrady',
      stripePriceId: 'stripePriceId',
      stripeSubscriptionId: 'stripeSubscriptionId',
      stripeCurrentPeriodEnd: stripeCurrentPeriodEnd,
      stripeCustomerId: 'stripeCustomerId',
    } as any);

    const actual = await getUserSubscriptionPlan();

    expect(actual).toStrictEqual({
      ...PLANS.pro,
      stripeSubscriptionId: 'stripeSubscriptionId',
      stripeCurrentPeriodEnd: stripeCurrentPeriodEnd,
      stripeCustomerId: 'stripeCustomerId',
      isSubscribed: true,
      isCanceled: false,
    });
  });

  it('should return is not subscribed and the free plan', async () => {
    vi.mocked(getUserDetails).mockResolvedValue({
      emailAddress: 'email.com',
      firstName: 'Kevin',
      lastName: 'McGrady',
    } as any);

    const actual = await getUserSubscriptionPlan();

    expect(actual).toStrictEqual({
      ...PLANS.free,
      stripeSubscriptionId: undefined,
      stripeCurrentPeriodEnd: undefined,
      stripeCustomerId: undefined,
      isSubscribed: false,
      isCanceled: false,
    });
  });

  it('should return if the user has cancelled', async () => {
    vi.mocked(stripe.subscriptions.retrieve).mockResolvedValue({
      cancel_at_period_end: true,
    } as any);
    const stripeCurrentPeriodEnd = add(new Date(), { days: 1 });

    vi.mocked(getUserDetails).mockResolvedValue({
      emailAddress: 'email.com',
      firstName: 'Kevin',
      lastName: 'McGrady',
      stripePriceId: 'stripePriceId',
      stripeSubscriptionId: 'stripeSubscriptionId',
      stripeCurrentPeriodEnd: stripeCurrentPeriodEnd,
      stripeCustomerId: 'stripeCustomerId',
    } as any);

    const actual = await getUserSubscriptionPlan();

    expect(actual).toStrictEqual({
      ...PLANS.pro,
      stripeSubscriptionId: 'stripeSubscriptionId',
      stripeCurrentPeriodEnd: stripeCurrentPeriodEnd,
      stripeCustomerId: 'stripeCustomerId',
      isSubscribed: true,
      isCanceled: true,
    });
  });
});
