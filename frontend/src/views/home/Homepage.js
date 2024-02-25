// views/home/HomePage.js
import React from 'react'
import '../../components/Index.css'
import AppHeader from '../header/AppHeader'

const HomePage = ({ activeTab }) => {
  return (
    <div className='main-container'>
      <h1 className='title'>Career Clique</h1>
      <AppHeader />
      {activeTab === 'home' && <h2>Home Page</h2>}
    </div>
  )
}

export default HomePage
