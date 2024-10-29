// controllers/userController.js

const User = require('../models/tables/User')

// User registration controller
exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body
  try {
    // Check if user already exists
    let user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({ msg: 'User already exists' })
    }

    // Create new user
    user = new User({ username, email, password })

    // Save user to database
    await user.save()

    res.status(201).json({ msg: 'User registered successfully' })
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
}

// User login controller
exports.loginUser = async (req, res) => {
  const { email, password } = req.body
  try {
    // Check if user exists
    let user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' })
    }

    // Validate password
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' })
    }

    // If credentials are valid, create JWT token or session
    // You can implement JWT token creation or session handling here

    res.status(200).json({ msg: 'Login successful' })
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
  
  exports.signUp = async (req, res, next) => {
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
  }
}
