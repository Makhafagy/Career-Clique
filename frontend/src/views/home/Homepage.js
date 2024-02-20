import React from 'react'
import '../../components/Index.css'
import UserLogin from '../user/UserLogin'

const Homepage = ({ activeTab, onTabChange }) => {
  return (
    <div>
      <div className='tabs'>
        <button onClick={() => onTabChange('home')} className={activeTab === 'home' ? 'tab active' : 'tab'}>
          Home
        </button>
        <button onClick={() => onTabChange('user')} className={activeTab === 'user' ? 'tab active' : 'tab'}>
          Profile
        </button>
      </div>
      <div className='body-container'>
        {activeTab === 'home' && <h2 className='home-message'>Welcome to the homepage!</h2>}
        {activeTab === 'user' && <UserLogin />}
      </div>
    </div>
  )
}

export default Homepage
