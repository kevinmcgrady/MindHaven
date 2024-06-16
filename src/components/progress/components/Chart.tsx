import { Mood } from '@prisma/client';
import { AgChartsReact } from 'ag-charts-react';

import { moods } from '@/constants/moods';

type ChartProps = {
  chartData: { mood: Mood; noOfDays: number }[];
};

const Chart = ({ chartData }: ChartProps) => {
  const chartColors = moods.map((mood) => mood.color);

  return (
    <div className='h-full mt-4'>
      <AgChartsReact
        options={{
          series: [
            {
              fills: [...chartColors],
              data: chartData,
              type: 'pie',
              calloutLabelKey: 'mood',
              angleKey: 'noOfDays',
              radiusKey: 'noOfDays',
            },
          ],
        }}
      />
    </div>
  );
};

export default Chart;
