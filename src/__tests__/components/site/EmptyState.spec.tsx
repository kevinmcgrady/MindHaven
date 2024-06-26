import '@testing-library/jest-dom/vitest';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import EmptyState from '@/components/site/EmptyState';

describe('<EmptyState />', () => {
  it('should display the description', () => {
    render(<EmptyState description='description' />);

    expect(screen.getByText('description')).toBeInTheDocument();
  });
});
