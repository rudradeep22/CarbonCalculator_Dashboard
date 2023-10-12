import React from 'react';
import LineChart from '../../charts/LineChart02';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';

function DashboardCard08( {funding1, funding2, funding3}) {

  const chartData = {
    labels: [
      '01-01-2021',
      '02-01-2021',
      '03-01-2021',
      '04-01-2021',
      '05-01-2021',
      '06-01-2021',
      '07-01-2021',
      '08-01-2021',
      '09-01-2021',
      '10-01-2021',
      '11-01-2021',
      '12-01-2021',
      '01-01-2022',
      '02-01-2022',
      '03-01-2022',
      '04-01-2022',
      '05-01-2022',
      '06-01-2022',
      '07-01-2022',
      '08-01-2022',
      '09-01-2022',
      '10-01-2022',
      '11-01-2022',
      '12-01-2022',
    ],
    datasets: [
      // Indigo line
      {
        label: 'Total funding',
        data: funding1,
        borderColor: tailwindConfig().theme.colors.red[500],
        fill: false,
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig().theme.colors.red[500],
        pointHoverBackgroundColor: tailwindConfig().theme.colors.red[500],
        pointBorderWidth: 0,
        pointHoverBorderWidth: 0,
        clip: 20,
      },
      // Blue line
      {
        label: 'Yearly budget',
        data: funding2,
        borderColor: tailwindConfig().theme.colors.blue[400],
        fill: false,
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig().theme.colors.blue[400],
        pointHoverBackgroundColor: tailwindConfig().theme.colors.blue[400],
        pointBorderWidth: 0,
        pointHoverBorderWidth: 0,
        clip: 20,
      },
      // emerald line
      {
        label: 'Expenditure of budget',
        data: funding3,
        borderColor: tailwindConfig().theme.colors.emerald[500],
        fill: false,
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig().theme.colors.emerald[500],
        pointHoverBackgroundColor: tailwindConfig().theme.colors.emerald[500],
        pointBorderWidth: 0,
        pointHoverBorderWidth: 0,
        clip: 20,
      },
    ],
  };

  const uniquekey = JSON.stringify(chartData);

  return (
    <div className="flex flex-col col-span-full sm:col-span-12 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex items-center">
        <h2 className=" text-2xl font-semibold text-slate-800 dark:text-slate-100">Funding</h2>
      </header>
      <LineChart key={uniquekey} data={chartData} width={595} height={248} />
    </div>
  );
}

export default DashboardCard08;
