const jwt = require('jsonwebtoken')
const Profile = require('../models/tables/Profile')
const { JWT_SECRET } = require('../config')

exports.profileInformation = async (req, res) => {
  try {
    // Extract user information from the JWT token
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const decodedToken = jwt.verify(token, JWT_SECRET)
    const userId = decodedToken.userId

    const { email, username, profilePicture } = req.body

    // If profilePicture is provided, update profile picture for all profiles with the matching email
    if (profilePicture) {
      // Find all profiles with the matching email address
      const profiles = await Profile.find({ email })

      // Update profile picture for each found profile
      await Promise.all(
        profiles.map(async profile => {
          profile.picture = profilePicture
          await profile.save()
        })
      )

      return res.status(200).json({ message: 'Profile(s) updated successfully' })
    }

    // If profilePicture is not provided, update the user's profile with email and username
    // Fetch user's profile information
    let profile = await Profile.findOne({ user: userId })

    if (!profile) {
      // If profile doesn't exist, create a new one
      const newProfile = new Profile({ user: userId, username, email })
      await newProfile.save()
    } else {
      // If profile exists, update the fields
      profile.username = username || profile.username
      profile.email = email || profile.email
      await profile.save()
    }

    res.status(200).json({ message: 'Profile updated successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
