const jwt = require('jsonwebtoken')
const User = require('../models/tables/User')
const bcrypt = require('bcrypt')
const saltRounds = 10
const { JWT_SECRET } = require('../config')

const secretKey = JWT_SECRET

exports.logIn = async (req, res) => {
  const { emailOrUsername, password } = req.body
  try {
    // Fetch user from the database by email or username
    const user = await User.findOne({ $or: [{ email: emailOrUsername }, { username: emailOrUsername }] })
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' })
    }

    // Compare the entered password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' })
    }

    // If credentials are valid, generate JWT token
    const payload = {
      userId: user._id,
      email: user.email,
      username: user.username,
    }
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' })

    // Return the JWT token along with the success message
    res.status(200).json({ msg: 'Login successful', token, email: user.email, username: user.username })
  } catch (error) {
    console.error('Error logging in:', error)
    res.status(500).send('Server Error')
  }
}

exports.signUp = async (req, res, next) => {
  try {
    const { email, password, username } = req.body

    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // Create a new user document
    const newUser = new User({ email, password: hashedPassword, username })
    await newUser.save()

    // Generate JWT token
    const token = jwt.sign({ userId: newUser._id }, secretKey, { expiresIn: '1h' })

    res.status(201).json({ message: 'User created successfully', token })
  } catch (error) {
    next(error)
  }
}
