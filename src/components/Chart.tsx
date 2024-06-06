'use client';

import { AgChartsReact } from 'ag-charts-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { chartData } from '@/constants/dummyChartData';

import { Button } from './ui/button';

export const Chart = () => {
  return (
    <div className='mb-8 flex flex-col flex-1'>
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
      <div className='relative h-full mt-4'>
        <AgChartsReact
          options={{
            data: chartData,
            theme: {
              overrides: {
                bar: {
                  series: {
                    stroke: 'transparent',
                    strokeWidth: 2,
                    cornerRadius: 6,
                    fillOpacity: 0.8,
                  },
                },
              },
            },

            series: [
              {
                type: 'bar',
                xKey: 'month',
                yKey: 'happy',
                yName: 'Happy',
                stacked: true,
                normalizedTo: 100,
                fill: '#E7AA8B',
              },
              {
                type: 'bar',
                xKey: 'month',
                yKey: 'sad',
                yName: 'Sad',
                stacked: true,
                normalizedTo: 100,
                fill: '#D7D4B0',
              },
              {
                type: 'bar',
                xKey: 'month',
                yKey: 'depressed',
                yName: 'Depressed',
                stacked: true,
                normalizedTo: 100,
                fill: '#B9C1D3',
              },
              {
                type: 'bar',
                xKey: 'month',
                yKey: 'anxious',
                yName: 'Anxious',
                stacked: true,
                normalizedTo: 100,
                fill: '#CBC0C5',
              },
              {
                type: 'bar',
                xKey: 'month',
                yKey: 'exited',
                yName: 'Exited',
                stacked: true,
                normalizedTo: 100,
                fill: '#95BDB6',
              },
            ],
            axes: [
              {
                type: 'category',
                position: 'bottom',
                paddingInner: 0,
                groupPaddingInner: 0,
                paddingOuter: 0,
              },
              {
                type: 'number',
                position: 'left',
                nice: false,
                gridLine: {
                  enabled: false,
                },
                label: {
                  formatter(params) {
                    return `${params.value} days`;
                  },
                },
                crosshair: {
                  enabled: false,
                },
              },
            ],
          }}
        />
      </div>
    </div>
  );
};
