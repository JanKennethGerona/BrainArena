import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Dashboard.css'

function Dashboard() {
  const navigate = useNavigate()

  // Sample data - replace with real data from your backend
  const playerData = {
    name: 'Player',
    level: 9999,
    progress: 75,
    avatar: 'https://via.placeholder.com/60'
  }

  const history = [
    { subject: 'Math', score: 10456, icon: '🧮' },
    { subject: 'Science', score: 10456, icon: '🔬' }
  ]

  const leaderboard = [
    { rank: 1, name: 'Player', score: 10456, avatar: 'https://via.placeholder.com/40' },
    { rank: 2, name: 'Player', score: 10456, avatar: 'https://via.placeholder.com/40' },
    { rank: 3, name: 'Player', score: 10456, avatar: 'https://via.placeholder.com/40' },
    { rank: 4, name: 'Player', score: 10456, avatar: 'https://via.placeholder.com/40' },
    { rank: 5, name: 'Player', score: 10456, avatar: 'https://via.placeholder.com/40' }
  ]

  const courses = [
    {
      id: 1,
      title: 'Mathematics',
      items: 10,
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400',
      tags: ['40 Seconds per Question', 'Medium']
    },
    {
      id: 2,
      title: 'Science',
      items: 20,
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400',
      tags: ['40 Seconds per Question', 'Identification']
    },
    {
      id: 3,
      title: 'Comprog',
      items: 10,
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400',
      tags: ['Easy', '40 Seconds per Question', 'Multiple Choice Questions']
    },
    {
      id: 4,
      title: 'ITC',
      items: 10,
      image: 'https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=400',
      tags: ['40 Seconds per Question', 'Medium']
    },
    {
      id: 5,
      title: 'Theo',
      items: 40,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      tags: ['40 Seconds per Question', 'Multiple Choice Questions']
    },
    {
      id: 6,
      title: 'PE',
      items: 100,
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400',
      tags: ['Multiple Choice Questions', 'Identification']
    }
  ]

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        {/* Top Section */}
        <div className="dashboard-top">
          {/* Player Profile */}
          <div className="player-card">
            <img src={playerData.avatar} alt="Player Avatar" className="player-avatar" />
            <div className="player-info">
              <h3 className="player-name">{playerData.name}</h3>
              <p className="player-level">Level: {playerData.level}</p>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${playerData.progress}%` }}></div>
              </div>
            </div>
          </div>

          {/* History */}
          <div className="history-card">
            <div className="card-header">
              <h3 className="card-title">✕ History</h3>
            </div>
            <div className="history-list">
              {history.map((item, index) => (
                <div key={index} className="history-item">
                  <div className="history-left">
                    <span className="history-icon">{item.icon}</span>
                    <span className="history-subject">{item.subject}</span>
                  </div>
                  <span className="history-score">{item.score.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
        
        {/* Bottom Section */}
        <div className="dashboard-bottom">
        {/* Course Cards */}
        <div className="courses-grid">
          {courses.map((course) => (
            <div key={course.id} className="course-card">
              <div className="course-image" style={{ backgroundImage: `url(${course.image})` }}></div>
              <div className="course-content">
                <h4 className="course-title">{course.title}</h4>
                <p className="course-items">{course.items} items</p>
                <div className="course-tags">
                  {course.tags.map((tag, index) => (
                    <span key={index} className="course-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Leaderboards */}
          <div className="leaderboard-card">
            <div className="card-header">
              <h3 className="card-title">✕ Leaderboards</h3>
            </div>
            <div className="leaderboard-list">
              {leaderboard.map((player) => (
                <div key={player.rank} className={`leaderboard-item rank-${player.rank}`}>
                  <span className="rank-number">#{player.rank}</span>
                  <img src={player.avatar} alt={player.name} className="leaderboard-avatar" />
                  <span className="leaderboard-name">{player.name}</span>
                  <span className="leaderboard-score">{player.score.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
