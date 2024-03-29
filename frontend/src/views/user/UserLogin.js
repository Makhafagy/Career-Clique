import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import UserSignUp from './UserSignUp'
import ToggleButtons from '../../components/user/UserToggleButtons'
import './../../components/user/UserLogin.css'
import { useAuth } from '../../auth/AuthContext'

const UserLogin = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: '',
  })
  const [showSignUp, setShowSignUp] = useState(false)
  const [showLogin, setShowLogin] = useState(true)
  const { isLoggedIn, setIsLoggedIn } = useAuth()
  const [token, setToken] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')

  const handleChange = e => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const expiration = Date.now() + 3600000
      const response = await axios.post('/api/user/login', formData)
      const { token, email, username } = response.data
      localStorage.setItem('token', token)
      localStorage.setItem('email', email)
      localStorage.setItem('username', username)
      localStorage.setItem('tokenExpiration', expiration)

      setToken(token)
      setUsername(email)
      setUsername(username)
      navigate('/dashboard')
      window.location.reload()
    } catch (error) {
      if (error.response) {
        console.error('Login failed:', error.response.data)
      } else if (error.request) {
        console.error('No response received:', error.request)
      } else {
        console.error('Error during request setup:', error.message)
      }
    }
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
    <div className='outer-container'>
      <div className='main-container'>
        <p className='login-request'>Please log in to access all features.</p>
        {showLogin && (
          <>
            <div className='login-container'>
              <h2 className='login-container-title'>Career Clique</h2>
              <h2 className='login-title'>Login</h2>
              <form onSubmit={handleSubmit}>
                <div className='form-group'>
                  <input
                    type='text'
                    name='emailOrUsername'
                    placeholder='Email or Username'
                    value={formData.emailOrUsername}
                    onChange={handleChange}
                    className='input-field'
                  />
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
              {!showSignUp && showLogin && <ToggleButtons onToggle={handleSignUp} buttonText='Sign Up' />}
              {showSignUp && location.pathname === '/user/signup' && <UserSignUp onLogin={handleLogin} />}
              <button className='login-return-to-home-button' onClick={() => navigate('/home')}>
                Return To Home
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default UserLogin
