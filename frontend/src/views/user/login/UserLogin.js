import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom' // Import useNavigate instead of useHistory
import '../../../components/user/UserLogin.css' // Import the CSS file for styling

const UserLogin = () => {
  const navigate = useNavigate() // Initialize useNavigate hook

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = e => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    // Handle form submission
  }

  const handleSignUp = () => {
    // Navigate to the sign-up page
    navigate('/signup')
  }

  return (
    <div className='login-container'>
      <h2 className='login-title'>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <input type='email' name='email' placeholder='Email' value={formData.email} onChange={handleChange} className='input-field' />
        </div>
        <div className='form-group'>
          <input type='password' name='password' placeholder='Password' value={formData.password} onChange={handleChange} className='input-field' />
        </div>
        <div className='form-group'>
          <button type='submit' className='login-button'>
            Login
          </button>
        </div>
      </form>
      {/* Add the sign-up button */}
      <div className='form-group'>
        <button onClick={handleSignUp} className='signup-button'>
          Sign Up
        </button>
      </div>
    </div>
  )
}

export default UserLogin
