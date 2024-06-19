import { currentUser, User as AuthUser } from '@clerk/nextjs/server';
import { User } from '@prisma/client';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { db } from '@/lib/db';

import { syncUser } from './syncUser';

beforeEach(() => {
  vi.resetAllMocks();
});

vi.mock('@clerk/nextjs/server');
vi.mock('@/lib/db', () => {
  return {
    db: {
      user: {
        findUnique: vi.fn(),
        create: vi.fn(),
      },
    },
  };
});

describe('syncUser', () => {
  it('should return null if the user is not logged in', async () => {
    vi.mocked(currentUser).mockResolvedValue(null);
    const actual = await syncUser();
    expect(actual).toBeUndefined();
  });

  it('should return null if the user already exists', async () => {
    vi.mocked(currentUser).mockResolvedValue({
      emailAddresses: [{ emailAddress: 'email.com' }],
    } as AuthUser);

    const createMock = vi.mocked(db.user.create);

    const dbMock = vi.mocked(db.user.findUnique).mockResolvedValue({
      emailAddress: 'email.com',
      firstName: 'Kevin',
      lastName: 'McGrady',
    } as User);

    const actual = await syncUser();

    expect(dbMock).toBeCalledTimes(1);
    expect(createMock).toBeCalledTimes(0);
    expect(actual).toBeUndefined();
  });

  it('should create a new user if the user does not exist', async () => {
    vi.mocked(currentUser).mockResolvedValue({
      emailAddresses: [{ emailAddress: 'email.com' }],
      firstName: 'Kevin',
      lastName: 'McGrady',
      id: 'id',
      imageUrl: 'imageURL',
    } as AuthUser);

    const createMock = vi.mocked(db.user.create);

    const dbMock = vi.mocked(db.user.findUnique).mockResolvedValue(null);

    const actual = await syncUser();
    expect(dbMock).toBeCalledTimes(1);
    expect(createMock).toBeCalledWith({
      data: {
        emailAddress: 'email.com',
        firstName: 'Kevin',
        lastName: 'McGrady',
        id: 'id',
        imageUrl: 'imageURL',
      },
    });

    expect(actual).toBeUndefined();
  });
});
