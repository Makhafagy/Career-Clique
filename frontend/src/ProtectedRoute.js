import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from './auth/AuthContext'

export const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth() // Get authentication status

  if (!isLoggedIn) {
    return <Navigate to='/user/profile' />
  }

  return children
}
