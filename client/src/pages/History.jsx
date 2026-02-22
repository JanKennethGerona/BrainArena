import React from 'react'
import { useNavigate } from 'react-router-dom'
import HistoryTable from '../components/HistoryTable'
import GridScan from '../components/GridScan'
import './History.css'
import backIcon from '../assets/images/Icons/back.svg'
import historyIcon from '../assets/images/Icons/history.svg'

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
      
      {/* 1. Add the GridScan Background Layer */}
      <div className="history-bg">
        <GridScan
          sensitivity={0.55}
          lineThickness={1}
          linesColor="#ffffff" /* Changed to teal to be visible on white bg */
          gridScale={0.1}
          scanColor="#ffffff"  /* Changed to teal */
          scanOpacity={0.2}    /* Lowered opacity slightly so it doesn't distract from the table */
          enablePost
          bloomIntensity={0.6}
          chromaticAberration={0.002}
          noiseIntensity={0.01}
        />
      </div>

      {/* 2. Wrap existing content in the foreground container */}
      <div className="history-container">
        <div className="history-page-header">
          <button className="back-button" onClick={handleBackToDashboard}>
            <img src={backIcon} alt="Back" width="40" height="40" />
          </button>

          <div className="history-title-container">
            <div className="history-title-wrapper">
              <img src={historyIcon} alt="History" className="history-icon" />
              <h1 className="history-page-title">History</h1>
            </div>
          </div>
        </div>

        <HistoryTable data={historyData} />
      </div>

    </div>
  )
}

export default History
