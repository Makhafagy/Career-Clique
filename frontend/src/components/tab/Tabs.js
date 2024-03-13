// components/Tabs.js
import React from 'react'
import './Tabs.css'

const Tabs = ({ activeTab, onTabChange, tabLabels, isLoggedIn }) => {
  const handleTabChange = tab => {
    onTabChange(tab)
  }

  return (
    <div className='tabs'>
      {tabLabels.map(
        (label, index) =>
          ((label !== 'Dashboard' && label !== 'Services') || isLoggedIn) && (
            <button key={label} onClick={() => handleTabChange(label)} className={activeTab === label ? 'tab active' : 'tab'}>
              {label}
            </button>
          )
      )}
    </div>
  )
}

export default Tabs
