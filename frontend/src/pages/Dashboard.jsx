import React, { useEffect, useState } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import WelcomeBanner from '../partials/dashboard/WelcomeBanner';
import DashboardCard01 from '../partials/dashboard/DashboardCard01';
import DashboardCard02 from '../partials/dashboard/DashboardCard02';
import DashboardCard03 from '../partials/dashboard/DashboardCard03';
import DashBoardNewsPaperArticles from '../partials/dashboard/DashBoardNewsPaperArticles';
import DashBoardNetZeroIITK from '../partials/dashboard/DashBoardNetZeroIITK';
import DashBoardNetZeroArmyCantt from '../partials/dashboard/DashBoardNetZeroArmyCantt';
import DashboardCard12 from '../partials/dashboard/DashboardCard12';
import ExcelUploader from '../utils/ExcelUploader';
import axios from 'axios';
import ExcelDownloader from '../utils/ExcelDownloader';
import ExcelCurrentDownloader from '../utils/ExcelCurrentDownloader';

import DashBoardCard04 from '../partials/dashboard/DashboardCard04';
import DashboardCard05 from '../partials/dashboard/DashboardCard05';
import Followers from '../partials/dashboard/Followers';
import DashboardCard08 from '../partials/dashboard/DashboardCard08';
import Loading from '../partials/dashboard/Loading';
import { BarWave } from "react-cssfx-loading";
import { useAuth0 } from '@auth0/auth0-react';
import DashboardTalks from '../partials/dashboard/DashboardCardTalks';

const getUrl = import.meta.env.VITE_URL + "/api/getStats";

