import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom' // Import useNavigate
import '../../components/profile/User.css'
import userProfileDefault from '../../components/assets/user-profile-default.svg' // Import the SVG file
import '../../components/profile/Profiles.css' // Import CSS file for additional styling

const Profile = ({ username, email }) => {
  const [profilePicture, setProfilePicture] = useState(null)
  const navigate = useNavigate() // Get the navigate function

  const handleEditProfile = () => {
    navigate('/user/profile/edit') // Navigate to the edit profile page
  }

  const handleProfilePictureChange = e => {
    const file = e.target.files[0]
    setProfilePicture(file)
  }

  return (
    <div className='profile-container'>
      <div className='profile-title'>
        <h2>Profile</h2>
      </div>
      <div className='profile-picture-container'>
        <img className='profile-picture' src={profilePicture ? URL.createObjectURL(profilePicture) : userProfileDefault} alt='Profile' />
      </div>
      <p>Username: {username}</p>
      <p>Email: {email}</p>
      <div className='file-input-container'>
        <input type='file' onChange={handleProfilePictureChange} />
        {profilePicture && <span className='file-name'>{profilePicture.name}</span>}
        {!profilePicture && <span className='no-file-selected'>No file selected</span>}
      </div>
      <button onClick={handleEditProfile}>Edit Profile</button> {/* Button to navigate to edit profile */}
    </div>
  )
}

export default Profile
