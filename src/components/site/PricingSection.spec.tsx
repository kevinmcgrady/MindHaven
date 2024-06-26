import '@testing-library/jest-dom/vitest';

import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { urls } from '@/constants/urls';

import PricingSection from './PricingSection';

describe('<PricingSection />', () => {
  it('should display the title and subtitle', () => {
    render(<PricingSection />);

    const heading = screen.getByRole('heading', { level: 2 });
    const subtitle = screen.getByRole('heading', { level: 3 });

    expect(heading).toHaveTextContent('Ready to start tracking?');
    expect(subtitle).toHaveTextContent('Choose the plan that best suits you');
  });

  it('should display the free plan info', () => {
    render(<PricingSection />);
    const freeTitle = screen.getByText('Free Plan');
    const freePrice = screen.getByText('FREE');
    const freeWhatIsincluded = screen.getByText(
      "What's included in the free plan:",
    );

    const freeJournal = screen.getByTestId('free-journal');
    const freeChars = screen.getByTestId('free-chars');
    const freeVoices = screen.getByTestId('free-voices');
    const freeMoods = screen.getByTestId('free-moods');
    const freeTracking = screen.getByTestId('free-tracking');

    expect(freeTitle).toBeInTheDocument();
    expect(freePrice).toBeInTheDocument();
    expect(freeWhatIsincluded).toBeInTheDocument();

    expect(freeJournal).toHaveTextContent('1 journal a day');
    expect(freeChars).toHaveTextContent('2,000 chars per journal');
    expect(freeVoices).toHaveTextContent('2 unique voices');
    expect(freeMoods).toHaveTextContent('5 moods to choose from');
    expect(freeTracking).toHaveTextContent('Full tracking over all months');
  });

  it('should display the pro plan info', () => {
    render(<PricingSection />);
    const proTitle = screen.getByText('Pro Plan');
    const proPrice = screen.getByTestId('pro-price');
    const proWhatIsincluded = screen.getByText(
      "What's included in the pro plan:",
    );

    const proJournal = screen.getByTestId('pro-journal');
    const proChars = screen.getByTestId('pro-chars');
    const proVoices = screen.getByTestId('pro-voices');
    const proMoods = screen.getByTestId('pro-moods');
    const proTracking = screen.getByTestId('pro-tracking');

    expect(proTitle).toBeInTheDocument();
    expect(proPrice).toBeInTheDocument();
    expect(proWhatIsincluded).toBeInTheDocument();
    expect(proPrice).toHaveTextContent('£10.00/month');

    expect(proJournal).toHaveTextContent('3 journal a day');
    expect(proChars).toHaveTextContent('10,000 chars per journal');
    expect(proVoices).toHaveTextContent('6 unique voices');
    expect(proMoods).toHaveTextContent('5 moods to choose from');
    expect(proTracking).toHaveTextContent('Full tracking over all months');
  });

  it('should display the start tracking button', () => {
    render(<PricingSection />);

    const cta = screen.getByRole('link');

    expect(cta).toHaveAttribute('href', urls.auth.signIn);
    expect(cta).toHaveTextContent('Start Tracking Now');
  });
});
