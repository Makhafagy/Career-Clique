// views/home/HomePage.js
import React from 'react'
import '../../components/Index.css'
import AppHeader from '../header/AppHeader'

const HomePage = ({ activeTab }) => {
  return (
    <div className='outer-container'>
      <div className='main-container'>
        <AppHeader />
        {activeTab === 'home' && <h2>Home Page</h2>}
        <h1 className='tab-title'>Career Clique</h1>
      </div>
    </div>
  )
}

export default HomePage
