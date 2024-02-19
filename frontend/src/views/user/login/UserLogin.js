import React, { useState } from 'react'
import '../../../components/user/UserLogin.css' // Import the CSS file for styling

const UserLogin = () => {
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

  return (
    <div className='login-container'>
      <h2>Login</h2>
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
    </div>
  )
}

export default UserLogin
