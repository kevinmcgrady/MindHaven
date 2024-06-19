import { currentUser,User as AuthUser } from '@clerk/nextjs/server';
import { Journal } from '@prisma/client';
import { beforeEach,describe, expect, it, vi } from 'vitest';

import { db } from '@/lib/db';

import { getJournalByDate } from './getJournalByDate';

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

const journal: Journal = {
  audioUrl: 'audio',
  createdAt: new Date(),
  createdAtMonth: 'month',
  createdAtYear: 'year',
  entry: 'entry',
  id: 'id',
  mood: 'happy',
  title: 'title',
  updatedAt: new Date(),
  userId: 'userId',
  voice: 'alloy',
};

describe('getJournalByDate', () => {
  it('should return undefined if the user is logged out', async () => {
    vi.mocked(currentUser).mockResolvedValue(null);
    const dbMock = vi.mocked(db.journal.findMany);
    const actual = await getJournalByDate(new Date());

    expect(dbMock).toBeCalledTimes(0);
    expect(actual).toBeUndefined();
  });

  it('should return journals', async () => {
    vi.mocked(currentUser).mockResolvedValue({
      emailAddresses: [{ emailAddress: 'email.com' }],
    } as AuthUser);

    const dbMock = vi.mocked(db.journal.findMany).mockResolvedValue([journal]);

    const actual = await getJournalByDate(new Date());

    expect(dbMock).toBeCalledTimes(1);
    expect(actual).toStrictEqual([journal]);
  });

  it('should return empty array if no journals', async () => {
    vi.mocked(currentUser).mockResolvedValue({
      emailAddresses: [{ emailAddress: 'email.com' }],
    } as AuthUser);

    const dbMock = vi.mocked(db.journal.findMany).mockResolvedValue([]);

    const actual = await getJournalByDate(new Date());

    expect(dbMock).toBeCalledTimes(1);
    expect(actual).toStrictEqual([]);
  });
});
