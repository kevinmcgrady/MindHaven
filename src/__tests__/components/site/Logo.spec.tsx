import '@testing-library/jest-dom/vitest';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Logo from '@/components/site/Logo';
import { urls } from '@/constants/urls';

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
