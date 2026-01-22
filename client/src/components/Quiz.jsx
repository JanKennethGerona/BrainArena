import React, { useState, useEffect } from 'react'
import './Quiz.css'
import Button from './Button'
import backIcon from '../assets/images/Icons/Back.png'
import lightbulbIcon from '../assets/images/Icons/lightbulb-fill.png'
import swordsIcon from '../assets/images/Icons/Swords.png'

function Quiz({ course, onExit }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(30)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [textAnswer, setTextAnswer] = useState('')
  const [answeredQuestions, setAnsweredQuestions] = useState([])

  // Placeholder quiz data
  const questions = [
    {
      id: 1,
      type: 'multiple-choice',
      question: 'What is the capital of France?',
      image: null,
      options: ['London', 'Paris', 'Berlin', 'Madrid'],
      correctAnswer: 1
    },
    {
      id: 2,
      type: 'multiple-choice',
      question: 'The linear system x₁ - 3x₂ = -7, 2x₁ + x₂ = 7 has only the solution x₁ = 2, x₂ = 3. We can briefly solved this equation through method of elimination.',
      image: '/placeholder-math.png',
      options: ['Choice A', 'Choice B', 'Choice C', 'Choice D'],
      correctAnswer: 0
    },
    {
      id: 3,
      type: 'identification',
      question: 'What is the largest planet in our solar system?',
      image: null,
      correctAnswer: 'Jupiter'
    },
    {
      id: 4,
      type: 'multiple-choice',
      question: 'Who painted the Mona Lisa?',
      image: null,
      options: ['Vincent van Gogh', 'Leonardo da Vinci', 'Pablo Picasso', 'Michelangelo'],
      correctAnswer: 1
    },
    {
      id: 5,
      type: 'multiple-choice',
      question: 'What is the chemical symbol for gold?',
      image: null,
      options: ['Go', 'Au', 'Gd', 'Ag'],
      correctAnswer: 1
    },
    {
      id: 6,
      type: 'identification',
      question: 'What year did World War II end?',
      image: null,
      correctAnswer: '1945'
    },
    {
      id: 7,
      type: 'multiple-choice',
      question: 'How many continents are there?',
      image: null,
      options: ['5', '6', '7', '8'],
      correctAnswer: 2
    },
    {
      id: 8,
      type: 'multiple-choice',
      question: 'What is the smallest prime number?',
      image: null,
      options: ['0', '1', '2', '3'],
      correctAnswer: 2
    },
    {
      id: 9,
      type: 'identification',
      question: 'What is the speed of light in m/s?',
      image: null,
      correctAnswer: '299792458'
    },
    {
      id: 10,
      type: 'multiple-choice',
      question: 'Which programming language is known as the language of the web?',
      image: null,
      options: ['Python', 'Java', 'JavaScript', 'C++'],
      correctAnswer: 2
    }
  ]

  const currentQuestion = questions[currentQuestionIndex]

  // Timer countdown
  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [timeRemaining])

  const handleSubmitAnswer = () => {
    if (!answeredQuestions.includes(currentQuestionIndex)) {
      setAnsweredQuestions([...answeredQuestions, currentQuestionIndex])
    }
    
    // Move to next question or finish quiz
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer(null)
      setTextAnswer('')
      setTimeRemaining(30)
    } else {
      // Quiz complete
      alert('Quiz completed!')
      onExit()
    }
  }

  const handleQuestionJump = (index) => {
    setCurrentQuestionIndex(index)
    setSelectedAnswer(null)
    setTextAnswer('')
    setTimeRemaining(30)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="quiz-container">
      {/* Top Navigation Bar */}
      <div className="quiz-nav-bar">
        <button className="quiz-nav-btn" onClick={onExit}>
          <img src={backIcon} alt="Back" className="quiz-nav-icon" />
        </button>
        <h1 className="quiz-title">{course.title}</h1>
        <button className="quiz-nav-btn">
          <img src={lightbulbIcon} alt="Hint" className="quiz-nav-icon" />
        </button>
      </div>

      {/* Main Content Area */}
      <div className="quiz-content">
        {/* Left: Question and Answers */}
        <div className="quiz-main-area">
          {/* Status Row */}
          <div className="quiz-status-row">
            <div className="quiz-timer">{formatTime(timeRemaining)}</div>
            <div className="quiz-progress">
              Question <span className="quiz-progress-current">{currentQuestionIndex + 1}</span> out of{' '}
              <span className="quiz-progress-total">{questions.length}</span>
            </div>
          </div>

          {/* Question Box */}
          <div className={`quiz-question-box ${!currentQuestion.image ? 'no-image' : ''}`}>
            {currentQuestion.image && (
              <div className="quiz-question-image" style={{ backgroundImage: `url(${currentQuestion.image})` }}></div>
            )}
            <p className="quiz-question-text">{currentQuestion.question}</p>
          </div>

          {/* Answer Section */}
          <div className="quiz-answers">
            {currentQuestion.type === 'multiple-choice' ? (
              <div className="quiz-answer-grid">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    className={`quiz-answer-option ${selectedAnswer === index ? 'selected' : ''}`}
                    onClick={() => setSelectedAnswer(index)}
                  >
                    <span className="quiz-answer-label">{String.fromCharCode(65 + index)}.</span>
                    <span className="quiz-answer-text">{option}</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="quiz-text-answer">
                <input
                  type="text"
                  className="quiz-text-input"
                  placeholder="Type your answer here..."
                  value={textAnswer}
                  onChange={(e) => setTextAnswer(e.target.value)}
                />
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="quiz-sidebar">
          <div className="quiz-logo">
            <img src={swordsIcon} alt="Logo" className="quiz-logo-img" />
          </div>

          <div className="quiz-question-list">
            {questions.map((_, index) => (
              <button
                key={index}
                className={`quiz-question-item ${
                  answeredQuestions.includes(index) ? 'answered' : ''
                } ${currentQuestionIndex === index ? 'current' : ''}`}
                onClick={() => handleQuestionJump(index)}
              >
                Question {index + 1}
              </button>
            ))}
          </div>

          <Button className="quiz-submit-btn" onClick={handleSubmitAnswer}>
            SUBMIT
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Quiz
