import '@testing-library/jest-dom/vitest';

import { render, screen } from '@testing-library/react';
import { describe, expect,it } from 'vitest';

import { urls } from '@/constants/urls';

import Hero from './Hero';

describe('<Hero />', () => {
  it('should display hero info', () => {
    render(<Hero />);

    expect(screen.getByText(/Keep Track of/i)).toBeInTheDocument();
    expect(screen.getByText(/Your Mental Health/i)).toBeInTheDocument();
    expect(screen.getByText(/with MindHaven/i)).toBeInTheDocument();

    const intro = screen.getByText(
      /Our goal is to empower our users to take charge of their mental well-being, foster meaningful connections, and promote a culture of understanding and compassion. Together, we strive to build a haven of hope and healing for everyone navigating their mental health journey./i,
    );

    expect(intro).toBeInTheDocument();

    const loginLink = screen.getByRole('link');

    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveAttribute('href', urls.auth.signIn);
    expect(loginLink).toHaveTextContent('Get Started');

    const heroImage = screen.getByRole('img');

    expect(heroImage).toBeInTheDocument();
  });
});
