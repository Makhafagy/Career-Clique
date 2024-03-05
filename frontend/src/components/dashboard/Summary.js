import React, { useState, useEffect, forwardRef } from 'react'
import axios from 'axios'
import pencilIcon from '../assets/pencil-icon.png'
import './Summary.css'

const Summary = forwardRef((props, ref) => {
  const [summaryDescription, setSummaryDescription] = useState('Please add your summary here.')
  const [initialSummaryDescription, setInitialSummaryDescription] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          throw new Error('Token not found in local storage')
        }

        const response = await axios.get('/api/dashboard?dataType=summary', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        setSummaryDescription(response.data.summary)
        setInitialSummaryDescription(response.data.summary)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching summary:', error)
        setIsLoading(false)
      }
    }

    fetchSummary()
  }, [])

  const handleSummaryChange = event => {
    setSummaryDescription(event.target.value)
  }

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        console.error('Token not found in local storage')
        return
      }

      const formData = new FormData()
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
    setSummaryDescription(initialSummaryDescription)
    setIsEditing(false)
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  return (
    <div ref={ref} className='summary-section'>
      <div className='dashboard-title'>Summary</div>
      {!isLoading && (
        <>
          {!isEditing && (
            <button className='edit-summary-button' onClick={handleEdit}>
              <img src={pencilIcon} alt='Edit' />
            </button>
          )}
          <div className={`summary-content ${isEditing ? 'editing' : ''}`}>
            {isEditing ? (
              <textarea className='summary-textarea' value={summaryDescription} onChange={handleSummaryChange} rows={8} />
            ) : (
              <p>{summaryDescription}</p>
            )}
            {isEditing && (
              <div className='summary-buttons'>
                <button onClick={handleSubmit}>Submit</button>
                <button onClick={handleCancel}>Cancel</button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
})

export default Summary
