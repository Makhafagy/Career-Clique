import React, { useState } from 'react'
import Homepage from './views/home/Homepage'

const App = () => {
  const [activeTab, setActiveTab] = useState('home')

  const handleTabChange = tab => {
    setActiveTab(tab)
  }

  return (
    <div className='main-container'>
      <h1 className='title'>Career Clique</h1>
      <Homepage activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  )
}

export default App
