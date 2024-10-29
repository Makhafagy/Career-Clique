// components/Tabs.js
import React from 'react'

const Tabs = ({ activeTab, onTabChange, tabLabels }) => {
  const handleTabChange = tab => {
    onTabChange(tab)
  }

  return (
    <div className='tabs'>
      {tabLabels.map((label, index) => (
        <button key={label} onClick={() => handleTabChange(label)} className={activeTab === label ? 'tab active' : 'tab'}>
          {label}
        </button>
      ))}
    </div>
  )
}

export default Tabs
