import React, { useEffect, useState } from 'react';
import Header from '../partials/Header';

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
      <h1 className="text-5xl text-center m-10">Talks</h1>
        {talksData.map((month,idx)=>(
          <div key={idx}>
            <h1 className="text-3xl text-center m-10">{month.month}</h1>
            <div className="mx-10 w-500 flex gap-20 flex-wrap justify-center">
          {month.talks.map((talk, index) => (
            <div key={index} className="flex flex-wrap justify-center">
              <img src="https://media.istockphoto.com/id/1470130937/photo/young-plants-growing-in-a-crack-on-a-concrete-footpath-conquering-adversity-concept.webp?b=1&s=170667a&w=0&k=20&c=IRaA17rmaWOJkmjU_KD29jZo4E6ZtG0niRpIXQN17fc=" width='400px'></img>
              <div className="max-w-2xl mt-10 mb-30 ml-6 mr-6">
                <h2>{talk.title}</h2>
                <p>Speaker: {talk.speaker}</p>
                <p>Date: {talk.date}</p>
                <p>{talk.description}</p>
              </div>
            </div>
          ))}
          </div>
        </div> 
        ))}
      </div>
  );
};

export default Talks;
