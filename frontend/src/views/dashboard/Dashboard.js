import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import userProfileDefault from '../../components/assets/user-profile-default.svg'
import '../../components/profile/User.css'
import '../../components/dashboard/DashboardOptions.css'
import csuf from '../../components/assets/titans_csuf.jpg'
import AppHeader from '../header/AppHeader'
import Education from '../../components/dashboard/Education'
import Summary from '../../components/dashboard/Summary'

const Dashboard = () => {
  const [isContainerExpanded, setIsContainerExpanded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const navigate = useNavigate()
  const dashboardRef = useRef(null)

  const handleTabClick = tab => {
    // Handle tab click action
    if (tab === 'summary') {
      // Scroll to summary section
      dashboardRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleProfilePictureClick = event => {
    event.stopPropagation()
    setIsContainerExpanded(!isContainerExpanded)
  }

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick)
    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [])

  const handleOutsideClick = event => {
    if (dashboardRef.current && !dashboardRef.current.contains(event.target)) {
      setIsContainerExpanded(false)
    }
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <div className='outer-container'>
      <AppHeader />
      <div className='dashboard-profile-container'>
        <div className='dashboard-picture-container' onClick={handleProfilePictureClick}>
          <img className='dashboard-picture' src={userProfileDefault} alt='Profile' />
        </div>
        <div className='main-container'>
          <Summary />
          <div className='education-section'>
            <h2>Education</h2>
            {/* Render multiple instances of EducationEntry */}
            <Education
              collegeName='California State University Of Fullerton'
              imageUrl={csuf}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
            <Education collegeName='Orange Coast College' imageUrl={csuf} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
            {/* Add more EducationEntry components as needed */}
          </div>
          {/* Additional information to display when hovering over the education entry */}
          {isHovered && <div className='education-info'>{/* Additional information for the hovered education entry */}</div>}
        </div>

        {isContainerExpanded && (
          <div ref={dashboardRef} className='dashboard-container'>
            <div className='dashboard-tabs'>
              <div className='dashboard-tab' onClick={() => handleTabClick('summary')}>
                Summary
              </div>
              <div className='dashboard-tab' onClick={() => handleTabClick('education')}>
                Education
              </div>
              <div className='dashboard-tab' onClick={() => handleTabClick('experience')}>
                Professional Experience
              </div>
              <div className='dashboard-tab' onClick={() => handleTabClick('skills')}>
                Skills
              </div>
              <div className='dashboard-tab' onClick={() => handleTabClick('contact')}>
                Contact
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
