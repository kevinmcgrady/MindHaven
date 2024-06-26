import { currentUser, User as AuthUser } from '@clerk/nextjs/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { db } from '@/lib/db';
import { getAllJournals } from '@/queries/journal/getAllJournals';

beforeEach(() => {
  vi.resetAllMocks();
});

vi.mock('@clerk/nextjs/server');
vi.mock('@/lib/db', () => {
  return {
    db: {
      journal: {
        findMany: vi.fn(),
      },
    },
  };
});

describe('getAllJournals', () => {
  it('should return undefined if the user is logged out', async () => {
    vi.mocked(currentUser).mockResolvedValue(null);
    const dbMock = vi.mocked(db.journal.findMany);

    const actual = await getAllJournals();

    expect(dbMock).toBeCalledTimes(0);
    expect(actual).toBeUndefined();
  });

  it('should return the journals', async () => {
    const date = new Date();

    vi.mocked(currentUser).mockResolvedValue({
      emailAddresses: [{ emailAddress: 'email.com' }],
    } as AuthUser);

    const dbMock = vi.mocked(db.journal.findMany).mockResolvedValue([
      {
        id: 'id',
        audioUrl: 'audio',
        createdAt: date,
        createdAtMonth: 'month',
        createdAtYear: 'year',
        entry: 'entry',
        mood: 'happy',
        title: 'title',
        updatedAt: date,
        userId: 'userId',
        voice: 'shimmer',
      },
    ]);

    const actual = await getAllJournals();

    expect(dbMock).toBeCalledTimes(1);
    expect(actual).toStrictEqual([
      {
        id: 'id',
        audioUrl: 'audio',
        createdAt: date,
        createdAtMonth: 'month',
        createdAtYear: 'year',
        entry: 'entry',
        mood: 'happy',
        title: 'title',
        updatedAt: date,
        userId: 'userId',
        voice: 'shimmer',
      },
    ]);
  });

  it('should return an empty array if no journals are found', async () => {
    vi.mocked(currentUser).mockResolvedValue({
      emailAddresses: [{ emailAddress: 'email.com' }],
    } as AuthUser);

    const dbMock = vi.mocked(db.journal.findMany).mockResolvedValue([]);

    const actual = await getAllJournals();

    expect(dbMock).toBeCalledTimes(1);
    expect(actual).toStrictEqual([]);
  });
});
