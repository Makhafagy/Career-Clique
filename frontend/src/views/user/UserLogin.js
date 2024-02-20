import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './../../components/user/UserLogin.css'
import ToggleButtons from '../../components/user/UserToggleButtons'
import UserSignUp from './UserSignUp'

const UserLogin = () => {
  const navigate = useNavigate()

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
  }

  const handleSignUp = () => {
    navigate('/signup')
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
      {showSignUp && <UserSignUp onLogin={handleLogin} />}
    </div>
  )
}

export default UserLogin
