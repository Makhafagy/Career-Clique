// app.js

require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const userRoutes = require('./routes/user/userRoutes'); // Import user routes
const app = express();
const morganOption = process.env.NODE_ENV === 'production' ? 'tiny' : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

// Mount user routes
app.use('/api/user', userRoutes);

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === 'production') response = { error: { message: 'server error' } };
  else response = { message: error.message, error };
  res.status(500).json(response);
});

module.exports = app;
