const axios = require('axios');

const refreshAccessToken = async (token) => {
  try {
    const response = await axios.post('http://localhost:3000/api/refresh-token', {
      token: token,
    });

    // Extract and return the new access token from the response
    return response.data.accessToken;
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw new Error('Token refresh failed');
  }
};

module.exports = { refreshAccessToken };
