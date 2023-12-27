import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../partials/Header';
import Sidebar from '../partials/Sidebar';

const Talks = ({isAuthenticated}) => {
  const [talksData, setTalksData] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fetchurl = import.meta.env.VITE_URL + '/api/getTalks'

  useEffect(() => {
    // Make an API call to fetch talks from MongoDB
    const fetchTalks = async () => {
      try {
        const response = await axios.get(fetchurl);
        setTalksData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTalks();
  }, []);
console.log(isAuthenticated);
  return (
    <div className="flex h-screen overflow-hidden font-roboto">
  <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
  <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
    <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
    <h1 className="text-5xl text-center m-5 font-bold text-slate-700">Talks</h1>
    {talksData.map((talk, idx) => (
      <div key={idx} className="mb-8 min-w-1/4"> {/* Added minimum width */}
        <div className="mx-10 gap-20">
          <div key={idx} className="flex flex-wrap bg-white p-6 rounded-lg shadow-md">
            <img
              src={`https://media.istockphoto.com/id/1470130937/photo/young-plants-growing-in-a-crack-on-a-concrete-footpath-conquering-adversity-concept.webp?b=1&s=170667a&w=0&k=20&c=IRaA17rmaWOJkmjU_KD29jZo4E6ZtG0niRpIXQN17fc=`} 
              alt="Talk Thumbnail"
              className="w-64 h-40 object-cover rounded-lg"
            />
            <div className="max-w-2xl mb-6 ml-6 mr-6">
              {isAuthenticated && (
                <h4>Unique id: {talk._id}</h4>)}
              <h2 className="text-xl font-semibold text-slate-800 my-2">{talk.title}</h2>
              <p className="text-gray-600 my-1">Speaker: {talk.speaker}</p>
              <p className="text-gray-600 my-1">Date: {talk.date}</p>
              <p className="text-gray-700 my-1">{talk.description}</p>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>


  );
};

export default Talks;
