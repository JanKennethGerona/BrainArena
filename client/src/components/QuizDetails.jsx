import React from 'react'
import { createPortal } from 'react-dom' // 1. Import createPortal
import { useNavigate } from 'react-router-dom'
import './QuizDetails.css'
import Button from './Button'

function QuizDetails({ isOpen, onClose, course }) {
  const navigate = useNavigate()

  if (!isOpen || !course) return null

  const handleStartQuiz = () => {
    navigate('/quiz', { state: { course } })
    onClose()
  }

  const placeholderDescription = "Master the fundamentals with this comprehensive quiz designed to test your knowledge and enhance your understanding. Challenge yourself with carefully curated questions that cover essential topics and concepts."

  // 2. Wrap the entire modal in createPortal and target document.body
  return createPortal(
    <div className="quiz-details-overlay" onClick={onClose}>
      <div className="quiz-details-modal" onClick={(e) => e.stopPropagation()}>
        <button className="quiz-details-close" onClick={onClose}>✕</button>
        
        <div className="quiz-details-header">
          <div className="quiz-details-image" style={{ backgroundImage: `url(${course.image})` }}></div>
          <div className="quiz-details-info">
            <h2 className="quiz-details-title">{course.title}</h2>
            <p className="quiz-details-items">{course.items} items</p>
          </div>
        </div>

        <div className="quiz-details-content">
          <div className="quiz-details-section">
            <h3 className="quiz-details-section-title">Description</h3>
            <p className="quiz-details-description">{placeholderDescription}</p>
          </div>

          <div className="quiz-details-section">
            <h3 className="quiz-details-section-title">Tags</h3>
            <div className="quiz-details-tags">
              {course.tags.map((tag, index) => (
                <span key={index} className="quiz-details-tag">{tag}</span>
              ))}
            </div>
          </div>

          <div className="quiz-details-actions">
            <Button onClick={onClose} variant="secondary">Cancel</Button>
            <Button onClick={handleStartQuiz}>Start Quiz</Button>
          </div>
        </div>
      </div>
    </div>,
    document.body // 3. This tells React to render it outside the current DOM hierarchy
  )
}

export default QuizDetails