import React from 'react'
import './HistoryTable.css'

function HistoryTable({ data }) {
  return (
    <div className="history-table-container">
      <div className="history-table-header">
        <div className="history-header-column">Categories</div>
        <div className="history-header-column">Score</div>
        <div className="history-header-column">Quiz Duration</div>
        <div className="history-header-column">Score Ranking</div>
        <div className="history-header-column">Date Recorded</div>
      </div>
      <div className="history-table-body">
        {data.map((entry, index) => (
          <div key={index} className="history-table-row">
            <div className="history-table-cell category-cell">{entry.category}</div>
            <div className="history-table-cell score-cell">{entry.score.toLocaleString()}</div>
            <div className="history-table-cell duration-cell">{entry.duration}</div>
            <div className="history-table-cell ranking-cell">{entry.ranking}</div>
            <div className="history-table-cell date-cell">{entry.date}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HistoryTable
