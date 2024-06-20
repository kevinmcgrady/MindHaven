'use server';

import { currentUser } from '@clerk/nextjs/server';
import { put } from '@vercel/blob';

export const uploadAudioFile = async (blob: Blob) => {
  const user = await currentUser();

  if (!user) return;

  const month = new Date().getMonth();
  const year = new Date().getFullYear();

  const filename = `${user.id}/${month}-${year}`;

  const { url } = await put(filename, blob, { access: 'public' });

  return url;
};
