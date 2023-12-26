import React, { useState } from 'react';
import{ talksInfo, updateTalksInfo } from './data'

const UpdateForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    speaker: '',
    month: '',
  });

  const [selectedTab, setSelectedTab] = useState('Talks');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  
    // Depending on the selected tab, update the corresponding talksInfo data
    const newTalk = {
      title: formData.title,
      description: formData.description,
      date: formData.date,
      ...(selectedTab !== 'Activities' && { speaker: formData.speaker }),
    };
    const selectedMonth = formData.month;
    // Find the month in talksInfo
    const monthIndex = talksInfo.findIndex((month) => month.month === selectedMonth);

    updateTalksInfo(newTalk, selectedMonth);
    // Log the updated talksInfo
    console.log(talksInfo);
      setFormData({
      title: '',
      description: '',
      date: '',
      speaker: '',
      month: '',
    });
  };

  return (
    <div className="p-4">
      <div className="flex space-x-4">
        {['Talks', 'Projects', 'Papers', 'Activities'].map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`${
              selectedTab === tab ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-700'
            } p-2 rounded-md`}
          >
            {tab}
          </button>
        ))}
      </div>

      <form onSubmit={handleFormSubmit} className="space-y-4 mt-4">
      <div>
          <label className="block text-sm font-medium text-gray-700">Month</label>
          <input
            type="text"
            name="month"
            value={formData.month}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="text"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        {selectedTab !== 'Activities' && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Speaker</label>
            <input
              type="text"
              name="speaker"
              value={formData.speaker}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
        )}
        <button type="submit" className="bg-green-500 text-white p-2 rounded-md">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateForm;
