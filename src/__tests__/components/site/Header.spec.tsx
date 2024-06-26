import '@testing-library/jest-dom/vitest';

import { render, screen } from '@testing-library/react';
import Image from 'next/image';
import { describe, expect, it, vi } from 'vitest';

import { Header } from '@/components/site/Header';
import { urls } from '@/constants/urls';
import { getUserDetails } from '@/queries/auth';

vi.mock('@/queries/auth');

vi.mock('@/components/site/Logo', () => {
  return {
    default: vi.fn((props) => (
      <Image alt='test' data-testid='logo' {...props} />
    )),
  };
});

vi.mock('@/components/site/MobileNav', () => {
  return {
    default: vi.fn((props) => <div data-testid='mobile-nav' {...props} />),
  };
});

describe('<Header />', () => {
  it('should render the logo without nav or user links', async () => {
    const component = await Header({
      hideMobileNav: true,
      hideSignInButton: true,
    });

    render(component);

    const logo = screen.getByTestId('logo');
    expect(logo).toBeInTheDocument();
  });

  it('should render the dashboard button if user is logged in', async () => {
    vi.mocked(getUserDetails).mockResolvedValue({
      emailAddress: 'email.com',
    } as any);

    const component = await Header({
      hideMobileNav: true,
      hideSignInButton: false,
    });

    render(component);

    const dashboardUrl = screen.getByTestId('dashboard-url');
    const signInUrl = screen.queryByTestId('sign-in-url');

    expect(dashboardUrl).toBeInTheDocument();
    expect(signInUrl).not.toBeInTheDocument();
    expect(dashboardUrl).toHaveAttribute('href', urls.dashboard.root);
  });

  it('should render the sign in button if user is not logged in', async () => {
    vi.mocked(getUserDetails).mockResolvedValue(null);

    const component = await Header({
      hideMobileNav: true,
      hideSignInButton: false,
    });

    render(component);

    const dashboardUrl = screen.queryByTestId('dashboard-url');
    const signInUrl = screen.queryByTestId('sign-in-url');

    expect(dashboardUrl).not.toBeInTheDocument();
    expect(signInUrl).toBeInTheDocument();
    expect(signInUrl).toHaveAttribute('href', urls.auth.signIn);
  });

  it('should render the mobile nav', async () => {
    const component = await Header({
      hideMobileNav: false,
      hideSignInButton: true,
    });

    render(component);

    const mobileNav = screen.getByTestId('mobile-nav');

    expect(mobileNav).toBeInTheDocument();
  });
});
