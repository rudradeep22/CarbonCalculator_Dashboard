import React from 'react';
import Icon from '../../images/favicon.png';

function getGreeting(){
  const now = new Date();
  const hours = now.getHours();
  let greeting;
  if (hours >= 5 && hours < 12) {
    greeting = 'Good morning';
  } else if (hours >= 12 && hours < 17) {
    greeting = 'Good afternoon';
  } else {
    greeting = 'Good evening';
  }
  return greeting;
}


function WelcomeBanner() {
  return (
    <div className="relative bg-green-200 dark:bg-indigo-500 p-4 sm:p-6 rounded-sm overflow-hidden mb-8">
      {/* Content */}
      <div className="flex justify-around">
        {/* <img src={Icon}alt="Icon" className='w-16 b-6' /> */}
        <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold mb-1">{getGreeting()} 👋</h1>
        <p className="dark:text-indigo-200 text-2xl md:text-3xl">  Here is what’s happening with our projects today</p>
        {/* <img src={Icon}alt="Icon" className='w-16 b-6'/> */}
      </div>
    </div>
  );
}

export default WelcomeBanner;
