import React, { useEffect, useState } from 'react';
import Header from '../partials/Header';
import Sidebar from '../partials/Sidebar';

const Talks = () => {
  const [talksData, setTalksData] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Fetch data from the JSON file
    fetch('./talks.json') // Update the path to your JSON file
      .then(response => response.json())
      .then(data => setTalksData(data))
      .catch(error => console.error('Error fetching talks data:', error));
  }, []);

  return (
    <div className="flex h-screen overflow-hidden font-roboto">
  <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
  <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
    <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
    <h1 className="text-5xl text-center m-5 font-bold text-slate-700">Talks</h1>
    {talksData.map((month, idx) => (
      <div key={idx}>
        <h1 className="text-3xl text-center m-10 text-gray-800">{month.month}</h1>
        <div className="mx-10 w-500 flex gap-20 flex-wrap justify-center">
          {month.talks.map((talk, index) => (
            <div key={index} className="flex flex-wrap justify-center bg-white p-6 rounded-lg shadow-md">
              <img
                src="https://media.istockphoto.com/id/1470130937/photo/young-plants-growing-in-a-crack-on-a-concrete-footpath-conquering-adversity-concept.webp?b=1&s=170667a&w=0&k=20&c=IRaA17rmaWOJkmjU_KD29jZo4E6ZtG0niRpIXQN17fc="
                alt="Talk Thumbnail"
                className="w-64 h-40 object-cover rounded-lg"
              />
              <div className="max-w-2xl mb-30 ml-6 mr-6">
                <h2 className="text-xl font-semibold text-slate-800">{talk.title}</h2>
                <p className="text-gray-600">Speaker: {talk.speaker}</p>
                <p className="text-gray-600">Date: {talk.date}</p>
                <p className="text-gray-700">{talk.description}</p>
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

export default Talks;
