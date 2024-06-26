import '@testing-library/jest-dom/vitest';

import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import SearchBar from '@/components/site/SearchBar';
import { useToast } from '@/components/ui/use-toast';
import { searchUsers } from '@/queries/search';

vi.mock('@/components/ui/use-toast', () => {
  return {
    useToast: vi.fn().mockReturnValue({ toast: vi.fn() }),
  };
});

vi.mock('@/queries/search');

vi.mock('@/components/user/UserSearchCard', () => {
  return {
    default: vi.fn((props) => (
      <div data-testid='user-search-card' {...props} />
    )),
  };
});

describe('<SearchBar />', () => {
  it('should display the title and subtitle', async () => {
    render(<SearchBar />);
    const searchButton = screen.getByTestId('search');

    await userEvent.click(searchButton);

    const title = screen.getByText('Find Friends');
    const subtitle = screen.getByText(
      'Search for friends by their username, location, or tags',
    );

    expect(title).toBeInTheDocument();
    expect(subtitle).toBeInTheDocument();
  });

  it('should call a successful api call', async () => {
    const searchMock = vi.mocked(searchUsers).mockResolvedValue([
      {
        firstName: 'Kevin',
        lastName: 'McGrady',
        country: 'Scotland',
        imageUrl: 'url',
        username: 'kevinmcgrady',
      },
    ]);

    render(<SearchBar />);
    const searchButton = screen.getByTestId('search');

    await userEvent.click(searchButton);

    const searchBox = screen.getByRole('searchbox');

    await userEvent.type(searchBox, 'test');

    await waitFor(
      () => {
        expect(searchMock).toHaveBeenCalledTimes(1);
        expect(searchMock).toHaveBeenCalledWith('test');
        expect(screen.getByTestId('user-search-card')).toBeInTheDocument();
      },
      { interval: 100 },
    );
  });

  it('should call an error api call', async () => {
    const toast = vi.fn();

    vi.mocked(searchUsers).mockRejectedValue([]);
    vi.mocked(useToast).mockReturnValue({ toast: toast } as any);

    render(<SearchBar />);
    const searchButton = screen.getByTestId('search');

    await userEvent.click(searchButton);

    const searchBox = screen.getByRole('searchbox');

    await userEvent.type(searchBox, 'test');

    await waitFor(
      () => {
        expect(toast).toHaveBeenCalledTimes(1);
        expect(toast).toHaveBeenCalledWith({
          title: 'Oops',
          description: 'There was an issue, please try again',
          variant: 'destructive',
        });
      },
      { interval: 100 },
    );
  });

  it('should display no results if no resolts are found', async () => {
    vi.mocked(searchUsers).mockResolvedValue([]);

    render(<SearchBar />);
    const searchButton = screen.getByTestId('search');

    await userEvent.click(searchButton);

    const searchBox = screen.getByRole('searchbox');

    await userEvent.type(searchBox, 'test');

    await waitFor(
      () => {
        expect(screen.getByText('No results found'));
      },
      { interval: 100 },
    );
  });
});
