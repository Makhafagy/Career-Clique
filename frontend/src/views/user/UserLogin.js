import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import UserSignUp from './UserSignUp'
import ToggleButtons from '../../components/user/UserToggleButtons'
import './../../components/user/UserLogin.css'

const UserLogin = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [showSignUp, setShowSignUp] = useState(false)
  const [showLogin, setShowLogin] = useState(true)

  const handleChange = e => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    // Add your login logic here
  }

  const handleSignUp = () => {
    navigate('/user/signup')
    setShowSignUp(true)
    setShowLogin(false)
  }

  const handleLogin = () => {
    setShowSignUp(false)
    setShowLogin(true)
  }

  return (
    <div className='login-container'>
      <h2 className='login-container-title'>Career Clique</h2>
      {showLogin && (
        <>
          <h2 className='login-title'>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <input type='email' name='email' placeholder='Email' value={formData.email} onChange={handleChange} className='input-field' />
            </div>
            <div className='form-group'>
              <input
                type='password'
                name='password'
                placeholder='Password'
                value={formData.password}
                onChange={handleChange}
                className='input-field'
              />
            </div>
            <div className='form-group'>
              <button type='submit' className='login-button'>
                Login
              </button>
            </div>
          </form>
        </>
      )}
      {!showSignUp && showLogin && <ToggleButtons onToggle={handleSignUp} buttonText='Sign Up' />}
      {showSignUp && location.pathname === '/user/signup' && <UserSignUp onLogin={handleLogin} />}
    </div>
  )
}

export default UserLogin
