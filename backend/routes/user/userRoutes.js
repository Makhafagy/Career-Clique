// routes/user/userRoutes.js

const express = require('express')
const router = express.Router()

// Import user controller
const userController = require('../../controllers/userController')

// Define user routes
router.post('/register', userController.registerUser)
router.post('/login', userController.loginUser)

// POST /api/user/signup - Sign up a new user
router.post('/signup', async (req, res, next) => {
  try {
    const { email, password } = req.body

    // Check if the user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' })
    }

    // Create a new user document
    const newUser = new User({ email, password })
    await newUser.save()

    res.status(201).json({ message: 'User created successfully' })
  } catch (error) {
    next(error)
  }
})

module.exports = router
