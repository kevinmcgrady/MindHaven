'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Journal } from '@prisma/client';
import { format } from 'date-fns';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { moods } from '@/constants/moods';
import { cn } from '@/lib/utils';
import { getJournalByDate } from '@/queries/journal';

import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Separator } from '../ui/separator';
import { useToast } from '../ui/use-toast';
import JournalCard from './JournalCard';

type PreviousJournalsProps = {
  journals: Journal[];
  disableCalendarNavigation?: boolean;
};

type SelectedJournals = Journal[] | null | undefined;

const PreviousJournals = ({
  journals,
  disableCalendarNavigation = false,
}: PreviousJournalsProps) => {
  const [selectedJournals, setSelectedJournals] =
    useState<SelectedJournals>(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
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
      setSelectedJournals(null);
      setIsLoading(true);

      const journal = await getJournalByDate(format(entryDate, 'yyyy-MM-dd'));

      setSelectedJournals(journal);
    } catch (error) {
      toast({
        title: 'Oops',
        description: 'There was an issue getting your journals',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Fragment>
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
                      showOutsideDays={false}
                      disableNavigation={disableCalendarNavigation}
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

      <section className='mt-4'>
        {isLoading && (
          <div className='mt-4 flex items-center flex-col'>
            <Loader2 size={30} className='animate-spin' />
          </div>
        )}

        {selectedJournals && (
          <div className='space-y-4'>
            {selectedJournals.map((journal, index) => {
              const badgeColor = moods.find(
                (mood) => mood.name === journal.mood.toLowerCase(),
              )?.color;
              return (
                <Fragment key={journal.id}>
                  <JournalCard
                    badgeColor={badgeColor!}
                    dense={selectedJournals.length > 1}
                    journal={journal}
                  />
                  {index !== selectedJournals.length - 1 && <Separator />}
                </Fragment>
              );
            })}
          </div>
        )}
      </section>
    </Fragment>
  );
};

export default PreviousJournals;
