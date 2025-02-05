'use client';

import { Journal } from '@prisma/client';
import { Play } from 'lucide-react';

import { AudioPlayer } from '@/components/AudioPlayer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { formatDate } from '@/utils/formatDate';

type ListenButtonProps = {
  journal: Journal;
  badgeColor: string;
};

const ListenButton = ({ journal, badgeColor }: ListenButtonProps) => {
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
            <Badge
              variant='outline'
              className='p-2 rounded-md'
              style={{ backgroundColor: badgeColor }}
            >
              {journal.mood}
            </Badge>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ListenButton;
