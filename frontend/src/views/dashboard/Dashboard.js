import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import userProfileDefault from '../../components/assets/user-profile-default.svg'
import '../../components/profile/User.css'
import '../../components/dashboard/DashboardOptions.css'
import AppHeader from '../header/AppHeader'
import Summary from '../../components/dashboard/Summary'
import Education from '../../components/dashboard/Education'
import UserLogout from '../user/UserLogout'
import AuthService from '../user/AuthService'
import Resume from '../../components/dashboard/Resume'

const Dashboard = () => {
  const [isContainerExpanded, setIsContainerExpanded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isTokenExpired, setIsTokenExpired] = useState(false) // State to track token expiration
  const navigate = useNavigate()
  const dashboardRef = useRef(null)
  const resumeRef = useRef(null)
  const summaryRef = useRef(null)
  const educationRef = useRef(null)
  const experienceRef = useRef(null)
  const skillsRef = useRef(null)
  const contactRef = useRef(null)

  const handleTabClick = tab => {
    const sectionRef =
      tab === 'resume'
        ? resumeRef.current
        : tab === 'summary'
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
      const sectionTop = sectionRef.getBoundingClientRect().top + window.scrollY
      const offset = 60 // Adjust this value based on the height of the fixed tabs
      window.scrollTo({
        top: sectionTop - offset,
        behavior: 'smooth',
      })
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
          {!isTokenExpired && (
            <>
              <Summary ref={summaryRef} />
              <Education ref={educationRef} />
              <Resume ref={resumeRef} />
              {/* Add other sections here */}
            </>
          )}
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
              <div className='dashboard-tab' onClick={() => handleTabClick('resume')}>
                Resume
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Render Logout component if token is expired */}
      {isTokenExpired && <UserLogout />}
    </div>
  )
}

export default Dashboard
