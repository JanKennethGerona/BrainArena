import React from 'react'
import './PlayerCard.css'

function PlayerCard({ playerData }) {
  return (
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
  )
}

export default PlayerCard
