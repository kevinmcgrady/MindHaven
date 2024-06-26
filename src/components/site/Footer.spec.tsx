import '@testing-library/jest-dom/vitest';

import { render, screen } from '@testing-library/react';
import Image from 'next/image';
import { describe, expect, it, vi } from 'vitest';

import { Footer } from './Footer';

vi.mock('@/components/site/Logo', () => {
  return {
    default: vi.fn((props) => (
      <Image alt='test' data-testid='logo' {...props} />
    )),
  };
});

describe('<Footer />', () => {
  it('should contain the logo, tagline and copyright info', () => {
    render(<Footer />);
    const tagline = screen.getByText(
      'Your Sanctuary for Connection, Healing, and Mental Wellness. Together, We Foster Understanding, Support, and Growth for a Healthier Mind.',
    );
    const copyRight = screen.getByText(
      `© ${new Date().getFullYear()} MindHaven . All Rights Reserved.`,
    );
    const logo = screen.getByTestId('logo');

    expect(tagline).toBeInTheDocument();
    expect(copyRight).toBeInTheDocument();
    expect(logo).toBeInTheDocument();
  });
});
