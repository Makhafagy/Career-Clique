// index.js
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import UserSignUp from './views/user/UserSignUp'
import UserLogin from './views/user/UserLogin'
import HomePage from './views/home/HomePage'
import Dashboard from './views/dashboard/Dashboard'
import User from './views/user/User'
import { AuthProvider } from './auth/AuthContext'
import ProfileEdit from './views/profile/ProfileEdit'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/user/login' element={<UserLogin />} />
          <Route path='/user/signup' element={<UserSignUp />} />
          <Route path='/user/profile' element={<User />} />
          <Route path='/user/profile/edit' element={<ProfileEdit />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)

reportWebVitals()
