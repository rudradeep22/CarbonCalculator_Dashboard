import React from 'react';
import { Link } from 'react-router-dom';
// import LineChart from '../../charts/LineChart01';
import Icon from '../../images/icon-01.svg';
import EditMenu from '../../components/DropdownEditMenu';

// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils';
import BarChart02 from '../../charts/BarChart02';

function DashboardCard03({papers}) {

  let sum=0;
  papers.forEach(pap => {
    sum += pap;
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
        // data: [
        //   540, 466, 540, 466, 385, 432, 334,
        //   334, 289, 289, 200, 289, 222, 289,
        //   289, 403, 554, 304, 289, 270, 134,
        //   270, 829, 344, 388, 364,
        // ],
        data:papers,
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
    {papers.length > 0 && 
    <div className="flex flex-col col-span-full hover:scale-105 transition-transform duration-250 sm:col-span-6 xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          {/* Icon */}
          <img src={Icon} width="32" height="32" alt="Icon 03" />
          {/* Menu button */}
          <EditMenu align="right" className="relative inline-flex">
            <li>
              <Link className="font-medium text-sm text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-200 flex py-1 px-3" to="#0">
                View More
              </Link>
            </li>
          </EditMenu>
        </header>
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">Number of papers published</h2>
        <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase mb-1">Total Papers this year</div>
        <div className="flex items-start">
          <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mr-2">{sum}</div>
          {/* <div className="text-sm font-semibold text-white px-1.5 bg-emerald-500 rounded-full">+49%</div> */}
        </div>
      </div>
      {/* Chart built with Chart.js 3 */}
      <div className="grow max-sm:max-h-[128px] xl:max-h-[128px]">
        {/* Change the height attribute to adjust the chart height */}
        {/* <LineChart key={uniqueKey} data={chartData} width={389} height={128} /> */}
        <BarChart02 key={uniqueKey} data={chartData} width={389} height={128} />
      </div>
    </div>
    }
    </>
  );
}

export default DashboardCard03;
