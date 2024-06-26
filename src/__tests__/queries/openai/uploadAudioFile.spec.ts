import { currentUser, User as AuthUser } from '@clerk/nextjs/server';
import { put } from '@vercel/blob';
import { describe, expect, it, vi } from 'vitest';

import { uploadAudioFile } from '@/queries/openai/uploadAudioFile';

vi.mock('@clerk/nextjs/server');
vi.mock('@vercel/blob');

describe('uploadAudioFile', () => {
  it('it should return undefined if the user is logged out', async () => {
    vi.mocked(currentUser).mockResolvedValue(null);
    const actual = await uploadAudioFile(new Blob());

    expect(actual).toBeUndefined();
  });

  it('it should upload the blob to the store and return the url', async () => {
    vi.mocked(currentUser).mockResolvedValue({
      emailAddresses: [{ emailAddress: 'email.com' }],
      id: 'userId',
    } as AuthUser);

    const vercelMock = vi.mocked(put).mockResolvedValue({ url: 'url' } as any);

    const blob = new Blob();

    const actual = await uploadAudioFile(blob);

    const fileName = `userId/${new Date().getMonth()}-${new Date().getFullYear()}`;

    expect(vercelMock).toBeCalledTimes(1);
    expect(vercelMock).toBeCalledWith(fileName, blob, { access: 'public' });
    expect(actual).toBe('url');
  });
});
