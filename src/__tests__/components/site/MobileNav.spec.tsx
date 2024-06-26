import '@testing-library/jest-dom/vitest';

import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { usePathname } from 'next/navigation';
import { describe, expect, it, vi } from 'vitest';

import MobileNav from '@/components/site/MobileNav';

vi.mock('@clerk/nextjs', () => {
  return {
    UserButton: vi.fn((props) => <div data-testid='user-button' {...props} />),
  };
});

vi.mock('next/navigation');

vi.mock('@/components/ui/button', () => {
  return {
    Button: vi.fn((props) => <button {...props} />),
  };
});

describe('<MobileNav />', () => {
  it('should render the nav icon', async () => {
    render(<MobileNav userFirstName='Kevin' userLastName='McGrady' />);

    const navButton = screen.getByTestId('nav-button');
    const nav = screen.queryByTestId('nav');

    expect(navButton).toBeInTheDocument();
    expect(nav).not.toBeInTheDocument();
  });

  it('it should render the menu items', async () => {
    vi.mocked(usePathname).mockReturnValue('/dashboard');

    render(<MobileNav userFirstName='Kevin' userLastName='McGrady' />);

    const navButton = screen.getByTestId('nav-button');

    await userEvent.click(navButton);

    const nav = screen.getByTestId('nav');
    const menuItem = screen.getByText('My Dashboard');

    expect(nav).toBeInTheDocument();

    expect(menuItem).toHaveAttribute('variant', 'default');
  });

  it('should render the user button', async () => {
    render(<MobileNav userFirstName='Kevin' userLastName='McGrady' />);
    const navButton = screen.getByTestId('nav-button');

    await userEvent.click(navButton);

    const name = screen.getByText(/Kevin McGrady/i);
    const userButton = screen.getByTestId('user-button');

    expect(name).toBeInTheDocument();
    expect(userButton).toBeInTheDocument();
  });
});
