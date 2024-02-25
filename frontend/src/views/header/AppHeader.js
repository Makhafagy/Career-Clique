// InitialPage.js
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Tabs from '../../components/tab/Tabs'
import '../../components/Index.css'

const AppHeader = () => {
  const [activeTab, setActiveTab] = useState('Home')
  const navigate = useNavigate()

  const handleTabChange = tab => {
    setActiveTab(tab)
    const path = tabsPaths[tabLabels.indexOf(tab)]
    navigate(path)
  }

  const tabLabels = ['Home', 'Profile']
  const tabsPaths = ['/home', '/user/profile']

  return (
    <div>
      <h1 className='title'>Career Clique</h1>
      <Tabs activeTab={activeTab} onTabChange={handleTabChange} tabLabels={tabLabels} />
    </div>
  )
}

export default AppHeader
