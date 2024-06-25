import '@testing-library/jest-dom/vitest';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { urls } from '@/constants/urls';

import Logo from './Logo';

describe('<Logo />', () => {
  it('should render', () => {
    render(<Logo />);

    const image = screen.getByRole('img');
    const link = screen.getByRole('link');
    const heading = screen.getByRole('heading');

    expect(image).toBeInTheDocument();
    expect(link).toBeInTheDocument();
    expect(heading).toBeInTheDocument();

    expect(link).toHaveAttribute('href', urls.home);
    expect(heading).toHaveTextContent('MindHaven');
  });
});
