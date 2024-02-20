import React from 'react'
import '../../components/Index.css'
import UserLogin from '../user/login/UserLogin'

const Homepage = ({ activeTab, onTabChange }) => {
  return (
    <div className='inner-container'>
      <div className='tabs'>
        <button onClick={() => onTabChange('home')} className={activeTab === 'home' ? 'tab active' : 'tab'}>
          Home
        </button>
        <button onClick={() => onTabChange('user')} className={activeTab === 'user' ? 'tab active' : 'tab'}>
          User
        </button>
        {/* Add more tabs as needed */}
      </div>
      {/* Render content based on active tab */}
      {activeTab === 'home' && <h2 className='home-message'>Welcome to the homepage!</h2>}
      {activeTab === 'user' && <UserLogin />}
      {/* Add content for other tabs as needed */}
    </div>
  )
}

export default Homepage
