// User.js
import React, { useState, useEffect } from 'react'
import AuthService from './AuthService'
import UserLogout from './UserLogout'
import AppHeader from '../header/AppHeader'
import UserLogin from './UserLogin'
import Profile from '../profile/Profile' // Import the Profile component
import '../../components/profile/User.css'

const User = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const token = AuthService.getToken()
        const storedUsername = AuthService.getUsername()
        const storedEmail = AuthService.getEmail()

        if (token) {
          setIsLoggedIn(true)
          setUsername(storedUsername)
          setEmail(storedEmail)
        } else {
          setIsLoggedIn(false)
          setUsername('')
          setEmail(storedEmail)
        }
      } catch (error) {
        console.error('Error checking authentication:', error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuthentication()
  }, [])

  return (
    <div className='outer-container'>
      <div className='user-container'>
        <AppHeader />
        {isLoading ? (
          <p>Loading...</p>
        ) : isLoggedIn ? (
          <div>
            <div className='user-content-container'>
              {/* Render Profile component */}
              <Profile username={username} email={email} />
            </div>
            <div style={{ alignSelf: 'flex-start' }}>
              {' '}
              <UserLogout />
            </div>
          </div>
        ) : (
          <div>
            {/* Render content for users not logged in */}
            <UserLogin />
          </div>
        )}
      </div>
    </div>
  )
}

export default User
