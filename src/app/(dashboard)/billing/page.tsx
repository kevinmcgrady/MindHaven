import CreateStripeSessionButton from '@/components/CreateStripeSessionButton';
import CardSection from '@/components/layout/CardSection';
import PageHeader from '@/components/site/PageHeader';
import { getUserDetails } from '@/queries/auth';

const page = async () => {
  const user = await getUserDetails();

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
          You are currently on the <strong>{user?.plan}</strong> plan.
        </p>
        <CreateStripeSessionButton
          buttonText='Upgrade to the Pro Plan'
          stripeProductId='price_1PREPSJFkp5qgE0OHrqLOf9R'
        />
      </CardSection>
    </>
  );
};

export default page;
