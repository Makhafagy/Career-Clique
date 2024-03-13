import React, { useState, forwardRef } from 'react'
import './Resume.css'

const Resume = forwardRef((props, ref) => {
  const [selectedFile, setSelectedFile] = useState(null)

  // Function to handle file selection
  const handleFileChange = event => {
    setSelectedFile(event.target.files[0])
  }

  return (
    <div ref={ref} className='resume-section'>
      <div className='dashboard-title'>Resume</div>
      <div className='upload-container'>
        <h2>
          Upload PDF:
          <input type='file' onChange={handleFileChange} accept='.pdf' />
        </h2>
      </div>

      {selectedFile && (
        <div className='resume-content'>
          <h3>PDF Preview:</h3>
          <iframe src={URL.createObjectURL(selectedFile)} title='resume-title'></iframe>
        </div>
      )}
    </div>
  )
})

export default Resume
