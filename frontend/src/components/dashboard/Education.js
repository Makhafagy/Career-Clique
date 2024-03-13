import React, { useState, useEffect, forwardRef } from 'react'
import axios from 'axios'
import csuf from '../assets/titans_csuf.jpg'
import occ from '../assets/pirates_occ.jpg'
import './Education.css'

const Education = forwardRef((props, ref) => {
  const [educationData, setEducationData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [hoveredEntry, setHoveredEntry] = useState(null)

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          throw new Error('Token not found in local storage')
        }

        const response = await axios.get('/api/dashboard?dataType=education', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        setEducationData(response.data)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching education details:', error)
        setIsLoading(false)
      }
    }

    fetchEducation()
  }, [])

  return (
    <div ref={ref} className='education-section'>
      <div className='dashboard-title'>Education</div>
      {!isLoading && (
        <div className='education-grid'>
          {educationData.map((entry, index) => {
            const graduationDate = new Date(entry.graduationDate)
            const formattedGraduationDate = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(graduationDate)

            return (
              <div
                className='education-entry college-entry'
                key={index}
                onMouseEnter={() => setHoveredEntry(entry)}
                onMouseLeave={() => setHoveredEntry(null)}
              >
                <img
                  className={`college-logo ${hoveredEntry === entry ? 'blur' : ''}`}
                  src={
                    entry.collegeName === 'California State University Of Fullerton' ? csuf : entry.collegeName === 'Orange Coast College' ? occ : ''
                  }
                  alt={`${entry.collegeName} Logo`}
                />
                {hoveredEntry === entry && (
                  <div className='tooltip'>
                    <p>Graduation Date: {formattedGraduationDate}</p>
                    <p>Degree: {entry.degree}</p>
                    <p>GPA: {entry.gpa}</p>
                  </div>
                )}
                <div className='college-info'>
                  <p>{entry.collegeName}</p>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
})

export default Education
