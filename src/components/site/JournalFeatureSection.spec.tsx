import '@testing-library/jest-dom/vitest';

import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import JournalFeatureSection from './JournalFeatureSection';

vi.mock('@/components/journal/JournalCard', () => {
  return {
    default: vi.fn((props) => <div data-testid='journal-card' {...props} />),
  };
});
describe('<JournalFeatureSecrion />', () => {
  it('should display features', () => {
    render(<JournalFeatureSection />);

    const title = screen.getByTestId('title');
    const subtitle = screen.getByTestId('subtitle');

    const moods = screen.getByTestId('moods');
    const voices = screen.getByTestId('voices');
    const journals = screen.getByTestId('journals');
    const track = screen.getByTestId('track');
    const category = screen.getByTestId('category');

    expect(title).toHaveTextContent('Write daily journals');
    expect(subtitle).toHaveTextContent(
      'Write daily journals and keep track of your overall mood for the day',
    );

    expect(moods).toHaveTextContent('6 moods to choose from');
    expect(voices).toHaveTextContent('Unique voices to personalise your entry');
    expect(journals).toHaveTextContent(
      'Listen to old journals entries anytime',
    );
    expect(track).toHaveTextContent(
      'Track your mental state over the month with charts',
    );
    expect(category).toHaveTextContent(
      'Choose from 5 moods to categorize your journal entries',
    );
  });

  it('should display the journal card', () => {
    render(<JournalFeatureSection />);

    const journalCard = screen.getByTestId('journal-card');
    expect(journalCard).toBeInTheDocument();
  });
});
