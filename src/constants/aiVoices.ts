import { Voice } from '@prisma/client';

type VoiceType = {
  name: Voice;
  isFreePlan: boolean;
};

export const aiVoices: VoiceType[] = [
  {
    name: 'alloy',
    isFreePlan: true,
  },
  {
    name: 'echo',
    isFreePlan: true,
  },
  {
    name: 'fable',
    isFreePlan: false,
  },
  {
    name: 'onyx',
    isFreePlan: false,
  },
  {
    name: 'nova',
    isFreePlan: false,
  },
  {
    name: 'shimmer',
    isFreePlan: false,
  },
];
