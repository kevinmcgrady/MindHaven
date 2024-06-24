import '@testing-library/jest-dom/vitest';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/navigation';
import { describe, expect, it, vi } from 'vitest';

import { createStripeCheckoutSession } from '@/queries/stripe';

import { useToast } from '../ui/use-toast';
import CreateStripeSessionButton from './CreateStripeSessionButton';

vi.mock('next/navigation', () => {
  return {
    useRouter: vi.fn(),
  };
});

vi.mock('@/queries/stripe');

vi.mock('@/components/ui/use-toast', () => {
  return {
    useToast: vi.fn().mockReturnValue({ toast: vi.fn() }),
  };
});

describe('<CreateStripeSessionButton />', () => {
  it('should display the button text be default', () => {
    render(
      <CreateStripeSessionButton
        buttonText='button-text'
        stripeProductId='product-id'
      />,
    );

    expect(screen.getByText('button-text')).toBeInTheDocument();
  });

  it('should handle a success api call', async () => {
    const checkoutMock = vi
      .mocked(createStripeCheckoutSession)
      .mockResolvedValue({
        url: 'success-url',
      } as any);

    const push = vi.fn();
    vi.mocked(useRouter).mockReturnValue({ push: push } as any);

    render(
      <CreateStripeSessionButton
        buttonText='button-text'
        stripeProductId='product-id'
      />,
    );

    const paymentButton = screen.getByTestId('payment-button');

    await userEvent.click(paymentButton);

    expect(checkoutMock).toBeCalledTimes(1);
    expect(checkoutMock).toBeCalledWith('product-id');
    expect(push).toBeCalledTimes(1);
    expect(push).toBeCalledWith({ url: 'success-url' });
  });

  it('should handle a error api call', async () => {
    const toast = vi.fn();
    vi.mocked(createStripeCheckoutSession).mockRejectedValue({
      error: 'error',
    });

    vi.mocked(useToast).mockReturnValue({ toast: toast } as any);

    render(
      <CreateStripeSessionButton
        buttonText='button-text'
        stripeProductId='product-id'
      />,
    );

    const paymentButton = screen.getByTestId('payment-button');

    await userEvent.click(paymentButton);

    expect(toast).toBeCalledTimes(1);
    expect(toast).toBeCalledWith({
      title: 'Oops',
      description: 'There was an issue, please try again',
      variant: 'destructive',
    });
  });

  it('should throw error if no url', async () => {
    const toast = vi.fn();

    vi.mocked(createStripeCheckoutSession).mockResolvedValue(null);

    vi.mocked(useToast).mockReturnValue({ toast: toast } as any);

    render(
      <CreateStripeSessionButton
        buttonText='button-text'
        stripeProductId='product-id'
      />,
    );

    const paymentButton = screen.getByTestId('payment-button');

    await userEvent.click(paymentButton);

    expect(toast).toBeCalledTimes(1);
    expect(toast).toBeCalledWith({
      title: 'Oops',
      description: 'There was an issue, please try again',
      variant: 'destructive',
    });
  });
});
