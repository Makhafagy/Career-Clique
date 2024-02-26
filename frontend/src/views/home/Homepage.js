import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../../components/Index.css'
import UserLogin from '../user/UserLogin'

const Homepage = ({ activeTab, onTabChange }) => {
  const navigate = useNavigate() // Use the navigate function

  const handleTabChange = tab => {
    // Update the URL based on the selected tab
    navigate(`/${tab}`)
    // Call the onTabChange callback to update the active tab
    onTabChange(tab)
  }

  return (
    <div>
      <div className='tabs'>
        <button onClick={() => handleTabChange('home')} className={activeTab === 'home' ? 'tab active' : 'tab'}>
          Home
        </button>
        <button onClick={() => handleTabChange('user')} className={activeTab === 'user' ? 'tab active' : 'tab'}>
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
