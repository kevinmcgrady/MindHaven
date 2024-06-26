import { currentUser, User as AuthUser } from '@clerk/nextjs/server';
import { describe, expect, it, vi } from 'vitest';

import { db } from '@/lib/db';
import { getAllJournalCount } from '@/queries/journal/getAllJournalCount';

vi.mock('@clerk/nextjs/server');
vi.mock('@/lib/db', () => {
  return {
    db: {
      journal: {
        aggregate: vi.fn(),
      },
    },
  };
});

describe('getAllJournalCount', () => {
  it('should return undefined if the user is not logged in', async () => {
    vi.mocked(currentUser).mockResolvedValue(null);
    const dbMock = vi.mocked(db.journal.aggregate);
    const actual = await getAllJournalCount();

    expect(dbMock).toHaveBeenCalledTimes(0);
    expect(actual).toBeUndefined();
  });

  it('should return the count', async () => {
    vi.mocked(currentUser).mockResolvedValue({
      emailAddresses: [{ emailAddress: 'email.com' }],
      id: 'id',
    } as AuthUser);
    const dbMock = vi
      .mocked(db.journal.aggregate)
      .mockResolvedValue({ _count: 4 } as any);

    const actual = await getAllJournalCount();

    expect(dbMock).toHaveBeenCalledTimes(1);
    expect(dbMock).toHaveBeenCalledWith({
      where: {
        userId: 'id',
      },
      _count: true,
    });

    expect(actual).toStrictEqual({ _count: 4 });
  });
});
