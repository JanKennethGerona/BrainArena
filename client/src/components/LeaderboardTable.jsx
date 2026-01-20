import React from 'react'
import './LeaderboardTable.css'

function LeaderboardTable({ data }) {
  return (
    <div className="leaderboard-table-container">
      <div className="table-header">
        <div className="header-column">Rank</div>
        <div className="header-column">Score</div>
        <div className="header-column">Date Recorded</div>
      </div>
      <div className="table-body">
        {data.map((entry, index) => (
          <div key={index} className="table-row">
            <div className="table-cell rank-cell">
              <span className="rank-number">#{entry.rank}</span>
              <span className="player-name">{entry.name}</span>
            </div>
            <div className="table-cell score-cell">{entry.score.toLocaleString()}</div>
            <div className="table-cell date-cell">{entry.date}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LeaderboardTable
