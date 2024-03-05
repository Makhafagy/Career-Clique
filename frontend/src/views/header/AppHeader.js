import React, { useState, useEffect, useMemo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Tabs from '../../components/tab/Tabs'
import '../../components/Index.css'
import { useAuth } from '../../auth/AuthContext' // Import useAuth hook

const InitialPage = () => {
  const [activeTab, setActiveTab] = useState('')
  const { isLoggedIn } = useAuth() // Use useAuth hook to access authentication status
  const navigate = useNavigate()
  const location = useLocation()

  const tabLabels = useMemo(() => ['Home', 'Dashboard', 'Profile'], []) // Initialize tabLabels with useMemo
  const tabsPaths = ['/home', '/dashboard', '/user/profile']

  useEffect(() => {
    // Set the active tab based on the current location pathname
    const currentTab = tabLabels.find(tab => location.pathname.includes(tab.toLowerCase()))
    setActiveTab(currentTab || '')
  }, [location.pathname, tabLabels])

  const handleTabChange = tab => {
    setActiveTab(tab)
    const path = tabsPaths[tabLabels.indexOf(tab)]
    navigate(path)
  }

  return (
    <div>
      <Tabs activeTab={activeTab} onTabChange={handleTabChange} tabLabels={tabLabels} isLoggedIn={isLoggedIn} />
    </div>
  )
}

export default InitialPage
