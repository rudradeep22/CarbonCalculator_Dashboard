import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils';

function DashBoardNetZeroArmyCantt({netZeroIITKStatus}) {
  const percentage = netZeroIITKStatus;

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <div className="px-5 pt-5">
        <div className='flex flex-col flex-wrap justify-between items-center xl:flex-row'>
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2 xl:text-2xl">Status of Net Zero IITK&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;</h2>
          <div style={{ width: 100, height: 100 }}>
          <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        background
        backgroundPadding={6}
        styles={buildStyles({
          backgroundColor: "green",
          textColor: "#fff",
          textSize: "25px",
          pathColor: "yellow",
          trailColor: "transparent"
        })}
      />
          </div>
        </div>
      </div>
    </div>
  );
}
export default DashBoardNetZeroArmyCantt;