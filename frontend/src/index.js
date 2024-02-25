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
import User from './views/user/User'
import { AuthProvider } from './auth/AuthContext'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/user/login' element={<UserLogin />} />
          <Route path='/user/signup' element={<UserSignUp />} />
          <Route path='/user/profile' element={<User />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)

reportWebVitals()
