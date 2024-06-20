import { describe, expect, it, vi } from 'vitest';

import { openai } from '@/lib/openai';

import { generateAudioFile } from './generateAudioFile';
import { uploadAudioFile } from './uploadAudioFile';

vi.mock('./uploadAudioFile');
vi.mock('@/lib/openai', () => {
  return {
    openai: {
      audio: {
        speech: {
          create: vi.fn(),
        },
      },
    },
  };
});

describe('generateAudioFile', () => {
  it('should generate an audio file and upload it, returning the URL', async () => {
    const uploadUrl = 'uploadUrl';

    const createMock = vi
      .mocked(openai.audio.speech.create)
      .mockResolvedValue({ arrayBuffer: vi.fn() } as any);
    const uploadMock = vi.mocked(uploadAudioFile).mockResolvedValue(uploadUrl);

    const journal = 'This is a journal entry';
    const voice = 'shimmer';

    const actual = await generateAudioFile(journal, voice);

    expect(createMock).toBeCalledTimes(1);
    expect(createMock).toBeCalledWith({
      model: 'tts-1',
      voice: voice,
      input: journal,
    });
    expect(uploadMock).toBeCalledTimes(1);
    expect(uploadMock).toBeCalledWith(expect.any(Blob));
    expect(actual).toBe(uploadUrl);
  });
});
