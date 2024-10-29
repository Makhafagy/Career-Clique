const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()

// Import your JWT_SECRET
const { JWT_SECRET } = require('../../config')

// Route to handle token refreshing
router.post('/refresh-token', (req, res) => {
  try {
    // Assuming you have userId available in req.body
    const userId = req.body.userId // Adjust according to your request body

    // Generate a new JWT token
    const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' })

    // Send the new token in the response
    res.status(200).json({ accessToken: token })
  } catch (error) {
    console.error('Error refreshing token:', error)
    res.status(500).json({ error: 'Token refresh failed' })
  }
})

module.exports = router
