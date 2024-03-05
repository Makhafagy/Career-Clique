import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import userProfileDefault from '../../components/assets/user-profile-default.svg'
import '../../components/profile/User.css'
import '../../components/dashboard/DashboardOptions.css'
import AppHeader from '../header/AppHeader'
import Summary from '../../components/dashboard/Summary'
import Education from '../../components/dashboard/Education'

const Dashboard = () => {
  const [isContainerExpanded, setIsContainerExpanded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const navigate = useNavigate()
  const dashboardRef = useRef(null)
  const summaryRef = useRef(null)
  const educationRef = useRef(null)
  const experienceRef = useRef(null)
  const skillsRef = useRef(null)
  const contactRef = useRef(null)

  const handleTabClick = tab => {
    const sectionRef =
      tab === 'summary'
        ? summaryRef.current
        : tab === 'education'
        ? educationRef.current
        : tab === 'experience'
        ? experienceRef.current
        : tab === 'skills'
        ? skillsRef.current
        : tab === 'contact'
        ? contactRef.current
        : null

    if (sectionRef) {
      sectionRef.scrollIntoView({ behavior: 'smooth', block: 'start' })
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
          <h1 className='tab-title'>Dashboard</h1>
          <Summary ref={summaryRef} />
          <Education ref={educationRef} />
          {/* Add other sections here */}
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
