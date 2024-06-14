import { Voice } from '@/types';

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
    isFreePlan: true,
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
