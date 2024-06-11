'use client';

import { Journal } from '@prisma/client';
import { Pause, Play, RotateCcw, RotateCw } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { formatTime } from '@/lib/formatTime';

import { Progress } from './ui/progress';

type AudioPlayerProps = {
  journal: Journal;
};

export const AudioPlayer = ({ journal }: AudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);

  const togglePlayPause = () => {
    if (audioRef.current?.paused) {
      audioRef.current?.play();
      setIsPlaying(true);
    } else {
      audioRef.current?.pause();
      setIsPlaying(false);
    }

    console.log(audioRef.current?.duration);
  };

  const forward = () => {
    if (
      audioRef.current &&
      audioRef.current.currentTime &&
      audioRef.current.duration &&
      audioRef.current.currentTime + 5 < audioRef.current.duration
    ) {
      audioRef.current.currentTime += 5;
    }
  };

  const rewind = () => {
    if (audioRef.current && audioRef.current.currentTime - 5 > 0) {
      audioRef.current.currentTime -= 5;
    } else if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
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

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={journal.audioUrl}
        className='hidden'
        onEnded={handleAudioEnded}
      />

      <div className='flex border shadow rounded-xl overflow-hidden mx-auto'>
        <div className='flex flex-col w-full'>
          <div className='flex flex-col sm:flex-row items-center p-5'>
            <div className='flex items-center'>
              <div className='flex space-x-3 p-2 items-center'>
                <RotateCcw
                  className='w-5 h-5 text-[#64748B] cursor-pointer'
                  onClick={rewind}
                />
                {isPlaying && (
                  <Pause
                    onClick={togglePlayPause}
                    className='w-5 h-5 text-[#F77334] cursor-pointer'
                  />
                )}
                {!isPlaying && (
                  <Play
                    onClick={togglePlayPause}
                    className='w-5 h-5 text-[#F77334] cursor-pointer'
                  />
                )}
                <RotateCw
                  className='w-5 h-5 text-[#64748B] cursor-pointer'
                  onClick={forward}
                />
              </div>
            </div>
            <Progress
              value={(currentTime / duration) * 100}
              className='w-full'
              max={duration}
            />
            <div className='flex justify-end w-full sm:w-auto pt-1 sm:pt-0'>
              <span className='text-sm uppercase font-semibold pl-2'>
                {formatTime(currentTime)}/{formatTime(duration)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
