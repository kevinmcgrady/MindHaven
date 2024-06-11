'use client';

import { Pause, Play } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { formatTime } from '@/lib/formatTime';

import { Button } from './ui/button';
import { Progress } from './ui/progress';

type AudioPlayerProps = {
  audioUrl: string;
};

export const AudioPlayer = ({ audioUrl }: AudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);

  const handleTogglePlayPause = () => {
    if (audioRef.current?.paused) {
      audioRef.current?.play();
      setIsPlaying(true);
    } else {
      audioRef.current?.pause();
      setIsPlaying(false);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  useEffect(() => {
    setDuration(audioRef?.current?.duration! || 0);
  }, [audioRef.current?.duration]);

  useEffect(() => {
    const updateCurrentTime = () => {
      setCurrentTime(audioRef?.current?.currentTime!);
    };

    const audioElement = audioRef.current!;

    audioElement.addEventListener('timeupdate', updateCurrentTime);

    return () => {
      audioElement.removeEventListener('timeupdate', updateCurrentTime);
    };
  }, []);

  return (
    <div className='my-4'>
      <audio
        ref={audioRef}
        src={audioUrl}
        className='hidden'
        onEnded={handleAudioEnded}
      />

      <Progress
        value={(currentTime / duration) * 100}
        className='w-full mb-4'
        max={duration}
      />

      <div className='flex items-center justify-between'>
        <div className='flex'>
          {isPlaying && (
            <Button onClick={handleTogglePlayPause} size='icon'>
              <Pause size={15} />
            </Button>
          )}
          {!isPlaying && (
            <Button onClick={handleTogglePlayPause} size='icon'>
              <Play size={15} />
            </Button>
          )}
        </div>

        <div>
          <span className='text-xs text-muted-foreground font-semibold'>
            {formatTime(currentTime)}/{formatTime(duration)}
          </span>
        </div>
      </div>
    </div>
  );
};
