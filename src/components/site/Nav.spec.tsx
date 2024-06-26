import '@testing-library/jest-dom/vitest';

import { render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import { describe, expect, it, vi } from 'vitest';

import { Nav } from './Nav';

vi.mock('@clerk/nextjs', () => {
  return {
    UserButton: vi.fn((props) => <div data-testid='user-button' {...props} />),
  };
});

vi.mock('next/navigation');

vi.mock('../ui/button', () => {
  return {
    Button: vi.fn((props) => <button {...props} />),
  };
});

describe('<MobileNav />', () => {
  it('it should render the menu items', async () => {
    vi.mocked(usePathname).mockReturnValue('/dashboard');

    render(<Nav userFirstName='Kevin' userLastName='McGrady' />);

    const nav = screen.getByTestId('nav');
    const menuItem = screen.getByText('My Dashboard');

    expect(nav).toBeInTheDocument();

    expect(menuItem).toHaveAttribute('variant', 'default');
  });

  it('should render the user button', async () => {
    render(<Nav userFirstName='Kevin' userLastName='McGrady' />);

    const name = screen.getByText(/Kevin McGrady/i);
    const userButton = screen.getByTestId('user-button');

    expect(name).toBeInTheDocument();
    expect(userButton).toBeInTheDocument();
  });
});
