import React from 'react'
import { useNavigate } from 'react-router-dom'
import './HistoryCard.css'
import historyIcon from '../assets/images/Icons/history.svg'

function HistoryCard({ history }) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/history')
  }

  return (
    <div className="history-card" onClick={handleClick}>
      <div className="History-header">
        <div className="card-title" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '12px' }}>
          <img src={historyIcon} alt="History" style={{ width: '20px', height: '20px' }} /> 
          <h3 className="history-tittle">History</h3>
        </div>
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
