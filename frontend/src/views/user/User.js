import React, { useState, useEffect } from 'react'
import AuthService from './AuthService' // Import your AuthService
import UserLogout from './UserLogout'
import AppHeader from '../header/AppHeader'
import UserLogin from './UserLogin'
import '../../components/profile/User.css'

const User = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')

  useEffect(() => {
    // Function to check authentication status
    const checkAuthentication = async () => {
      try {
        const token = AuthService.getToken() // Retrieve token from AuthService
        const storedUsername = AuthService.getUsername() // Retrieve username from AuthService

        if (token) {
          // Token exists, user is logged in
          setIsLoggedIn(true)
          setUsername(storedUsername) // Set the username state
        } else {
          // Token does not exist, user is not logged in
          setIsLoggedIn(false)
          setUsername('') // Clear the username state
        }
      } catch (error) {
        console.error('Error checking authentication:', error)
        // Handle error, maybe redirect to login page
      }
    }

    // Call checkAuthentication function when component mounts
    checkAuthentication()
  }, []) // Empty dependency array ensures this effect runs only once on component mount

  return (
    <div className='main-container'>
      <AppHeader />
      {isLoggedIn ? (
        <div>
          {/* Render authenticated content here */}
          <p className='welcome-message'>
            Welcome <span className='username'>{username}</span>.
          </p>
          <UserLogout /> {/* Include the UserLogout component */}
        </div>
      ) : (
        <div>
          {/* Render content for users not logged in */}
          <p>Please log in to access all features.</p>
          <UserLogin />
        </div>
      )}
    </div>
  )
}

export default User
