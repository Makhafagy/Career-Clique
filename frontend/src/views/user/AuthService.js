import axios from 'axios'

const AuthService = {
  login: async credentials => {
    try {
      const response = await axios.post('/api/login', credentials)
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('username', response.data.username) // Store the username in localStorage
      return response.data.token
    } catch (error) {
      throw new Error('Login failed')
    }
  },

  logout: () => {
    // Clear the token from local storage
    localStorage.removeItem('token')
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
