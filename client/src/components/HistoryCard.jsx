import React from 'react'
import { useNavigate } from 'react-router-dom'
import './HistoryCard.css'

function HistoryCard({ history }) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/history')
  }

  return (
    <div className="history-card" onClick={handleClick}>
      <div className="History-header">
        <h3 className="card-title">
            <img src="./src/assets/images/Icons/History.png" alt="History" style={{ width: '20px', height: '20px', marginRight: '8px', verticalAlign: 'middle' }} /> 
          History
          </h3>
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
