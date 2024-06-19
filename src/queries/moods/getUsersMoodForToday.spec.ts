import { currentUser,User as AuthUser } from '@clerk/nextjs/server';
import { beforeEach,describe, expect, it, vi } from 'vitest';

import { getUsersMood } from '@/utils/getUsersMood';

import { getJournalByDate } from '../journal';
import { getUserMoodForToday } from './getUsersMoodForToday';

beforeEach(() => {
  vi.resetAllMocks();
});

vi.mock('@clerk/nextjs/server');
vi.mock('@/utils/getUsersMood');
vi.mock('../journal');

describe('getUserMoodForToday', () => {
  it('should return null if the user is not logged in', async () => {
    vi.mocked(currentUser).mockResolvedValue(null);

    const actual = await getUserMoodForToday();

    expect(actual).toBeNull();
  });

  it('should should return null if the user has no journals', async () => {
    vi.mocked(currentUser).mockResolvedValue({
      emailAddresses: [{ emailAddress: 'email.com' }],
    } as AuthUser);

    const journalMock = vi.mocked(getJournalByDate).mockResolvedValue([]);
    const actual = await getUserMoodForToday();

    expect(journalMock).toBeCalledTimes(1);
    expect(actual).toBeNull();
  });

  it('should return null if there is no mood', async () => {
    vi.mocked(currentUser).mockResolvedValue({
      emailAddresses: [{ emailAddress: 'email.com' }],
    } as AuthUser);

    const journalMock = vi.mocked(getJournalByDate).mockResolvedValue([
      {
        id: 'id',
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

    const moodMock = vi.mocked(getUsersMood).mockResolvedValue(undefined);

    const actual = await getUserMoodForToday();

    expect(journalMock).toBeCalledTimes(1);
    expect(moodMock).toBeCalledTimes(1);
    expect(actual).toBeUndefined();
  });

  it('should return the users mood', async () => {
    vi.mocked(currentUser).mockResolvedValue({
      emailAddresses: [{ emailAddress: 'email.com' }],
    } as AuthUser);

    const journalMock = vi.mocked(getJournalByDate).mockResolvedValue([
      {
        id: 'id',
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

    const moodMock = vi
      .mocked(getUsersMood)
      .mockResolvedValue({ message: 'message', overallMood: 'happy' });

    const actual = await getUserMoodForToday();

    expect(journalMock).toBeCalledTimes(1);
    expect(moodMock).toBeCalledTimes(1);
    expect(actual).toStrictEqual({ message: 'message', overallMood: 'happy' });
  });
});
