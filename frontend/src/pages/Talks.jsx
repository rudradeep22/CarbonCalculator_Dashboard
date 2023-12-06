import React, { useEffect, useState } from 'react';

const Talks = () => {
  const [talksData, setTalksData] = useState([]);

  useEffect(() => {
    // Fetch data from the JSON file
    fetch('./talks.json') // Update the path to your JSON file
      .then(response => response.json())
      .then(data => setTalksData(data))
      .catch(error => console.error('Error fetching talks data:', error));
  }, []);

  return (
    <div>
      {talksData.map((talk, index) => (
        <div key={index}>
          <h2>{talk.title}</h2>
          <p>Speaker: {talk.speaker}</p>
          <p>Date: {talk.date}</p>
          <p>{talk.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Talks;
