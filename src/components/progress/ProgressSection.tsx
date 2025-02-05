'use client';

import { Journal } from '@prisma/client';
import { Fragment, useState } from 'react';

import PreviousJournals from '@/components/journal/PreviousJournals';
import CardSection from '@/components/layout/CardSection';
import Chart from '@/components/progress/components/Chart';
import MonthYearDropdown from '@/components/progress/components/MonthYearDropdown';
import EmptyState from '@/components/site/EmptyState';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { getJournalsByMonthAndYear } from '@/queries/journal';
import { mapChartData } from '@/utils/mapChartData';

type ProgressSectionProps = {
  defaultJournals: Journal[];
  defaultMonth: string;
  defaultYear: string;
};

const ProgressSection = ({
  defaultJournals,
  defaultMonth,
  defaultYear,
}: ProgressSectionProps) => {
  const { toast } = useToast();
  const [selectedMonth, setSelectedMonth] = useState<string>(defaultMonth);
  const [selectedYear, setSelectedYear] = useState<string>(defaultYear);
  const [selectedJournals, setSelectedJournals] =
    useState<Journal[]>(defaultJournals);

  const chartData = mapChartData(selectedJournals);

  const hasChartData = selectedJournals && selectedJournals.length > 0;

  const handleUpdateMonth = async (month: string) => {
    try {
      setSelectedMonth(month);
      const journals = await getJournalsByMonthAndYear(month, selectedYear);
      setSelectedJournals(journals || []);
    } catch (error) {
      toast({
        title: 'Oops',
        description: 'There was an error getting your journals',
        variant: 'destructive',
      });
    }
  };

  const handleUpdateYear = async (year: string) => {
    try {
      setSelectedYear(year);
      const journals = await getJournalsByMonthAndYear(selectedMonth, year);
      setSelectedJournals(journals || []);
    } catch (error) {
      toast({
        title: 'Oops',
        description: 'There was an error getting your journals',
        variant: 'destructive',
      });
    }
  };

  return (
    <Fragment>
      <CardSection
        className={cn('flex flex-col h-[500px]', {
          'h-fit': !hasChartData,
        })}
      >
        <div className='flex flex-col h-full'>
          <MonthYearDropdown
            defaultMonth={defaultMonth}
            defaultYear={defaultYear}
            onMonthChange={handleUpdateMonth}
            onYearChange={handleUpdateYear}
          />

          {!hasChartData && (
            <div className='mt-8'>
              <EmptyState
                description={`You don't have any journals for ${selectedMonth} ${selectedYear}`}
              />
            </div>
          )}
          {hasChartData && <Chart chartData={chartData} />}
        </div>
      </CardSection>

      {hasChartData && (
        <CardSection>
          <h3 className='mb-2 font-semibold text-lg'>Entries</h3>
          <p className='mb-4 text-muted-foreground'>
            You have {selectedJournals.length} entries in {selectedMonth}. Great
            job 😀
          </p>
          <Separator className='mb-4' />
          <PreviousJournals
            disableCalendarNavigation
            journals={selectedJournals}
          />
        </CardSection>
      )}
    </Fragment>
  );
};

export default ProgressSection;
