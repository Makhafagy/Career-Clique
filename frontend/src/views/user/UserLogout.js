import React from 'react'
import AuthService from './AuthService' // Import your AuthService

const UserLogout = () => {
  const handleLogout = () => {
    // Call the logout method from AuthService
    AuthService.logout()
    // Redirect the user to the login page or any other desired page
    window.location.href = '/user/login'
  }

  return (
    <div>
      {/* Render a button to trigger logout */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default UserLogout
