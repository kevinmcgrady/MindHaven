import { currentUser,User as AuthUser } from '@clerk/nextjs/server';
import { User } from '@prisma/client';
import { beforeEach,describe, expect, it, vi } from 'vitest';

import { db } from '@/lib/db';

import { updateUsersProfile } from './updateUsersProfile';

beforeEach(() => {
  vi.resetAllMocks();
});

vi.mock('@clerk/nextjs/server');
vi.mock('@/lib/db', () => {
  return {
    db: {
      user: {
        findUnique: vi.fn(),
        update: vi.fn(),
      },
    },
  };
});

describe('updateUsersProfile', () => {
  it('should return undefined if user is not logged in', async () => {
    vi.mocked(currentUser).mockResolvedValue(null);
    const findMock = vi.mocked(db.user.findUnique);
    const updateMock = vi.mocked(db.user.update);

    const actual = await updateUsersProfile({
      username: 'username',
      bio: 'bio',
      country: 'country',
      mentalHealthGoal: 'goal',
      tags: ['tag'],
    });

    expect(findMock).toBeCalledTimes(0);
    expect(updateMock).toBeCalledTimes(0);
    expect(actual).toBeUndefined();
  });

  it('it should return undefined if there is no user', async () => {
    vi.mocked(currentUser).mockResolvedValue({
      emailAddresses: [{ emailAddress: 'email.com' }],
      firstName: 'Kevin',
      lastName: 'McGrady',
    } as AuthUser);

    const findMock = vi.mocked(db.user.findUnique).mockResolvedValue(null);
    const updateMock = vi.mocked(db.user.update);

    const actual = await updateUsersProfile({
      username: 'username',
      bio: 'bio',
      country: 'country',
      mentalHealthGoal: 'goal',
      tags: ['tag'],
    });

    expect(findMock).toBeCalledTimes(1);
    expect(updateMock).toBeCalledTimes(0);
    expect(actual).toBeUndefined();
  });

  it('it should call the update method if there is a user', async () => {
    const user = {
      emailAddress: 'email.com',
      firstName: 'Kevin',
      lastName: 'McGrady',
    };

    vi.mocked(currentUser).mockResolvedValue({
      id: 'id',
      emailAddresses: [{ emailAddress: 'email.com' }],
      firstName: 'Kevin',
      lastName: 'McGrady',
    } as AuthUser);

    const findMock = vi
      .mocked(db.user.findUnique)
      .mockResolvedValue(user as User);

    const updateMock = vi.mocked(db.user.update);

    await updateUsersProfile({
      username: 'username',
      bio: 'bio',
      country: 'country',
      mentalHealthGoal: 'goal',
      tags: ['tag'],
    });

    expect(findMock).toBeCalledTimes(1);
    expect(updateMock).toBeCalledTimes(1);
    expect(updateMock).toBeCalledWith({
      where: {
        id: 'id',
      },
      data: {
        ...user,
        username: 'username',
        bio: 'bio',
        country: 'country',
        mentalHealthGoal: 'goal',
        tags: ['tag'],
        hasCompletedProfile: true,
      },
    });
  });
});
