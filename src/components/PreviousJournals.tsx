'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Journal } from '@prisma/client';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { cn } from '@/lib/utils';
import { getJournalByDate } from '@/queries/journal';

import { AudioPlayer } from './AudioPlayer';
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

type PreviousJournalsProps = {
  journals: Journal[];
};

const PreviousJournals = ({ journals }: PreviousJournalsProps) => {
  const [selectedJournal, setSelectedJournal] = useState<
    Journal | null | undefined
  >(null);

  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(true);

  const journalDates: string[] = journals.map((journal) =>
    format(journal.createdAt, 'yyyy-MM-dd'),
  );

  const FormSchema = z.object({
    entryDate: z.date({
      required_error: 'A entry date is required.',
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const handleSubmit = async (entryDate: Date | null) => {
    try {
      if (!entryDate) return;

      const journal = await getJournalByDate(entryDate);

      setSelectedJournal(journal);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form {...form}>
        <form className='space-y-8'>
          <FormField
            control={form.control}
            name='entryDate'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <Popover open={isPopoverOpen}>
                  <PopoverTrigger
                    onClick={() => setIsPopoverOpen(true)}
                    asChild
                  >
                    <FormControl>
                      <Button
                        variant='outline'
                        className={cn(
                          'pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0' align='start'>
                    <Calendar
                      mode='single'
                      selected={field.value}
                      onSelect={async (event) => {
                        setIsPopoverOpen(false);
                        field.onChange(event);
                        await handleSubmit(event || null);
                      }}
                      disabled={(date) => {
                        const formattedDate = format(date, 'yyyy-MM-dd');
                        return !journalDates.includes(formattedDate);
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      {selectedJournal && (
        <div className='mt-8'>
          <AudioPlayer journal={selectedJournal} />
          <h3 className=' font-semibold mt-8 mb-2'>Transcript</h3>
          <p>&quot;{selectedJournal.entry}&quot;</p>
        </div>
      )}
    </>
  );
};

export default PreviousJournals;
