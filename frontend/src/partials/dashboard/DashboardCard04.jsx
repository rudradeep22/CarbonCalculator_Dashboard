import React from 'react';
import BarChart from '../../charts/BarChart01';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';

function DashboardCard04( {linkedinPosts, newsPaperArticles, twitterArticles }) {

  const chartData = {
    labels: [
      '12-01-2020', '01-01-2021', '02-01-2021',
      '03-01-2021', '04-01-2021', '05-01-2021',
      '12-01-2020', '01-01-2021', '02-01-2021',
      '03-01-2021', '04-01-2021', '05-01-2021',
      '12-01-2020', '01-01-2021', '02-01-2021',
      '03-01-2021', '04-01-2021', '05-01-2021',
      '12-01-2020', '01-01-2021', '02-01-2021',
      '03-01-2021', '04-01-2021', '05-01-2021',
    ],
    datasets: [
      // dark green bars
      {
        label: 'Linkedin Posts',
        data: linkedinPosts,
        backgroundColor: tailwindConfig().theme.colors.green[600],
        hoverBackgroundColor: tailwindConfig().theme.colors.green[700],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      // green bars
      {
        label: 'Newspaper Articles',
        data: newsPaperArticles,
        backgroundColor: tailwindConfig().theme.colors.green[400],
        hoverBackgroundColor: tailwindConfig().theme.colors.green[450],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      {
        label: 'Twitter Articles',
        data: twitterArticles,
        backgroundColor: tailwindConfig().theme.colors.red[400],
        hoverBackgroundColor: tailwindConfig().theme.colors.red[450],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
    ],
  };

  const uniqueKey = JSON.stringify(chartData);

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Direct VS Indirect</h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <BarChart key={uniqueKey} data={chartData} width={595} height={248} />
    </div>
  );
}

export default DashboardCard04;
