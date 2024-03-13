import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../components/profile/User.css'
import '../../components/service/Services.css'
import technology from '../../components/assets/technology.jpg'
import transportation from '../../components/assets/transportation.jpg'
import construction from '../../components/assets/construction.jpg'
import AppHeader from '../header/AppHeader'
import UserLogout from '../user/UserLogout' // Import your Logout component
import AuthService from '../user/AuthService' // Import your AuthService

const Service = () => {
  const [isContainerExpanded, setIsContainerExpanded] = useState(false)
  const [isHovered, setIsHovered] = useState(null) // Track hovered service tab
  const [isTokenExpired, setIsTokenExpired] = useState(false) // State to track token expiration
  const [selectedTab, setSelectedTab] = useState('technology') // State to track the selected service tab
  const [searchQuery, setSearchQuery] = useState('') // State to track the search query
  const navigate = useNavigate()

  const handleServiceClick = tab => {
    setSelectedTab(tab)
  }

  const handleSearchChange = event => {
    setSearchQuery(event.target.value)
  }

  useEffect(() => {
    const checkTokenExpiration = () => {
      const tokenExpiration = localStorage.getItem('tokenExpiration')
      if (tokenExpiration && Date.now() > Number(tokenExpiration)) {
        AuthService.logout() // Logout if token is expired
        setIsTokenExpired(true) // Update state to indicate token expiration
        navigate('/user/login')
      }
    }

    checkTokenExpiration() // Check token expiration once when component mounts
  }, [navigate])

  const handleMouseEnter = tab => {
    setIsHovered(tab) // Set the hovered tab
  }

  const handleMouseLeave = () => {
    setIsHovered(null) // Reset hovered tab
  }

  return (
    <div className='outer-container'>
      <AppHeader />
      <div className='service-profile-container'>
        <div className='main-container'>
          <h1 className='tab-title'>Services</h1>
          <div className='service-section'>
            <h1 className='title'>Industry Selection</h1>
            <div className='service-grid'>
              <div className={`service-tab`} onClick={() => handleServiceClick('technology')}>
                <img
                  className={`service-image ${isHovered === 'technology' ? 'blur' : ''}`}
                  src={technology}
                  alt='Technology'
                  onMouseEnter={() => handleMouseEnter('technology')}
                  onMouseLeave={handleMouseLeave}
                />
                <h2 className='service-tab-title'>Technology</h2>
              </div>
              <div className={`service-tab`} onClick={() => handleServiceClick('transportation')}>
                <img
                  className={`service-image ${isHovered === 'transportation' ? 'blur' : ''}`}
                  src={transportation}
                  alt='Transportation'
                  onMouseEnter={() => handleMouseEnter('transportation')}
                  onMouseLeave={handleMouseLeave}
                />
                <h2 className='service-tab-title'>Transportation</h2>
              </div>
              <div className={`service-tab`} onClick={() => handleServiceClick('construction')}>
                <img
                  className={`service-image ${isHovered === 'construction' ? 'blur' : ''}`}
                  src={construction}
                  alt='Construction'
                  onMouseEnter={() => handleMouseEnter('construction')}
                  onMouseLeave={handleMouseLeave}
                />
                <h2 className='service-tab-title'>Construction</h2>
              </div>
              <div className={`service-tab other`} onClick={() => handleServiceClick('other')}>
                {/* Placeholder content for the "Other" tab */}
                <h2 className='service-tab-title'>Other</h2>
              </div>
            </div>
          </div>
          <input type='text' value={searchQuery} onChange={handleSearchChange} placeholder='Search for services...' className='search-input' />
          {/* Render options based on the selected tab and search query */}
          <div className='service-options'>
            {/* Example: Technology options */}
            {selectedTab === 'technology' && (
              <>
                <div className='service-option'>Programmer</div>
                <div className='service-option'>IT</div>
                <div className='service-option'>Other</div>
              </>
            )}
            {/* Add options for other tabs similarly */}
          </div>
        </div>
      </div>

      {/* Render Logout component if token is expired */}
      {isTokenExpired && <UserLogout />}
    </div>
  )
}

export default Service
