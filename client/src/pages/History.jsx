import React from 'react'
import { useNavigate } from 'react-router-dom'
import HistoryTable from '../components/HistoryTable'
import './History.css'

function History() {
  const navigate = useNavigate()

  // History data with placeholder values
  const historyData = [
    { category: 'Math', score: 10456, duration: '10 minutes', ranking: '#15', date: 'July 28, 2027' },
    { category: 'Science', score: 10456, duration: '10 minutes', ranking: '#15', date: 'July 28, 2027' },
    { category: 'Computer Programming', score: 10456, duration: '10 minutes', ranking: '#15', date: 'July 28, 2027' },
    { category: 'Intro to Computing', score: 10456, duration: '10 minutes', ranking: '#15', date: 'July 28, 2027' },
    { category: 'Theology', score: 10456, duration: '10 minutes', ranking: '#15', date: 'July 28, 2027' },
    { category: 'Physical Education', score: 10456, duration: '10 minutes', ranking: '#15', date: 'July 28, 2027' }
  ]

  const handleBackToDashboard = () => {
    navigate('/dashboard')
  }

  return (
    <div className="history-page">
      <div className="history-page-header">
        <button className="back-button" onClick={handleBackToDashboard}>
          <img src="./src/assets/images/Icons/back.png" alt="Back" width="40" height="40" />
          
        </button>

        <div className="history-title-container">
          <div className="history-title-wrapper">
            <img src="./src/assets/images/Icons/HistoryLogoGreen.png" alt="History" className="history-icon" />
            <h1 className="history-page-title">History</h1>
          </div>
        </div>
      </div>

      <HistoryTable data={historyData} />
    </div>
  )
}

export default History
