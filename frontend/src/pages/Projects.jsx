import React, { useEffect, useState } from 'react';

const Projects = () => {
  const [ProjectsData, setProjectsData] = useState([]);

  useEffect(() => {
    // Fetch data from the JSON file
    fetch('./projects.json') // Update the path to your JSON file
      .then(response => response.json())
      .then(data => setProjectsData(data))
      .catch(error => console.error('Error fetching Projects data:', error));
  }, []);

  return (
    <div>
      {ProjectsData.map((project, index) => (
        <div key={index}>
          <h2>{project.title}</h2>
          <p>Speaker: {project.speaker}</p>
          <p>Date: {project.date}</p>
          <p>{project.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Projects;
