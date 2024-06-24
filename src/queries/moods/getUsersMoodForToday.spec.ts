import { currentUser,User } from '@clerk/nextjs/server';
import { Journal } from '@prisma/client';
import { beforeEach,describe, expect, it, vi } from 'vitest';

import { getUsersMood } from '@/utils/getUsersMood';

import { getJournalByDate } from '../journal';
import { getUserMoodForToday } from './getUsersMoodForToday';

vi.mock('@clerk/nextjs/server');

vi.mock('@/utils/getUsersMood');

vi.mock('../journal');

describe('getUserMoodForToday', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return null if there is no current user', async () => {
    vi.mocked(currentUser).mockResolvedValue(null);

    const result = await getUserMoodForToday();

    expect(result).toBeNull();
  });

  it('should return null if there are no journals for today', async () => {
    vi.mocked(currentUser).mockResolvedValue({ id: 'user-id' } as User);
    vi.mocked(getJournalByDate).mockResolvedValue([]);

    const result = await getUserMoodForToday();

    expect(result).toBeNull();
  });

  it('should return null if usersMood is undefined', async () => {
    vi.mocked(currentUser).mockResolvedValue({ id: 'user-id' } as User);
    vi.mocked(getJournalByDate).mockResolvedValue([
      { id: 'journal-id' },
    ] as Journal[]);
    vi.mocked(getUsersMood).mockReturnValue(undefined);

    const result = await getUserMoodForToday();

    expect(result).toBeNull();
  });

  it('should return usersMood if it is defined', async () => {
    const mood = { message: 'Mood retrieved', overallMood: 'happy' };

    vi.mocked(currentUser).mockResolvedValue({ id: 'user-id' } as User);
    vi.mocked(getJournalByDate).mockResolvedValue([
      { id: 'journal-id' },
    ] as Journal[]);
    vi.mocked(getUsersMood).mockReturnValue(mood);

    const result = await getUserMoodForToday();

    expect(result).toEqual(mood);
  });
});
