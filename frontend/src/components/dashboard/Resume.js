import React, { useState, useEffect, forwardRef } from 'react'
import './Resume.css'

const Resume = forwardRef((props, ref) => {
  const [selectedFile, setSelectedFile] = useState(null)

  // Function to handle file selection
  const handleFileChange = event => {
    setSelectedFile(event.target.files[0])
  }

  return (
    <div ref={ref} div className='resume-section'>
      <div className='dashboard-title'>Resume</div>
      <h2>Upload PDF</h2>
      <input type='file' onChange={handleFileChange} accept='.pdf' />

      {selectedFile && (
        <div className='resume-content'>
          <h3>PDF Preview:</h3>
          <iframe src={URL.createObjectURL(selectedFile)} style={{ width: '100%', height: '800px' }} title='resume-title'></iframe>
        </div>
      )}
    </div>
  )
})

export default Resume
