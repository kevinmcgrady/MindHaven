'use server';

import { Voice } from '@prisma/client';

import { openai } from '@/lib/openai';

import { uploadAudioFile } from './uploadAudioFile';

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
