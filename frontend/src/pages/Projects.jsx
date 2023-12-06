import React, { useEffect, useState } from 'react';
import Header from '../partials/Header';
import Sidebar from '../partials/Sidebar';

const projects = () => {
  const [projectsData, setprojectsData] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Fetch data from the JSON file
    fetch('./projects.json') // Update the path to your JSON file
      .then(response => response.json())
      .then(data => setprojectsData(data))
      .catch(error => console.error('Error fetching projects data:', error));
  }, []);

  return (
    <div className="flex h-screen overflow-hidden font-roboto">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <h1 className="text-5xl text-center m-5">Projects</h1>
          {projectsData.map((month,idx)=>(
            <div key={idx}>
              <h1 className="text-3xl text-center m-10">{month.month}</h1>
              <div className="mx-10 w-500 flex gap-20 flex-wrap justify-center">
            {month.projects.map((project, index) => (
              <div key={index} className="flex flex-wrap justify-center">
                <img src="https://media.istockphoto.com/id/1470130937/photo/young-plants-growing-in-a-crack-on-a-concrete-footpath-conquering-adversity-concept.webp?b=1&s=170667a&w=0&k=20&c=IRaA17rmaWOJkmjU_KD29jZo4E6ZtG0niRpIXQN17fc=" width='400px'></img>
                <div className="max-w-2xl mt-10 mb-30 ml-6 mr-6">
                  <h2>{project.title}</h2>
                  <p>Researcher: {project.researcher}</p>
                  <p>Date: {project.date}</p>
                  <p>{project.description}</p>
                </div>
              </div>
            ))}
            </div>
          </div> 
          ))}
        </div>
      </div>
  );
};

export default projects;
