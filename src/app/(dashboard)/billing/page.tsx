import { Fragment } from 'react';

import ManageSubscriptionSection from '@/components/billing/ManageSubscriptionSection';
import PlanFeaturesSection from '@/components/billing/PlanFeaturesSection';
import CardSection from '@/components/layout/CardSection';
import PageHeader from '@/components/site/PageHeader';
import { PLANS } from '@/config/plans';
import { getUserSubscriptionPlan } from '@/queries/stripe';

const page = async () => {
  const subscriptionPlan = await getUserSubscriptionPlan();

  const pageDescription = subscriptionPlan?.isSubscribed
    ? 'Manage your plan with MindHaven'
    : 'Upgrade to the Pro plan to get access to more features!';

  const subscriptionSectionTitle = subscriptionPlan?.isSubscribed
    ? 'Manage your subscription'
    : 'Upgrade to the Pro plan';

  const subscriptionSectionButtonText = subscriptionPlan?.isSubscribed
    ? 'Manage Subscription'
    : 'Upgrade to the Pro Plan';

  const currentPlanDetails = subscriptionPlan?.isSubscribed
    ? PLANS.pro
    : PLANS.free;

  return (
    <Fragment>
      <CardSection noSpacing>
        <PageHeader title='Billing' description={pageDescription} />
      </CardSection>

      <ManageSubscriptionSection
        title={subscriptionSectionTitle}
        planType={subscriptionPlan?.name!}
        productCode={PLANS.pro.price.priceIds.test}
        productPeriodEndDate={subscriptionPlan?.stripeCurrentPeriodEnd!}
        buttonText={subscriptionSectionButtonText}
        hasCancelled={subscriptionPlan?.isCanceled!}
        isSubscribed={subscriptionPlan?.isSubscribed!}
      />

      <PlanFeaturesSection
        title={`Current Features you have on the ${currentPlanDetails.name} plan`}
        lengthOfJournals={currentPlanDetails.features.lengthOfJournals}
        noOfEntriesPerDay={currentPlanDetails.features.noOfEntriesPerDay}
        noOfVoices={currentPlanDetails.features.voices}
      />

      {!subscriptionPlan?.isSubscribed && (
        <PlanFeaturesSection
          title='What you would get on the Pro plan'
          lengthOfJournals={PLANS.pro.features.lengthOfJournals}
          noOfEntriesPerDay={PLANS.pro.features.noOfEntriesPerDay}
          noOfVoices={PLANS.pro.features.voices}
        />
      )}
    </Fragment>
  );
};

export default page;
