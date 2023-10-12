import React from 'react';
import { Link } from 'react-router-dom';
// import LineChart from '../../charts/LineChart01';
import BarChart02 from '../../charts/BarChart02';
import Icon from '../../images/icon-01.svg';
import EditMenu from '../../components/DropdownEditMenu';

// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils';

function DashboardCard02({projects}) {

  let sum=0;
  projects.forEach(pro => {
    sum += pro;
  });
  const chartData = {
    labels: [
      '2012', '2013',
      '2014', '2015', '2016',
      '2017', '2018', '2019',
      '2020', '2021', '2022',
      '2023'
    ],
    datasets: [
      // green line
      {
        data: projects.slice(0, 12),
        fill: true,
        backgroundColor: `rgba(${hexToRGB(tailwindConfig().theme.colors.green[500])}, 0.08)`,
        borderColor: tailwindConfig().theme.colors.green[500],
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig().theme.colors.green[500],
        pointHoverBackgroundColor: tailwindConfig().theme.colors.green[500],
        pointBorderWidth: 0,
        pointHoverBorderWidth: 0,          
        clip: 20,
      },
    ],
  };
  const uniqueKey = JSON.stringify(chartData);

  return (
    <>
    {projects.length > 0 && 
    <div className="flex flex-col col-span-full hover:scale-105 transition-transform duration-250 sm:col-span-6 xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          {/* Icon */}
          <img src={Icon} width="32" height="32" alt="Icon 02" />
          {/* Menu button */}
          <EditMenu align="right" className="relative inline-flex">
            <li>
              <Link className="font-medium text-sm text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-200 flex py-1 px-3" to="#0">
                View More
              </Link>
            </li>
          </EditMenu>
        </header>
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">Number of projects funded</h2>
        <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase mb-1">Total projects this year</div>
        <div className="flex items-start">
          <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mr-2 mb-5">{sum}</div>
          {/* <div className="text-sm font-semibold text-white px-1.5 bg-amber-500 rounded-full">-14%</div> */}
        </div>
      </div>
      {/* Chart built with Chart.js 3 */}
      <div className="grow max-sm:max-h-[128px] max-h-[128px]">
        {/* Change the height attribute to adjust the chart height */}
        {/* <LineChart key={uniqueKey} data={chartData} width={389} height={128} /> */}
        <BarChart02 key={uniqueKey} data={chartData} width={389} height={128} />
      </div>
    </div>
    }
    </>
  );
}

export default DashboardCard02;
