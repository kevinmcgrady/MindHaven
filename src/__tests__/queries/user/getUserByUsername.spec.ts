import { currentUser, User as AuthUser } from '@clerk/nextjs/server';
import { User } from '@prisma/client';
import { describe, expect, it, vi } from 'vitest';

import { db } from '@/lib/db';
import { getUserByUsername } from '@/queries/user/getUserByUsername';

vi.mock('@clerk/nextjs/server');

vi.mock('@/lib/db', () => {
  return {
    db: {
      user: {
        findUnique: vi.fn(),
      },
    },
  };
});

describe('getUserByUsername', () => {
  it('it should return null if user is not logged in', async () => {
    vi.mocked(currentUser).mockResolvedValue(null);

    const actual = await getUserByUsername('kevinmcgrady');
    expect(actual).toBeUndefined();
  });

  it('it should return the user if user exists', async () => {
    const authUser = {
      emailAddresses: [{ emailAddress: 'test@example.com' }],
      firstName: 'John',
      lastName: 'Doe',
    };

    const dbUser = {
      emailAddress: 'email.com',
      firstName: 'Kevin',
      lastName: 'McGrady',
    };

    vi.mocked(currentUser).mockResolvedValue(authUser as AuthUser);

    vi.mocked(db.user.findUnique).mockResolvedValue(dbUser as User);

    const actual = await getUserByUsername('kevinmcgrady');

    expect(actual).toStrictEqual(dbUser);
  });

  it('it should return null if user does not exist', async () => {
    const authUser = {
      emailAddresses: [{ emailAddress: 'test@example.com' }],
      firstName: 'John',
      lastName: 'Doe',
    };

    vi.mocked(currentUser).mockResolvedValue(authUser as AuthUser);

    vi.mocked(db.user.findUnique).mockResolvedValue(null);

    const actual = await getUserByUsername('kevinmcgrady');

    expect(actual).toBeNull();
  });
});
