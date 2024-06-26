import '@testing-library/jest-dom/vitest';

import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import ManageSubscriptionSection from './ManageSubscriptionSection';

vi.mock('@/components/billing/CreateStripeSessionButton', () => {
  return {
    default: vi.fn((props) => (
      <button data-testid='stripe-button' {...props} />
    )),
  };
});

describe('<ManageSubscriptionSection />', () => {
  it('should render with props', () => {
    render(
      <ManageSubscriptionSection
        title='Title'
        buttonText='Button Text'
        hasCancelled={false}
        isSubscribed={false}
        planType='Free'
        productCode='productCode'
        productPeriodEndDate={new Date()}
      />,
    );
    const title = screen.getByText('Title');
    const plan = screen.getByText('Free');
    const stripeButton = screen.getByTestId('stripe-button');

    expect(title).toBeInTheDocument();
    expect(plan).toBeInTheDocument();
    expect(stripeButton).toBeInTheDocument();
  });

  it('should display message if subscribed and not cancelled', () => {
    render(
      <ManageSubscriptionSection
        title='Title'
        buttonText='Button Text'
        hasCancelled={false}
        isSubscribed={true}
        planType='Free'
        productCode='productCode'
        productPeriodEndDate={new Date('06-24-2024')}
      />,
    );

    const message = screen.getByText('Your plan will renew on 24th Jun 2024');

    expect(message).toBeInTheDocument();
  });

  it('should display message if subscribed and not cancelled', () => {
    render(
      <ManageSubscriptionSection
        title='Title'
        buttonText='Button Text'
        hasCancelled={true}
        isSubscribed={true}
        planType='Free'
        productCode='productCode'
        productPeriodEndDate={new Date('06-24-2024')}
      />,
    );

    const message = screen.getByText('Your plan will end on 24th Jun 2024');

    expect(message).toBeInTheDocument();
  });
});
