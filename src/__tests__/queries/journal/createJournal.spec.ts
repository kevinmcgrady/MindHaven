import { currentUser, User as AuthUser } from '@clerk/nextjs/server';
import { format } from 'date-fns';
import { describe, expect, it, vi } from 'vitest';

import { db } from '@/lib/db';
import { createJornal } from '@/queries/journal/createJournal';

vi.mock('@clerk/nextjs/server');
vi.mock('@/lib/db', () => {
  return {
    db: {
      journal: {
        create: vi.fn(),
      },
    },
  };
});

describe('createJournal', () => {
  it('should return undefined if the user is not logged in', async () => {
    vi.mocked(currentUser).mockResolvedValue(null);
    const createMock = vi.mocked(db.journal.create);

    const actual = await createJornal({
      title: 'title',
      audioUrl: 'audioUrl',
      entry: 'entry',
      mood: 'happy',
      voice: 'shimmer',
    });

    expect(createMock).toBeCalledTimes(0);
    expect(actual).toBeUndefined();
  });

  it('should create a new journal', async () => {
    vi.mocked(currentUser).mockResolvedValue({
      emailAddresses: [{ emailAddress: 'email.com' }],
      id: 'id',
    } as AuthUser);

    const createMock = vi.mocked(db.journal.create);

    await createJornal({
      title: 'title',
      audioUrl: 'audioUrl',
      entry: 'entry',
      mood: 'happy',
      voice: 'shimmer',
    });

    const currentYear = format(new Date(), 'yyyy');
    const currentMonth = format(new Date(), 'MMM');

    expect(createMock).toBeCalledTimes(1);
    expect(createMock).toBeCalledWith({
      data: {
        title: 'title',
        audioUrl: 'audioUrl',
        entry: 'entry',
        mood: 'happy',
        voice: 'shimmer',
        userId: 'id',
        createdAtMonth: currentMonth,
        createdAtYear: currentYear,
      },
    });
  });
});
