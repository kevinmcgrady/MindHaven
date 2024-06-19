import { currentUser,User as AuthUser } from '@clerk/nextjs/server';
import { Journal } from '@prisma/client';
import { beforeEach,describe, expect, it, vi } from 'vitest';

import { db } from '@/lib/db';

import { getLastJournalDate } from './getLastJournalDate';

beforeEach(() => {
  vi.resetAllMocks();
});

vi.mock('@clerk/nextjs/server');
vi.mock('@/lib/db', () => {
  return {
    db: {
      journal: {
        findFirst: vi.fn(),
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
  voice: 'shimmer',
};

describe('getLastJournalByDate', () => {
  it('should return undefined if user is not logged in', async () => {
    vi.mocked(currentUser).mockResolvedValue(null);
    const dbMock = vi.mocked(db.journal.findFirst);
    const actual = await getLastJournalDate();

    expect(dbMock).toBeCalledTimes(0);
    expect(actual).toBeUndefined();
  });

  it('should return journals', async () => {
    vi.mocked(currentUser).mockResolvedValue({
      emailAddresses: [{ emailAddress: 'email.com' }],
      id: 'id',
    } as AuthUser);

    const dbMock = vi.mocked(db.journal.findFirst).mockResolvedValue(journal);

    const actual = await getLastJournalDate();

    expect(dbMock).toBeCalledTimes(1);
    expect(dbMock).toBeCalledWith({
      where: {
        userId: 'id',
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    expect(actual).toStrictEqual(journal.createdAt);
  });

  it('should return null if no journal found', async () => {
    vi.mocked(currentUser).mockResolvedValue({
      emailAddresses: [{ emailAddress: 'email.com' }],
      id: 'id',
    } as AuthUser);

    const dbMock = vi.mocked(db.journal.findFirst).mockResolvedValue(null);

    const actual = await getLastJournalDate();

    expect(dbMock).toBeCalledTimes(1);
    expect(dbMock).toBeCalledWith({
      where: {
        userId: 'id',
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    expect(actual).toBeUndefined();
  });
});
