import React from 'react'
import { useNavigate } from 'react-router-dom'
import './LeaderboardCard.css'
import historyIcon from '../assets/images/Icons/swords.svg'

function LeaderboardCard({ leaderboard }) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/leaderboard')
  }

  return (
    <div className="leaderboard-card" onClick={handleClick}>
      <div className="LeaderB-header">
        <div className="card-title" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '12px' }}>
          <img src={historyIcon} alt="Swords" style={{ width: '20px', height: '20px' }} /> 
          <h3 className="LeaderB-tittle">Leaderboards</h3>
        </div>
      </div>
      <div className="leaderboard-list">
        {leaderboard.map((player) => (
          <div key={player.rank} className={`leaderboard-item rank-${player.rank}`}>
            <span className="rank-number">#{player.rank}</span>
            <div className="leaderboard-avatar">
              <span className="leaderboard-avatar-initial">
                {player.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <span className="leaderboard-name">{player.name}</span>
            <span className="leaderboard-score">{player.score.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LeaderboardCard
