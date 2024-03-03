import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import userProfileDefault from '../../components/assets/user-profile-default.svg'
import '../../components/profile/User.css'
import '../../components/dashboard/DashboardOptions.css'
import csuf from '../../components/assets/titans_csuf.jpg'
import AppHeader from '../header/AppHeader'
import Education from '../../components/dashboard/Education'

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
          <div className='summary-section'>
            <h2>Summary</h2>
            <p>
              As a full-stack engineer with 5 years of experience, I have a proven track record of developing robust and scalable web applications. My
              expertise includes front-end technologies like HTML, CSS, and JavaScript, as well as back-end technologies like Node.js, Express, and
              databases such as MongoDB and SQL.
            </p>
            <p>
              I am passionate about creating seamless user experiences and thrive in collaborative environments where I can contribute innovative
              solutions to complex problems. With a strong foundation in software engineering principles and a passion for learning new technologies,
              I am eager to take on new challenges and drive project success.
            </p>
          </div>
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
