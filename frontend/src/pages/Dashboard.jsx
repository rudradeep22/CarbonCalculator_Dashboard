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
import DashBoardOutreach from '../partials/dashboard/DashBoardOutreach';
import DashboardCard12 from '../partials/dashboard/DashboardCard12';
import ExcelUploader from '../utils/ExcelUploader';
import axios from 'axios';
import ExcelDownloader from '../utils/ExcelDownloader';

const getUrl = import.meta.env.VITE_URL + "/api/getStats";

function Dashboard() {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [linkedinPosts, setLinkedinPosts] = useState([]);
  const [newsPaperArticles, setNewsPaperArticles] = useState([]);
  const [projects, setProjects] = useState([]);
  const [papers, setPapers] = useState([]);
  const [netZeroIITKStatus, setNetZeroIITKStatus] = useState("");
  const [netZeroArmyCanttStatus, setNetZeroArmyCanttStatus] = useState("");
  const [outreachActivities, setOutreachActicities] = useState("");

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

useEffect( () => {
  axios.get(getUrl)
  .then((stats) => {
    console.log(stats.data[0]);
    setLinkedinPosts(stats.data[0].linkedinPosts);
    setNewsPaperArticles(stats.data[0].newsPaperArticles);
    setProjects(stats.data[0].projects);
    setPapers(stats.data[0].papers);
    setNetZeroIITKStatus(stats.data[0].netZeroIITKStatus);
    setNetZeroArmyCanttStatus(stats.data[0].netZeroArmyCanttStatus);
    setOutreachActicities(stats.data[0].outreachActivities);
  })
  .catch((err)=> console.log(err))
},[])

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            {/* Welcome banner */}
            <WelcomeBanner />

            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
              </div>
              <div className='flex flex-wrap justify-around gap-3'>
                <ExcelDownloader />
                <ExcelUploader setLinkedinPosts={handlelinkedinPosts} setNewsPaperArticles={handlenewsPaperArticles} setProjects={handleProjects} setPapers={handlePapers} setNetZeroIITKStatus={handlenetZeroIITKStatus} setNetZeroArmyCanttStatus={handlenetZeroArmyCanttStatus} setOutreachActicities={handleoutreachActivities}/>
              </div>

            </div>

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">
              {/* Line chart (Acme Plus) */}
              {linkedinPosts && <DashboardCard01 linkedinPosts={linkedinPosts} />}
              {newsPaperArticles && <DashBoardNewsPaperArticles newsPaperArticles={newsPaperArticles} />}
              {projects && <DashboardCard02 projects={projects} />}
              {/* Line chart (Acme Professional) */}
              {papers && <DashboardCard03 papers={papers} />}        {/* Bar chart (Direct vs Indirect) */}
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