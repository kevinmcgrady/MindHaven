'use client';

import {
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  PointElement,
} from 'chart.js';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Scatter } from 'react-chartjs-2';

import { Button } from './ui/button';

ChartJS.register(CategoryScale, LinearScale, PointElement);

export const Chart = () => {
  return (
    <div className='mb-8'>
      <div className='flex justify-end gap-4 items-center'>
        <p className='font-light'>2024</p>
        <div className='flex gap-2'>
          <Button size='icon'>
            <ChevronLeft size={15} />
          </Button>
          <Button size='icon'>
            <ChevronRight size={15} />
          </Button>
        </div>
      </div>
      <Scatter
        data={{
          labels: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
          ],
          datasets: [
            {
              data: [{ x: 'Jan', y: 1 }],
            },
          ],
        }}
      />
    </div>
  );
};
