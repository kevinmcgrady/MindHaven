import { currentUser, User as AuthUser } from '@clerk/nextjs/server';
import { User } from '@prisma/client';
import { describe, expect, it, vi } from 'vitest';

import { db } from '@/lib/db';
import { getUserDetails } from '@/queries/auth/getUsersDetails';

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

describe('getUsersDetails', () => {
  it('should return undefined if user is not logged in', async () => {
    vi.mocked(currentUser).mockResolvedValue(null);
    const actual = await getUserDetails();
    expect(actual).toBeUndefined();
  });

  it('should return the user if exists', async () => {
    const user = {
      emailAddress: 'email.com',
      firstName: 'Kevin',
      lastName: 'McGrady',
    };

    vi.mocked(currentUser).mockResolvedValue({
      emailAddresses: [{ emailAddress: 'email.com' }],
    } as AuthUser);

    vi.mocked(db.user.findUnique).mockResolvedValue(user as User);

    const actual = await getUserDetails();

    expect(actual).toStrictEqual(user);
  });

  it('should return null if the user does not exist', async () => {
    vi.mocked(currentUser).mockResolvedValue({
      emailAddresses: [{ emailAddress: 'email.com' }],
    } as AuthUser);

    vi.mocked(db.user.findUnique).mockResolvedValue(null);

    const actual = await getUserDetails();

    expect(actual).toBeNull();
  });
});
