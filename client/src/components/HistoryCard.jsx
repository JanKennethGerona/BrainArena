import React from 'react'
import './HistoryCard.css'

function HistoryCard({ history }) {
  return (
    <div className="history-card">
      <div className="History-header">
        <h3 className="card-title">History</h3>
      </div>
      <div className="history-list">
        {history.map((item, index) => (
          <div key={index} className="history-item">
            <div className="history-left">
              <span className="history-subject">{item.subject}</span>
            </div>
            <span className="history-score">{item.score.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HistoryCard
