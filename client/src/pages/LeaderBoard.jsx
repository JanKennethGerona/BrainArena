import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LeaderboardTable from '../components/LeaderboardTable'
import GridScan from '../components/GridScan'
import './LeaderBoard.css'
import backIcon from '../assets/images/Icons/back.svg'
import swordIcon from '../assets/images/Icons/swords.svg'

function LeaderBoard() {
  const navigate = useNavigate()
  const [selectedCourse, setSelectedCourse] = useState('All Courses')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  // Course data matching Dashboard
  const dashboardCourses = [
    { id: 1, title: 'Mathematics' },
    { id: 2, title: 'Science' },
    { id: 3, title: 'Comprog' },
    { id: 4, title: 'ITC' },
    { id: 5, title: 'Theo' },
    { id: 6, title: 'PE' },
    { id: 7, title: 'PE' },
    { id: 8, title: 'PE' },
    { id: 9, title: 'PE' }
  ]

  // Get unique course titles
  const uniqueCourseTitles = [...new Set(dashboardCourses.map(course => course.title))]
  const courses = ['All Courses', ...uniqueCourseTitles]

  // Leaderboard data for different courses
  const leaderboardData = {
    'All Courses': [
      { rank: 1, name: 'Alex Johnson', score: 15420, date: 'Jan 15, 2026' },
      { rank: 2, name: 'Sarah Chen', score: 14890, date: 'Jan 14, 2026' },
      { rank: 3, name: 'Mike Williams', score: 14200, date: 'Jan 13, 2026' },
      { rank: 4, name: 'Emma Davis', score: 13850, date: 'Jan 12, 2026' },
      { rank: 5, name: 'James Brown', score: 13500, date: 'Jan 11, 2026' },
      { rank: 6, name: 'Lisa Garcia', score: 13200, date: 'Jan 10, 2026' }
    ],
    'Mathematics': [
      { rank: 1, name: 'Emily Zhang', score: 9850, date: 'Jan 18, 2026' },
      { rank: 2, name: 'David Lee', score: 9640, date: 'Jan 17, 2026' },
      { rank: 3, name: 'Sophie Taylor', score: 9420, date: 'Jan 16, 2026' },
      { rank: 4, name: 'Ryan Martinez', score: 9200, date: 'Jan 15, 2026' },
      { rank: 5, name: 'Olivia Anderson', score: 8950, date: 'Jan 14, 2026' },
      { rank: 6, name: 'Nathan Wilson', score: 8700, date: 'Jan 13, 2026' }
    ],
    'Science': [
      { rank: 1, name: 'Grace Kim', score: 8920, date: 'Jan 19, 2026' },
      { rank: 2, name: 'Lucas Thompson', score: 8750, date: 'Jan 18, 2026' },
      { rank: 3, name: 'Ava Rodriguez', score: 8580, date: 'Jan 17, 2026' },
      { rank: 4, name: 'Ethan White', score: 8320, date: 'Jan 16, 2026' },
      { rank: 5, name: 'Mia Harris', score: 8100, date: 'Jan 15, 2026' },
      { rank: 6, name: 'Noah Clark', score: 7850, date: 'Jan 14, 2026' }
    ],
    'Comprog': [
      { rank: 1, name: 'Isabella Lewis', score: 12300, date: 'Jan 20, 2026' },
      { rank: 2, name: 'Mason Walker', score: 12050, date: 'Jan 19, 2026' },
      { rank: 3, name: 'Charlotte Hall', score: 11800, date: 'Jan 18, 2026' },
      { rank: 4, name: 'Logan Allen', score: 11550, date: 'Jan 17, 2026' },
      { rank: 5, name: 'Amelia Young', score: 11300, date: 'Jan 16, 2026' },
      { rank: 6, name: 'Elijah King', score: 11000, date: 'Jan 15, 2026' }
    ],
    'ITC': [
      { rank: 1, name: 'Harper Scott', score: 10450, date: 'Jan 19, 2026' },
      { rank: 2, name: 'Benjamin Green', score: 10200, date: 'Jan 18, 2026' },
      { rank: 3, name: 'Evelyn Adams', score: 9950, date: 'Jan 17, 2026' },
      { rank: 4, name: 'Jackson Baker', score: 9700, date: 'Jan 16, 2026' },
      { rank: 5, name: 'Abigail Nelson', score: 9450, date: 'Jan 15, 2026' },
      { rank: 6, name: 'Henry Carter', score: 9200, date: 'Jan 14, 2026' }
    ],
    'Theo': [
      { rank: 1, name: 'Ella Mitchell', score: 7680, date: 'Jan 18, 2026' },
      { rank: 2, name: 'Alexander Perez', score: 7520, date: 'Jan 17, 2026' },
      { rank: 3, name: 'Scarlett Roberts', score: 7350, date: 'Jan 16, 2026' },
      { rank: 4, name: 'Sebastian Turner', score: 7180, date: 'Jan 15, 2026' },
      { rank: 5, name: 'Victoria Phillips', score: 7020, date: 'Jan 14, 2026' },
      { rank: 6, name: 'Daniel Campbell', score: 6850, date: 'Jan 13, 2026' }
    ],
    'PE': [
      { rank: 1, name: 'Madison Parker', score: 6420, date: 'Jan 20, 2026' },
      { rank: 2, name: 'Matthew Evans', score: 6280, date: 'Jan 19, 2026' },
      { rank: 3, name: 'Aria Edwards', score: 6150, date: 'Jan 18, 2026' },
      { rank: 4, name: 'Jack Collins', score: 6020, date: 'Jan 17, 2026' },
      { rank: 5, name: 'Chloe Stewart', score: 5890, date: 'Jan 16, 2026' },
      { rank: 6, name: 'Owen Morris', score: 5750, date: 'Jan 15, 2026' }
    ]
  }

  const handleCourseSelect = (course) => {
    setSelectedCourse(course)
    setIsDropdownOpen(false)
  }

  const handleBackToDashboard = () => {
    navigate('/dashboard')
  }

  return (
    <div className="leaderboard-page">
      
      {/* 1. Add the GridScan Background Layer */}
      <div className="leaderboard-bg">
        <GridScan
          sensitivity={0.55}
          lineThickness={1}
          linesColor="#ffffff" 
          gridScale={0.1}
          scanColor="#ffffff"  
          scanOpacity={0.2}    
          enablePost
          bloomIntensity={0.6}
          chromaticAberration={0.002}
          noiseIntensity={0.01}
        />
      </div>

      {/* 2. Wrap existing content in the foreground container */}
      <div className="leaderboard-container">
        <div className="leaderboard-header">
          <button className="back-button" onClick={handleBackToDashboard}>
            <img src={backIcon} alt="Back" width="40" height="40" />
          </button>

          <div className="title-dropdown-container">
            <button 
              className="title-dropdown" 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <img src={swordIcon} alt="Swords" className="title-icon" />
              <h1 className="page-title">{selectedCourse}</h1>
              <svg 
                className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`}
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none"
              >
                <path d="M6 9L12 15L18 9" stroke="#00B2CA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {isDropdownOpen && (
              <div className="dropdown-menu">
                {courses.map((course, index) => (
                  <button
                    key={index}
                    className={`dropdown-item ${selectedCourse === course ? 'active' : ''}`}
                    onClick={() => handleCourseSelect(course)}
                  >
                    {course}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <LeaderboardTable data={leaderboardData[selectedCourse]} />
      </div>

    </div>
  )
}

export default LeaderBoard
