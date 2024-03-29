// app.js

require('dotenv').config()
const express = require('express')
// const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const mongoose = require('mongoose')
const { NODE_ENV, MONGODB_URI } = require('./config')

const refreshTokenRoutes = require('./routes/refreshToken/refreshTokenRoutes');
const dashboardRoutes = require('./routes/dashboard/dashboardRoutes')
const profileRoutes = require('./routes/profile/profileRoutes')
const userRoutes = require('./routes/user/userRoutes')
const app = express()
const morganOption = process.env.NODE_ENV === 'production' ? 'tiny' : 'common'

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// Mount the token refreshing router
app.use('/api', refreshTokenRoutes);

// Mount user profile routes
app.use('/api', dashboardRoutes)

// Mount user profile routes
app.use('/api/user', profileRoutes)

// Mount user routes
app.use('/api/user', userRoutes)

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB:', mongoose.connection.name)
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error)
  })

app.use(function errorHandler(error, req, res, next) {
  let response
  if (NODE_ENV === 'production') response = { error: { message: 'server error' } }
  else response = { message: error.message, error }
  res.status(500).json(response)
})

module.exports = app
