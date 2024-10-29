import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './../../components/user/UserSignUp.css'

const UserSignUp = ({ onLogin }) => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleChange = e => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
  }

  const handleLogin = () => {
    navigate('/login')
    onLogin()
  }

  return (
    <div>
      <h2 className='signup-title'>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <input type='email' name='email' placeholder='Email' value={formData.email} onChange={handleChange} className='input-field' />
        </div>
        <div className='form-group'>
          <input type='password' name='password' placeholder='Password' value={formData.password} onChange={handleChange} className='input-field' />
        </div>
        <div className='form-group'>
          <input
            type='password'
            name='confirmPassword'
            placeholder='Confirm Password'
            value={formData.confirmPassword}
            onChange={handleChange}
            className='input-field'
          />
        </div>
        <div className='form-group'>
          <button type='submit' className='signup-button'>
            Sign Up
          </button>
        </div>
      </form>
      <div className='form-group'>
        <button onClick={handleLogin} className='back-to-login-button'>
          Back to Login
        </button>
      </div>
    </div>
  )
}

export default UserSignUp
