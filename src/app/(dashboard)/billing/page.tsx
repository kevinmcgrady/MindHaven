import CreateStripeSessionButton from '@/components/CreateStripeSessionButton';
import CardSection from '@/components/layout/CardSection';
import PageHeader from '@/components/site/PageHeader';
import { PLANS } from '@/config/plans';
import { formatDate } from '@/lib/formatDate';
import { getUserSubscriptionPlan } from '@/queries/stripe';

const page = async () => {
  const subscriptionPlan = await getUserSubscriptionPlan();

  return (
    <>
      <CardSection noSpacing>
        <PageHeader
          title='Billing'
          description='Manage your plan with MindHaven'
        />
      </CardSection>
      <CardSection>
        <h2 className='mb-2 font-semibold text-lg'>Manage your subscription</h2>
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
    </>
  );
};

export default page;
