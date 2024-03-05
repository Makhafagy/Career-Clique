// AuthService.js
import axios from 'axios'

const AuthService = {
  login: async credentials => {
    try {
      const response = await axios.post('/api/user/login', credentials)
      const { token, username } = response.data
      localStorage.setItem('token', token)
      localStorage.setItem('username', username) // Store the username in localStorage
      return { token, username }
    } catch (error) {
      throw new Error('Login failed')
    }
  },

  logout: () => {
    // Clear the token from local storage
    localStorage.removeItem('token')
    localStorage.removeItem('username')
  },

  getToken: () => {
    return localStorage.getItem('token')
  },

  getUsername: () => {
    // Add a method to retrieve the username
    return localStorage.getItem('username')
  },

  getEmail: () => {
    // Add a method to retrieve the username
    return localStorage.getItem('email')
  },

  // Other authentication-related methods
}

export default AuthService
