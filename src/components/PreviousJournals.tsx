'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Journal } from '@prisma/client';
import { format } from 'date-fns';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { formatDate } from '@/lib/formatDate';
import { cn } from '@/lib/utils';
import { getJournalByDate } from '@/queries/journal';

import ListenButton from './ListenButton';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

type PreviousJournalsProps = {
  journals: Journal[];
};

type SelectedJournal = Journal | null | undefined;

const PreviousJournals = ({ journals }: PreviousJournalsProps) => {
  const [selectedJournal, setSelectedJournal] = useState<SelectedJournal>(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
      setSelectedJournal(null);
      setIsLoading(true);
      const journal = await getJournalByDate(entryDate);
      setSelectedJournal(journal);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
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

      <section>
        {isLoading && (
          <div className='mt-4 flex items-center flex-col'>
            <Loader2 size={30} color='#F77334' className='animate-spin' />
          </div>
        )}

        {selectedJournal && (
          <div className='mt-4'>
            <h3 className='font-semibold mb-2 text-lg'>
              {selectedJournal.title}
            </h3>
            <p className='mb-4 text-muted-foreground'>
              &quot;{selectedJournal.entry}&quot;
            </p>

            <div className='flex items-center justify-between'>
              <p className='text-xs'>{formatDate(selectedJournal.createdAt)}</p>
              <Badge variant='outline'>{selectedJournal.mood}</Badge>
            </div>

            <ListenButton journal={selectedJournal} />
          </div>
        )}
      </section>
    </>
  );
};

export default PreviousJournals;
