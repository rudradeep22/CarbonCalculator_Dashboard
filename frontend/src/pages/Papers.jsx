import React, { useEffect, useState } from 'react';

const Papers = () => {
  const [PapersData, setPapersData] = useState([]);

  useEffect(() => {
    // Fetch data from the JSON file
    fetch('./papers.json') // Update the path to your JSON file
      .then(response => response.json())
      .then(data => setPapersData(data))
      .catch(error => console.error('Error fetching Papers data:', error));
  }, []);

  return (
    <div>
      {PapersData.map((paper, index) => (
        <div key={index}>
          <h2>{paper.title}</h2>
          <p>author: {paper.author}</p>
          <p>Date: {paper.date}</p>
          <p>{paper.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Papers;
