import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, getUser, logout } from '../utils/auth';
import PlayerCard from '../components/PlayerCard'
import HistoryCard from '../components/HistoryCard'
import LeaderboardCard from '../components/LeaderboardCard'
import FilterContainer from '../components/FilterContainer'
import CoursesGrid from '../components/CoursesGrid'
import './Dashboard.css'
import GridScan from '../components/GridScan';



function Dashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [activeFilters, setActiveFilters] = useState([])

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login')
      return
    }

    const userData = getUser()
    setUser(userData)
  }, [navigate])

  // Get player data from localStorage or use defaults
  const getPlayerData = () => {
    const playerDataStr = localStorage.getItem('playerData')
    if (playerDataStr) {
      return JSON.parse(playerDataStr)
    }
    // Default player data
    const defaultData = {
      name: 'Player',
      level: 1,
      exp: 0,
      progress: 0,
      avatar: './src/assets/images/placeholders/ChatGPT Image Jan 13, 2026, 12_32_47 PM.png'
    }
    localStorage.setItem('playerData', JSON.stringify(defaultData))
    return defaultData
  }

  const [playerData, setPlayerData] = useState(getPlayerData())

  // Reload player data when component mounts or when returning to dashboard
  useEffect(() => {
    const updatedPlayerData = getPlayerData()
    setPlayerData(updatedPlayerData)

    // Check if player leveled up
    const levelUpInfoStr = localStorage.getItem('levelUpInfo')
    if (levelUpInfoStr) {
      const levelUpInfo = JSON.parse(levelUpInfoStr)
      if (levelUpInfo.leveledUp) {
        alert(`Congratulations! You leveled up to Level ${levelUpInfo.newLevel}!`)
        // Clear the flag
        localStorage.removeItem('levelUpInfo')
      }
    }
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const history = [
    { subject: 'Math', score: 10456 },
    { subject: 'Science', score: 10456 }
  ]

  const leaderboard = [
    { rank: 1, name: 'Player', score: 10456, avatar: 'https://via.placeholder.com/40' },
    { rank: 2, name: 'Player', score: 10456, avatar: 'https://via.placeholder.com/40' },
    { rank: 3, name: 'Player', score: 10456, avatar: 'https://via.placeholder.com/40' },
    { rank: 4, name: 'Player', score: 10456, avatar: 'https://via.placeholder.com/40' },
    { rank: 5, name: 'Player', score: 10456, avatar: 'https://via.placeholder.com/40' },
    { rank: 6, name: 'Player', score: 10456, avatar: 'https://via.placeholder.com/40' },
    { rank: 7, name: 'Player', score: 10456, avatar: 'https://via.placeholder.com/40' },
    { rank: 8, name: 'Player', score: 10456, avatar: 'https://via.placeholder.com/40' },
    { rank: 9, name: 'Player', score: 10456, avatar: 'https://via.placeholder.com/40' },
    { rank: 10, name: 'Player', score: 10456, avatar: 'https://via.placeholder.com/40' },
    { rank: 11, name: 'Player', score: 10456, avatar: 'https://via.placeholder.com/40' },
  ]

  const courses = [
    {
      id: 1,
      title: 'Mathematics',
      items: 10,
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400',
      tags: ['30s', 'MCQ', 'hint']
    },
    {
      id: 2,
      title: 'Science',
      items: 20,
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400',
      tags: ['20s', 'Identification']
    },
    {
      id: 3,
      title: 'Comprog',
      items: 10,
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400',
      tags: ['10s', 'MCQ', 'hint']
    },
    {
      id: 4,
      title: 'ITC',
      items: 10,
      image: 'https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=400',
      tags: ['30s', 'MCQ', 'Identification']
    },
    {
      id: 5,
      title: 'Theo',
      items: 40,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      tags: ['20s', 'MCQ']
    },
    {
      id: 6,
      title: 'PE',
      items: 100,
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400',
      tags: ['30s', 'MCQ', 'Identification', 'hint']
    },
    {
      id: 7,
      title: 'PE',
      items: 100,
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400',
      tags: ['10s', 'Identification']
    },
    {
      id: 8,
      title: 'PE',
      items: 100,
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400',
      tags: ['20s', 'MCQ']
    },
    {
      id: 9,
      title: 'PE',
      items: 100,
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400',
      tags: ['MCQ', 'Identification']
    }
  ]

  // Get all unique tags from courses
  const allTags = [...new Set(courses.flatMap(course => course.tags))]

  // Filter courses based on active filters
  const filteredCourses = activeFilters.length === 0
    ? courses
    : courses.filter(course => activeFilters.every(filter => course.tags.includes(filter)))

  // Toggle filter
  const toggleFilter = (tag) => {
    setActiveFilters(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  // Clear all filters
  const clearFilters = () => {
    setActiveFilters([])
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="dashboard">
      <div className="dashboard-bg">
        <GridScan
          sensitivity={0.55}
          lineThickness={1}
          linesColor="#ffffff"
          gridScale={0.1}
          scanColor="#ffffff"
          scanOpacity={0.4}
          enablePost
          bloomIntensity={0.6}
          chromaticAberration={0.002}
          noiseIntensity={0.01}
        />
      </div>
      <div className="dashboard-container">
        {/* Top Section */}
        <div className="dashboard-top">
          <PlayerCard playerData={playerData} />
          <HistoryCard history={history} />
        </div>

        {/* Bottom Section */}
        <div className="dashboard-bottom">
          <div className="courses-section">
            <FilterContainer
              allTags={allTags}
              activeFilters={activeFilters}
              toggleFilter={toggleFilter}
              clearFilters={clearFilters}
            />
            <CoursesGrid courses={filteredCourses} />
          </div>

          <LeaderboardCard leaderboard={leaderboard} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
