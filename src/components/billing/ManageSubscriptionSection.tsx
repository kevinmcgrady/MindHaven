import { formatDate } from '@/utils/formatDate';

import CreateStripeSessionButton from '../CreateStripeSessionButton';
import CardSection from '../layout/CardSection';

type ManageSubscriptionSectionProps = {
  title: string;
  planType: string;
  buttonText: string;
  isSubscribed: boolean;
  hasCancelled: boolean;
  productCode: string;
  productPeriodEndDate: Date;
};

const ManageSubscriptionSection = ({
  title,
  buttonText,
  isSubscribed,
  hasCancelled,
  planType,
  productCode,
  productPeriodEndDate,
}: ManageSubscriptionSectionProps) => {
  return (
    <CardSection>
      <h2 className='mb-2 font-semibold text-lg'>{title}</h2>
      <p className='font-light text-muted-foreground mb-4'>
        You are currently on the <strong>{planType}</strong> plan.
      </p>
      <CreateStripeSessionButton
        buttonText={buttonText}
        stripeProductId={productCode}
      />

      {isSubscribed && (
        <p className='mt-4 font-light text-sm text-muted-foreground'>
          {hasCancelled ? 'Your plan will end on' : 'Your plan will renew on'}{' '}
          {formatDate(productPeriodEndDate)}
        </p>
      )}
    </CardSection>
  );
};

export default ManageSubscriptionSection;
