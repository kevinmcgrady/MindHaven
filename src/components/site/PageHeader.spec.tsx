import '@testing-library/jest-dom/vitest';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import PageHeader from './PageHeader';

describe('<PageHeader />', () => {
  it('should display the title and subtitle', () => {
    render(<PageHeader title='title' description='description' />);

    const title = screen.getByText('title');
    const description = screen.getByText('description');

    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });
});
