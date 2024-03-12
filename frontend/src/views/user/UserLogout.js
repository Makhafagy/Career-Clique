import React from 'react'
import AuthService from './AuthService' // Import your AuthService
import '../../components/user/UserLogout.css' // Import CSS file for styling
import { useNavigate } from 'react-router-dom'

const UserLogout = () => {
  const navigate = useNavigate()
  const handleLogout = () => {
    AuthService.logout()
    console.log('we logged out?')
    navigate('/user/login')
    window.location.reload()
  }

  return (
    <div>
      <button className='logout-button' onClick={handleLogout}>
        Logout
      </button>
    </div>
  )
}

export default UserLogout
