import '@testing-library/jest-dom/vitest';

import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import UserButton from '@/components/site/UserButton';

vi.mock('@clerk/nextjs', () => {
  return {
    UserButton: vi.fn((props) => (
      <div data-testid='clerk-user-button' {...props} />
    )),
  };
});

describe('<UserButton />', () => {
  it('should display the user button', () => {
    render(<UserButton />);

    const clerkUserButton = screen.getByTestId('clerk-user-button');

    expect(clerkUserButton).toBeInTheDocument();
  });
});
