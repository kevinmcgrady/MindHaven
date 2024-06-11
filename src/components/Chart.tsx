'use client';

import { Journal } from '@prisma/client';
import { AgChartsReact } from 'ag-charts-react';
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import _ from 'underscore';

import { Button } from './ui/button';

type ChartProps = {
  journals: Journal[];
};

export const Chart = ({ journals }: ChartProps) => {
  const currentMonth = format(new Date(), 'MMM');
  const currentYear = format(new Date(), 'yyyy');

  const groupedJournals = _.groupBy(journals, 'mood');

  const chartData = [
    { mood: 'HAPPY', noOfDays: groupedJournals.HAPPY?.length || 0 },
    { mood: 'SAD', noOfDays: groupedJournals.SAD?.length || 0 },
    { mood: 'ANXIOUS', noOfDays: groupedJournals.ANXIOUS?.length || 0 },
    { mood: 'EXITED', noOfDays: groupedJournals.EXITED?.length || 0 },
    { mood: 'DEPRESSED', noOfDays: groupedJournals.DEPRESSED?.length || 0 },
  ];

  const handleNextMonth = () => {};

  const handlePrevMonth = () => {};

  return (
    <div className='mb-8 flex flex-col flex-1'>
      <div className='flex justify-end gap-4 items-center'>
        <p className='font-light'>
          {currentMonth} {currentYear}
        </p>
        <div className='flex gap-2'>
          <Button size='icon'>
            <ChevronLeft onClick={handlePrevMonth} size={15} />
          </Button>
          <Button size='icon'>
            <ChevronRight onClick={handleNextMonth} size={15} />
          </Button>
        </div>
      </div>
      <div className='relative h-full mt-4'>
        <AgChartsReact
          options={{
            series: [
              {
                fills: ['#B7C0D4', '#BAAE97', '#E6A98A', '#CBBFC6', '#95BDB6'],
                data: chartData,
                type: 'pie',
                calloutLabelKey: 'mood',
                sectorLabelKey: 'mood',
                angleKey: 'noOfDays',
                radiusKey: 'noOfDays',
              },
            ],
          }}
        />
      </div>
    </div>
  );
};