function Dashboard() {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [linkedinPosts, setLinkedinPosts] = useState([]);
  const [twitterArticles, setTwitterArticles] = useState([]);
  const [newsPaperArticles, setNewsPaperArticles] = useState([]);
  const [projects, setProjects] = useState([]);
  const [papers, setPapers] = useState([]);
  const [netZeroIITKStatus, setNetZeroIITKStatus] = useState("");
  const [netZeroArmyCanttStatus, setNetZeroArmyCanttStatus] = useState("");
  const [outreachActivities, setOutreachActicities] = useState("");
  const [funding1, setFunding1] = useState([]);
  const [funding2, setFunding2] = useState([]);
  const [funding3, setFunding3] = useState([]);
  const [talks, setTalks] = useState([]);
  const [linkedinFollowers, setLinkedinFollowers] = useState(0);
  const [twitterFollowers, setTwitterFollowers] = useState(0);

  const handlelinkedinPosts = (newlinkedinPosts) => {
    setLinkedinPosts(newlinkedinPosts);
  }
  const handlenewsPaperArticles = (newNewsPaperArticles) => {
    setNewsPaperArticles(newNewsPaperArticles);
  }
  const handleProjects = (newProjects) => {
    setProjects(newProjects);
  }
  const handlePapers = (newPapers) => {
    setPapers(newPapers);
  }
  const handlenetZeroIITKStatus = (newNetZeroIITKStatus) => {
    setNetZeroIITKStatus(newNetZeroIITKStatus);
  }
  const handlenetZeroArmyCanttStatus = (newNetZeroArmyCanttStatus) => {
    setNetZeroArmyCanttStatus(newNetZeroArmyCanttStatus);
  }
  const handleoutreachActivities = (newOutreachActivities) => {
    setOutreachActicities(newOutreachActivities);
  }
  const handletwitterArticles = (twitterArticles) => {
    setTwitterArticles(twitterArticles);
  }
  const handleFunding1 = (funding1) => {
    setFunding1(funding1);
  }
  const handleFunding2 = (funding2) => {
    setFunding2(funding2);
  }
  const handleFunding3 = (funding3) => {
    setFunding3(funding3);
  }
  const handleTalks = (talks) => {
    setTalks(talks);
  }
  const handlelinkedinFollowers = (linkedinFollowers) => {
    setLinkedinFollowers(linkedinFollowers);
  }
  const handletwitterFollowers = (twitterFollowers) => {
    setTwitterFollowers(twitterFollowers);
  }

useEffect( () => {
  axios.get(getUrl)
  .then((stats) => {
    console.log(stats.data[0]);
    setLinkedinPosts(stats.data[0].linkedinPosts);
    setTwitterArticles(stats.data[0].twitterArticles);
    setNewsPaperArticles(stats.data[0].newsPaperArticles);
    setProjects(stats.data[0].projects);
    setPapers(stats.data[0].papers);
    setNetZeroIITKStatus(stats.data[0].netZeroIITKStatus);
    setNetZeroArmyCanttStatus(stats.data[0].netZeroArmyCanttStatus);
    setOutreachActicities(stats.data[0].outreachActivities);
    setFunding1(stats.data[0].funding1);
    setFunding2(stats.data[0].funding2);
    setFunding3(stats.data[0].funding3);
    setTalks(stats.data[0].talks);
    setLinkedinFollowers(stats.data[0].linkedinFollowers);
    setTwitterFollowers(stats.data[0].twitterFollowers);
  })
  .catch((err)=> console.log(err))
},[])

const { user, loginWithRedirect, isAuthenticated, logout} = useAuth0();
const [name, setName] = useState("")
useEffect(() => {
  if(user)
    setName(user.given_name)
}, user)

  return (
    <div className="flex h-screen overflow-hidden font-roboto">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Welcome banner */}
            <div className='flex justify-end mb-5'>
              {isAuthenticated ? (
                <button className='bg-red-600 text-white font-bold py-2 px-4 rounded-full inline-block cursor-pointer text-base transition-all duration-300 ease-in-out hover:text-lg hover:bg-red-700' onClick={() => logout()}>Log Out</button>
              ) : (
                <button className='bg-green-600 text-white font-bold py-2 px-4 rounded-full inline-block cursor-pointer text-base transition-all duration-300 ease-in-out hover:text-lg hover:bg-green-700' onClick={() => loginWithRedirect()}>Log In</button>
              )}
            </div>
            <WelcomeBanner name={name} isAuthenticated={isAuthenticated}/>

            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
              </div>
              <div className='flex flex-wrap justify-around gap-3'>
                {linkedinFollowers && <Followers linkedinFollowers={linkedinFollowers} twitterFollowers={twitterFollowers} />}
                {user && user.email === import.meta.env.VITE_ADMIN_EMAIL && (
                  <div className='flex flex-wrap justify-around gap-3'>
                    <ExcelCurrentDownloader linkedinPosts={linkedinPosts} twitterArticles={twitterArticles} newsPaperArticles={newsPaperArticles} projects={projects} papers={papers} netZeroIITKStatus={netZeroIITKStatus} netZeroArmyCanttStatus={netZeroArmyCanttStatus} outreachActivities={outreachActivities} funding1={funding1} funding2={funding2} funding3={funding3} talks={talks} linkedinFollowers={linkedinFollowers} twitterFollowers={twitterFollowers} />
                    <ExcelDownloader />
                    <ExcelUploader setLinkedinPosts={handlelinkedinPosts} 
                    setTwitterArticles={handletwitterArticles} 
                    setNewsPaperArticles={handlenewsPaperArticles} 
                    setProjects={handleProjects} 
                    setPapers={handlePapers} 
                    setNetZeroIITKStatus={handlenetZeroIITKStatus} 
                    setNetZeroArmyCanttStatus={handlenetZeroArmyCanttStatus} 
                    setOutreachActicities={handleoutreachActivities} 
                    setFunding1={setFunding1} 
                    setFunding2={setFunding2} 
                    setFunding3={setFunding3} 
                    setTalks={setTalks} 
                    setLinkedinFollowers={setLinkedinFollowers} setTwitterFollowers={setTwitterFollowers}/>
                  </div>
                )}
              </div>
            </div>
            {/* Loading  */}
            <div className='flex flex-wrap flex-col items-center justify-around'>
            <Loading funding1={funding1} />
            {(funding1.length <= 0) && <BarWave color='green' />}
            </div>
            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">
              {funding1 && <DashboardCard08 funding1={funding1} funding2={funding2} funding3={funding3}/>}
              {linkedinPosts && newsPaperArticles && <DashBoardCard04 linkedinPosts={linkedinPosts} newsPaperArticles={newsPaperArticles} twitterArticles={twitterArticles}/>}
              {talks && <DashboardTalks talks={talks} />}
              {projects && <DashboardCard02 projects={projects} />}
              {papers && <DashboardCard03 papers={papers} />}        {/* Bar chart */}
              {netZeroIITKStatus && <DashBoardNetZeroIITK netZeroIITKStatus={netZeroIITKStatus} />}
              {netZeroArmyCanttStatus && <DashBoardNetZeroArmyCantt netZeroArmyCanttStatus={netZeroArmyCanttStatus} />}
              {outreachActivities && <DashboardCard12 outreachActivities={outreachActivities}/>}
            </div>

          </div>
        </main>

      </div>
    </div>
  );
}

export default Dashboard;