import { currentUser,User as AuthUser } from '@clerk/nextjs/server';
import { Journal } from '@prisma/client';
import { beforeEach,describe, expect, it, vi } from 'vitest';

import { db } from '@/lib/db';

import { getJournalsByMonthAndYear } from './getJournalByMonthYear';

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
  voice: 'shimmer',
};

describe('getJournalByMonthYear', () => {
  it('should return undefined when user is logged out', async () => {
    vi.mocked(currentUser).mockResolvedValue(null);
    const dbMock = vi.mocked(db.journal.findMany);
    const actual = await getJournalsByMonthAndYear('Jun', '2024');

    expect(dbMock).toBeCalledTimes(0);
    expect(actual).toBeUndefined();
  });

  it('should return journals', async () => {
    vi.mocked(currentUser).mockResolvedValue({
      emailAddresses: [{ emailAddress: 'email.com' }],
      id: 'id',
    } as AuthUser);

    const dbMock = vi.mocked(db.journal.findMany).mockResolvedValue([journal]);

    const actual = await getJournalsByMonthAndYear('Jun', '2024');

    expect(dbMock).toBeCalledTimes(1);
    expect(dbMock).toBeCalledWith({
      where: {
        userId: 'id',
        createdAtMonth: 'Jun',
        createdAtYear: '2024',
      },
    });

    expect(actual).toStrictEqual([journal]);
  });

  it('should return empty array if no journals', async () => {
    vi.mocked(currentUser).mockResolvedValue({
      emailAddresses: [{ emailAddress: 'email.com' }],
      id: 'id',
    } as AuthUser);

    const dbMock = vi.mocked(db.journal.findMany).mockResolvedValue([]);

    const actual = await getJournalsByMonthAndYear('Jun', '2024');

    expect(dbMock).toBeCalledTimes(1);
    expect(dbMock).toBeCalledWith({
      where: {
        userId: 'id',
        createdAtMonth: 'Jun',
        createdAtYear: '2024',
      },
    });

    expect(actual).toStrictEqual([]);
  });
});
