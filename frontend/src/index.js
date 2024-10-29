// index.js
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import reportWebVitals from './reportWebVitals'
import UserSignUp from './views/user/UserSignUp'
import UserLogin from './views/user/UserLogin'
import HomePage from './views/home/HomePage'
import Dashboard from './views/dashboard/Dashboard'
import Service from './views/service/Service'
import User from './views/user/User'
import { AuthProvider } from './auth/AuthContext'
import ProfileEdit from './views/profile/ProfileEdit'
import { ProtectedRoute } from './ProtectedRoute'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/user/login' element={<UserLogin />} />
          <Route path='/user/signup' element={<UserSignUp />} />
          <Route path='/user/profile' element={<User />} />
          {/* Protected routes */}
          <Route
            path='/dashboard'
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path='/service'
            element={
              <ProtectedRoute>
                <Service />
              </ProtectedRoute>
            }
          />
          {/* 404 page */}
          <Route path='*' element={<Navigate to='/home' replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)

reportWebVitals()
