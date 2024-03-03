import React, { useState, useEffect } from 'react'
import axios from 'axios'
import pencilIcon from '../assets/pencil-icon.png'
import './Summary.css'

const Summary = () => {
  const [summaryDescription, setSummaryDescription] = useState('Please add your summary here.')
  const [initialSummaryDescription, setInitialSummaryDescription] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Fetch summary from backend
    const fetchSummary = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          throw new Error('Token not found in local storage')
        }

        const response = await axios.get('/api/dashboard', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        // Update state with fetched summary
        setSummaryDescription(response.data.summary)
        setInitialSummaryDescription(summaryDescription)
        setIsLoading(false) // Set loading state to false after fetching
      } catch (error) {
        console.error('Error fetching summary:', error)
        setIsLoading(false) // Set loading state to false on error
      }
    }

    fetchSummary() // Call the fetchSummary function when the component mounts
  }, []) // Empty dependency array to ensure it only runs once

  const handleSummaryChange = event => {
    setSummaryDescription(event.target.value)
  }

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token')
      const userEmail = localStorage.getItem('email')
      const username = localStorage.getItem('username')
      if (!token || !userEmail || !username) {
        console.error('Token, userEmail, or username not found in local storage')
        return
      }

      const formData = new FormData()
      // formData.append('profilePicture', profilePicture)
      formData.append('summary', summaryDescription)

      await axios.post('/api/dashboard', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      })
      setIsEditing(false)
    } catch (error) {
      console.error('Error updating summary description:', error)
    }
  }

  const handleCancel = () => {
    // Reset summaryDescription state to initial value fetched from the database
    setSummaryDescription(initialSummaryDescription)
    // Exit edit mode
    setIsEditing(false)
  }

  const handleEdit = () => {
    // Enter edit mode
    setIsEditing(true)
  }

  return (
    <>
      <h2>Summary</h2>
      {!isLoading && (
        <div className='summary-section'>
          {isEditing ? (
            <div>
              <textarea className='summary-textarea' value={summaryDescription} onChange={handleSummaryChange} rows={8} />
              <div className='summary-buttons'>
                <button onClick={handleSubmit}>Submit</button>
                <button onClick={handleCancel}>Cancel</button>
              </div>
            </div>
          ) : (
            <div>
              <p>{summaryDescription}</p>
              <button className='edit-summary-button' onClick={handleEdit}>
                <img src={pencilIcon} alt='Edit' />
              </button>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default Summary
