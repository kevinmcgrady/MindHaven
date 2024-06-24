import '@testing-library/jest-dom/vitest';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import PlanFeaturesSection from './PlanFeaturesSection';

describe('<PlanFeaturesSection />', () => {
  it('should render all props', () => {
    render(
      <PlanFeaturesSection
        lengthOfJournals={2000}
        noOfEntriesPerDay={3}
        noOfVoices={6}
        title='Title'
      />,
    );

    expect(screen.getByText('Title')).toBeInTheDocument();

    expect(screen.getByText('6')).toBeInTheDocument();
    expect(screen.getByText('unique voices')).toBeInTheDocument();

    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('journals per day')).toBeInTheDocument();

    expect(screen.getByText('2,000')).toBeInTheDocument();
    expect(screen.getByText('characters per journal')).toBeInTheDocument();
  });
});
