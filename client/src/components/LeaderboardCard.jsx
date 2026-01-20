import React from 'react'
import './LeaderboardCard.css'

function LeaderboardCard({ leaderboard }) {
  return (
    <div className="leaderboard-card">
      <div className="LeaderB-header">
        <h3 className="card-title">
          <img src="./src/assets/images/Icons/swords.png" alt="Swords" style={{ width: '20px', height: '20px', marginRight: '8px', verticalAlign: 'middle' }} /> 
          Leaderboards
        </h3>
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
  )
}

export default LeaderboardCard
