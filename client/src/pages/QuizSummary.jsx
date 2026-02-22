import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import GridScan from '../components/GridScan'
import './QuizSummary.css'
import Button from '../components/Button'
import fireIcon from '../assets/images/Icons/fire.svg'
import fireLitIcon from '../assets/images/Icons/fire-lit.svg'

function QuizSummary() {
  const location = useLocation()
  const navigate = useNavigate()
  const { subject, totalTime, timeSpent, correctAnswers, totalQuestions, hintsUsed } = location.state || {}
  const [leveledUp, setLeveledUp] = useState(false)
  const [newLevel, setNewLevel] = useState(0)

  // Calculate score: (total time - used time) * correct answers - (5 * hints used)
  const score = (totalTime - timeSpent) * correctAnswers - (5 * (hintsUsed || 0))
  
  // Calculate score percentage based on max possible score
  const maxScore = totalTime * totalQuestions
  const scorePercentage = (score / maxScore) * 100

  // Determine number of fires to light
  let litFires = 0
  if (scorePercentage === 100) {
    litFires = 3
  } else if (scorePercentage >= 66) {
    litFires = 2
  } else if (scorePercentage >= 33) {
    litFires = 1
  }

  // Calculate required exp for a given level
  const getRequiredExp = (level) => {
    let required = 500
    for (let i = 1; i < level; i++) {
      required = Math.floor(required * 2.7)
    }
    return required
  }

  // Handle exp and level logic
  useEffect(() => {
    if (!location.state || !subject) return

    // Get subject scores from localStorage
    const subjectScoresStr = localStorage.getItem('subjectScores')
    const subjectScores = subjectScoresStr ? JSON.parse(subjectScoresStr) : {}

    // Check if this is a new high score for this subject
    const previousScore = subjectScores[subject] || 0
    const isNewHighScore = score > previousScore

    // Only update if it's a new high score
    if (isNewHighScore) {
      subjectScores[subject] = score
      localStorage.setItem('subjectScores', JSON.stringify(subjectScores))
    }

    // Calculate total exp from all subjects (sum of all high scores)
    const totalExp = Object.values(subjectScores).reduce((sum, s) => sum + s, 0)

    // Get player data from localStorage
    const playerDataStr = localStorage.getItem('playerData')
    const playerData = playerDataStr ? JSON.parse(playerDataStr) : { level: 1, exp: 0 }

    // Calculate level based on total exp
    let currentLevel = 1
    let expForNextLevel = getRequiredExp(currentLevel)
    let remainingExp = totalExp

    while (remainingExp >= expForNextLevel) {
      remainingExp -= expForNextLevel
      currentLevel++
      expForNextLevel = getRequiredExp(currentLevel)
    }

    // Check if player leveled up
    const leveledUpFlag = currentLevel > playerData.level

    // Calculate progress percentage
    const progress = Math.floor((remainingExp / expForNextLevel) * 100)

    // Save updated data to localStorage
    const updatedPlayerData = {
      ...playerData,
      level: currentLevel,
      exp: remainingExp,
      progress: progress,
      totalExp: totalExp
    }
    localStorage.setItem('playerData', JSON.stringify(updatedPlayerData))

    // Store level up info for dashboard to show alert
    if (leveledUpFlag) {
      localStorage.setItem('levelUpInfo', JSON.stringify({ leveledUp: true, newLevel: currentLevel }))
    }
  }, [location.state, score, subject])

  if (!location.state) {
    navigate('/dashboard')
    return null
  }

  return (
    <div className="quiz-summary-container">
      
      {/* 1. Add the GridScan Background Layer */}
      <div className="quiz-summary-bg">
        <GridScan
          sensitivity={0.55}
          lineThickness={1}
          linesColor="#ffffff" 
          gridScale={0.1}
          scanColor="#ffffff"  
          scanOpacity={0.2}    
          enablePost
          bloomIntensity={0.6}
          chromaticAberration={0.002}
          noiseIntensity={0.01}
        />
      </div>

      {/* 2. Your existing card is now automatically styled with glassmorphism */}
      <div className="quiz-summary-card">
        <div className="quiz-summary-header">
          <h1 className="quiz-summary-title">CONGRATULATIONS!!</h1>
          <div className="quiz-summary-fires">
            {[0, 1, 2].map((index) => (
              <img 
                key={index} 
                src={index < litFires ? fireLitIcon : fireIcon} 
                alt="Fire" 
                className="fire-icon"
              />
            ))}
          </div>
        </div>

        <div className="quiz-summary-content">
          <div className="quiz-summary-score">
            <h2 className="score-value">{score.toLocaleString()}</h2>
            <p className="score-label">you have scored</p>
          </div>

          <div className="quiz-summary-stats">
            <div className="stat-row">
              <span className="stat-label">Correct Answers</span>
              <span className="stat-value correct">{correctAnswers}/{totalQuestions}</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Time Spent</span>
              <span className="stat-value">{timeSpent}</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Hints Used</span>
              <span className="stat-value">{hintsUsed || 0}</span>
            </div>
          </div>
        </div>

        <div className="quiz-summary-footer">
          <Button onClick={() => navigate('/dashboard')} className="dashboard-btn">
            Dashboard
          </Button>
        </div>
      </div>
    </div>
  )
}

export default QuizSummary
