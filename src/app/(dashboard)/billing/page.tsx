import CreateStripeSessionButton from '@/components/CreateStripeSessionButton';
import CardSection from '@/components/layout/CardSection';
import PageHeader from '@/components/site/PageHeader';
import { PLANS } from '@/config/plans';
import { getUserSubscriptionPlan } from '@/queries/stripe';
import { formatDate } from '@/utils/formatDate';

const page = async () => {
  const subscriptionPlan = await getUserSubscriptionPlan();

  return (
    <>
      <CardSection noSpacing>
        <PageHeader
          title='Billing'
          description={
            subscriptionPlan?.isSubscribed
              ? 'Manage your plan with MindHaven'
              : 'Upgrade to the Pro plan to get access to more features!'
          }
        />
      </CardSection>
      <CardSection>
        <h2 className='mb-2 font-semibold text-lg'>
          {subscriptionPlan?.isSubscribed
            ? 'Manage your subscription'
            : 'Upgrade to the Pro plan'}
        </h2>
        <p className='font-light text-muted-foreground mb-4'>
          You are currently on the <strong>{subscriptionPlan?.name}</strong>{' '}
          plan.
        </p>
        <CreateStripeSessionButton
          buttonText={
            subscriptionPlan?.isSubscribed
              ? 'Manage Subscription'
              : 'Upgrade to the Pro Plan'
          }
          stripeProductId={PLANS.pro.price.priceIds.test}
        />

        {subscriptionPlan?.isSubscribed && (
          <p className='mt-4 font-light text-sm text-muted-foreground'>
            {subscriptionPlan.isCanceled
              ? 'Your plan will end on'
              : 'Your plan will renew on'}{' '}
            {formatDate(subscriptionPlan.stripeCurrentPeriodEnd!)}
          </p>
        )}
      </CardSection>
      <CardSection>
        <h2 className='font-semibold text-lg mb-2'>
          Current Features you have on the {subscriptionPlan?.name} plan
        </h2>
        <div className='space-y-2 text-sm '>
          <p>
            <strong>Voices:</strong>{' '}
            {subscriptionPlan?.isSubscribed
              ? PLANS.pro.features.voices
              : PLANS.free.features.voices}
          </p>
          <p>
            <strong>Journals per day:</strong>{' '}
            {subscriptionPlan?.isSubscribed
              ? PLANS.pro.features.noOfEntriesPerDay
              : PLANS.free.features.noOfEntriesPerDay}
          </p>
          <p>
            <strong>Length of journals:</strong>{' '}
            {subscriptionPlan?.isSubscribed
              ? PLANS.pro.features.lengthOfJournals
              : PLANS.free.features.lengthOfJournals}
          </p>
        </div>
      </CardSection>
      {!subscriptionPlan?.isSubscribed && (
        <CardSection>
          <h2 className='font-semibold text-lg mb-2'>
            What you would get on the Pro plan
          </h2>
          <div className='space-y-2 text-sm '>
            <p>
              <strong>Voices:</strong> {PLANS.pro.features.voices}
            </p>
            <p>
              <strong>Journals per day:</strong>{' '}
              {PLANS.pro.features.noOfEntriesPerDay}
            </p>
            <p>
              <strong>Length of journals:</strong>{' '}
              {PLANS.pro.features.lengthOfJournals}
            </p>
          </div>
        </CardSection>
      )}
    </>
  );
};

export default page;
