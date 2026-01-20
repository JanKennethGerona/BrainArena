import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PlayerCard from '../components/PlayerCard'
import HistoryCard from '../components/HistoryCard'
import LeaderboardCard from '../components/LeaderboardCard'
import FilterContainer from '../components/FilterContainer'
import CoursesGrid from '../components/CoursesGrid'
import './Dashboard.css'

function Dashboard() {
  const navigate = useNavigate()
  const [activeFilters, setActiveFilters] = useState([])

  // Sample data - replace with real data from your backend
  const playerData = {
    name: 'Player',
    level: 9999,
    progress: 75,
    avatar: './src/assets/images/placeholders/ChatGPT Image Jan 13, 2026, 12_32_47 PM.png'
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
      tags: ['40s', 'Medium']
    },
    {
      id: 2,
      title: 'Science',
      items: 20,
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400',
      tags: ['40s', 'Identification']
    },
    {
      id: 3,
      title: 'Comprog',
      items: 10,
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400',
      tags: ['Easy', '40s', 'MCQ']
    },
    {
      id: 4,
      title: 'ITC',
      items: 10,
      image: 'https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=400',
      tags: ['40s', 'Medium']
    },
    {
      id: 5,
      title: 'Theo',
      items: 40,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      tags: ['40s', 'MCQ']
    },
    {
      id: 6,
      title: 'PE',
      items: 100,
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400',
      tags: ['MCQ', 'Identification']
    },
    {
      id: 7,
      title: 'PE',
      items: 100,
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400',
      tags: ['MCQ', 'Identification']
    }, 
    {
      id: 8,
      title: 'PE',
      items: 100,
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400',
      tags: ['MCQ', 'Identification']
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

  return (
    <div className="dashboard">
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
