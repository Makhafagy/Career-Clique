// import React, { useState } from 'react'
// import AuthService from '../user/AuthService' // Import your AuthService
// import '../../components/profile/ProfilesEdit.css' // Import CSS file for styling
// import { useNavigate } from 'react-router-dom'

// const ProfileEdit = () => {
//   const navigate = useNavigate()
//   const [newUsername, setNewUsername] = useState('')
//   const [error, setError] = useState('')

//   const handleSubmit = async e => {
//     e.preventDefault()
//     try {
//       // Call the updateUsername method from AuthService
//       await AuthService.updateUsername(newUsername)
//       // Redirect the user to the profile page or any other desired page
//       navigate('/user/profile/edit')
//       handleProfileUpdate()
//     } catch (error) {
//       setError('Failed to update username')
//       console.error('Error updating username:', error)
//     }
//   }

//   const handleProfileUpdate = () => {
//     console.log(profilePicture)

//     const updatedProfileData = {
//       // email: 'updated@example.com', // New email
//       // username: 'updated_username', // New username
//       profilePicture: profilePicture, // New profile picture
//     }

//     updateProfile(updatedProfileData) // Call the updateProfile function
//   }

//   const updateProfile = async profileData => {
//     try {
//       const token = localStorage.getItem('token')
//       const response = await axios.put('/api/user/profile', profileData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       console.log(response.data) // Log response from the backend
//       // Handle success or update UI accordingly
//     } catch (error) {
//       console.error('Error updating profile:', error)
//       // Handle error or display error message to the user
//     }
//   }

//   return (
//     <div className='profile-edit-container'>
//       <h2>Edit Profile</h2>
//       <form onSubmit={handleSubmit}>
//         <label>New Username:</label>
//         <input type='text' value={newUsername} onChange={e => setNewUsername(e.target.value)} />
//         <button type='submit'>Save</button>
//       </form>
//       {error && <p className='error-message'>{error}</p>}
//     </div>
//   )
// }

// export default ProfileEdit
