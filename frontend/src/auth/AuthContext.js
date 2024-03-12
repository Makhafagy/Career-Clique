import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const navigate = useNavigate()

  const logout = useCallback(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    localStorage.removeItem('tokenExpiration')
    console.log('we force logout?')
    setIsLoggedIn(false)
    setUsername('')
    navigate('/user/login')
  }, [navigate])

  useEffect(() => {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('username')
    if (token && user) {
      setIsLoggedIn(true)
      setUsername(user)

      // Check token expiration
      const tokenExpiration = localStorage.getItem('tokenExpiration')
      if (tokenExpiration && Date.now() > Number(tokenExpiration)) {
        console.log('session expired')
        logout() // Log out if token is expired
      }
    }
  }, [logout])

  const login = async credentials => {
    try {
      const response = await axios.post('/api/user/login', credentials)
      const { token, username } = response.data
      localStorage.setItem('token', token)
      localStorage.setItem('username', username)
      // Set token expiration time (for example, 1 hour from now)
      const expiration = Date.now() + 3600000 // 1 hour in milliseconds
      localStorage.setItem('tokenExpiration', expiration)
      setIsLoggedIn(true)
      console.log('we not logout?')
      setUsername(username)
      navigate('/dashboard')
    } catch (error) {
      console.error('Login failed:', error.response.data.msg)
    }
  }

  // Add axios request interceptor to handle token expiry
  axios.interceptors.response.use(
    response => response,
    error => {
      if (error.response && error.response.status === 401) {
        // Handle Unauthorized error (token expired or invalid)
        logout()
      }
      return Promise.reject(error)
    }
  )

  return <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, login, logout, username }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
