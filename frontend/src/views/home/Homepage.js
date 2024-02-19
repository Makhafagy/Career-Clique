import React, { useState } from 'react';
import UserLogin from '../user/login/UserLogin';

const Homepage = () => {
  const [activeTab, setActiveTab] = useState('home');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className="tabs">
        <button onClick={() => handleTabChange('home')} className={activeTab === 'home' ? 'active' : ''}>Home</button>
        <button onClick={() => handleTabChange('user')} className={activeTab === 'user' ? 'active' : ''}>User</button>
        {/* Add more tabs as needed */}
      </div>
      <div className="tab-content">
        {activeTab === 'home' && <h2>Welcome to the homepage!</h2>}
        {activeTab === 'user' && <UserLogin />}
        {/* Add content for other tabs as needed */}
      </div>
    </div>
  );
};

export default Homepage;
