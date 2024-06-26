import { currentUser, User as AuthUser } from '@clerk/nextjs/server';
import { describe, expect, it, vi } from 'vitest';

import { getJournalsByMonthAndYear } from '@/queries/journal/getJournalByMonthYear';
import { getUsersAvgMoodForTheMonth } from '@/queries/moods/getUsersAvgMoodForTheMonth';
import { getUsersAvgMood } from '@/utils/getUsersAvgMood';

vi.mock('@clerk/nextjs/server');
vi.mock('@/utils/getUsersAvgMood');
vi.mock('@/queries/journal/getJournalByMonthYear');

describe('getUsersAvgMoodForTheMonth', () => {
  it('should return null if the user is not logged in', async () => {
    vi.mocked(currentUser).mockResolvedValue(null);

    const actual = await getUsersAvgMoodForTheMonth();

    expect(actual).toBeNull();
  });

  it('should return null if no journals', async () => {
    vi.mocked(currentUser).mockResolvedValue({
      emailAddresses: [{ emailAddress: 'email.com' }],
    } as AuthUser);

    vi.mocked(getJournalsByMonthAndYear).mockResolvedValue([]);

    const actual = await getUsersAvgMoodForTheMonth();

    expect(actual).toBeNull();
  });

  it('should return the mood', async () => {
    vi.mocked(currentUser).mockResolvedValue({
      emailAddresses: [{ emailAddress: 'email.com' }],
    } as AuthUser);

    vi.mocked(getJournalsByMonthAndYear).mockResolvedValue([
      {
        id: '',
        audioUrl: '',
        createdAt: new Date(),
        createdAtMonth: '',
        createdAtYear: '',
        entry: '',
        mood: 'happy',
        title: '',
        updatedAt: new Date(),
        userId: '',
        voice: 'shimmer',
      },
    ]);

    vi.mocked(getUsersAvgMood).mockResolvedValue('happy');

    const actual = await getUsersAvgMoodForTheMonth();

    expect(actual).toBe('happy');
  });
});
