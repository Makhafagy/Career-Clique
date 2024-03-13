import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from './auth/AuthContext'

export const ProtectedRoute = ({ children }) => {
  const { tokenExpiration } = useAuth() // Get token expiration timestamp

  // Check if the token is expired
  const isTokenExpired = tokenExpiration && Date.now() > tokenExpiration

  if (isTokenExpired) {
    return <Navigate to='/user/profile' />
  }

  return children
}
