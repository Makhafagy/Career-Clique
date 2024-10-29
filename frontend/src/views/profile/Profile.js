import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import userProfileDefault from '../../components/assets/user-profile-default.svg'
import pencilIcon from '../../components/assets/pencil-icon.png'
import '../../components/profile/User.css'
import '../../components/profile/Profiles.css'

const Profile = ({ username, email }) => {
  const [profilePicture, setProfilePicture] = useState(null)
  const [isHovered, setIsHovered] = useState(false)
  const fileInputRef = useRef(null)
  const navigate = useNavigate()

  const handleEditProfile = () => {
    navigate('/user/profile/edit')
    window.location.reload()
  }

  const handleProfilePictureChange = e => {
    const file = e.target.files[0]
    setProfilePicture(file)
  }

  const handleEditPicture = async () => {
    try {
      const token = localStorage.getItem('token')
      const userEmail = localStorage.getItem('email')
      const username = localStorage.getItem('username')

      if (!token || !userEmail || !username) {
        console.error('Token, userEmail, or username not found in local storage')
        return
      }

      const formData = new FormData()
      // formData.append('profilePicture', profilePicture)
      formData.append('email', userEmail)
      formData.append('username', username)

      await axios.post('/api/user/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      })
    } catch (error) {
      console.error('Error updating profile picture:', error)
    }
  }

  const handleClickFileInput = () => {
    // Trigger the file input dialog
    fileInputRef.current.click()
  }

  return (
    <div className='profile-container'>
      <h1 className='tab-title'>Profile</h1>
      {/* Render authenticated content here */}
      <p className='welcome-message'>
        Welcome <span className='username'>{username}</span>.
      </p>
      <div
        className='profile-picture-container'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClickFileInput} // Open file input dialog when clicked
      >
        <img className='profile-picture' src={profilePicture ? URL.createObjectURL(profilePicture) : userProfileDefault} alt='Profile' />
        {isHovered && (
          <button className='edit-picture-button' onClick={handleEditPicture}>
            <img src={pencilIcon} alt='Edit' />
          </button>
        )}
      </div>
      <p>Username: {username}</p>
      <p>Email: {email}</p>
      {/* Hidden file input element */}
      <input type='file' id='fileInput' ref={fileInputRef} onChange={handleProfilePictureChange} style={{ display: 'none' }} />
      <button onClick={handleEditProfile}>Edit Profile</button>
    </div>
  )
}

export default Profile
