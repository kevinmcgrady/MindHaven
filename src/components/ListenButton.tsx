'use client';

import { Journal } from '@prisma/client';
import { Play } from 'lucide-react';

import { formatDate } from '@/lib/formatDate';

import { AudioPlayer } from './AudioPlayer';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';

type ListenButtonProps = {
  journal: Journal;
};

const ListenButton = ({ journal }: ListenButtonProps) => {
  return (
    <div className='mt-4'>
      <Dialog>
        <DialogTrigger asChild>
          <Button size='icon'>
            <Play size={15} />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <h1 className='font-semibold text-lg'>{journal.title}</h1>
          <p className='text-xs text-muted-foreground underline'>
            Spoken by {journal.voice}
          </p>
          <p className='text-muted-foreground'>&quot;{journal.entry}&quot;</p>
          <AudioPlayer audioUrl={journal.audioUrl} />
          <div className='flex items-center justify-between'>
            <p className='text-xs'>{formatDate(journal.createdAt)}</p>
            <Badge variant='outline'>{journal.mood}</Badge>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ListenButton;
