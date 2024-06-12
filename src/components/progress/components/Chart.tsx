import { AgChartsReact } from 'ag-charts-react';

type ChartProps = {
  chartData: { mood: string; noOfDays: number }[];
};

const Chart = ({ chartData }: ChartProps) => {
  return (
    <div className='h-full mt-4'>
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
  );
};

export default Chart;
