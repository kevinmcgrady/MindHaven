'use server';

import { currentUser } from '@clerk/nextjs/server';
import { put } from '@vercel/blob';
import OpenAi from 'openai';

import { Voice } from '../types/index';

const openai = new OpenAi({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateAudioFile = async (jornal: string, voice: string) => {
  const mp3 = await openai.audio.speech.create({
    model: 'tts-1',
    voice: voice as Voice,
    input: jornal,
  });

  const buffer = await mp3.arrayBuffer();

  const blob = new Blob([buffer], { type: 'audio/mpeg' });

  const url = await uploadAudioFile(blob);

  return url;
};

export const uploadAudioFile = async (blob: Blob) => {
  const user = await currentUser();

  if (!user) return;

  const month = new Date().getMonth();
  const year = new Date().getFullYear();

  const filename = `${user.id}/${month}-${year}`;

  const { url } = await put(filename, blob, { access: 'public' });
  return url;
};
