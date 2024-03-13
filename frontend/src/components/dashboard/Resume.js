import React, { useState, useEffect, forwardRef } from 'react'
import axios from 'axios'
import { Document, Page } from 'react-pdf';
import './Resume.css'

const Resume = forwardRef((props, ref) => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)

  // Function to handle file selection
  const handleFileChange = event => {
    setSelectedFile(event.target.files[0])
  }

  // Function to handle file upload
  const handleUpload = () => {
    // Logic to upload the selected file
    if (selectedFile) {
      console.log('Uploading file:', selectedFile)
      // You can implement file upload logic using an API or a cloud storage service
    } else {
      console.log('No file selected')
    }
  }

  // Function to handle document load
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages)
  }

  return (
    <div className='resume-container'>
      <h2>Upload Resume</h2>
      <input type='file' onChange={handleFileChange} accept='.pdf' />
      <button onClick={handleUpload}>Upload</button>

      {selectedFile && (
        <div className='pdf-container'>
          <Document file={selectedFile} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} />
          </Document>
          <p>
            Page {pageNumber} of {numPages}
          </p>
        </div>
      )}
    </div>
  )
})

export default Resume
