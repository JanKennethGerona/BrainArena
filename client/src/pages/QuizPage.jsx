import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './QuizPage.css'
import Button from '../components/Button'
import ExitConfirmationModal from '../components/ExitConfirmationModal'
import backIcon from '../assets/images/Icons/back.svg'
import lightbulbIcon from '../assets/images/Icons/lightbulb-fill.svg'
import logoIcon from '../assets/images/6.svg'
import questionIcon from '../assets/images/Icons/question.svg'
import CheckIcon from '../assets/images/Icons/correct.svg'
import WrongIcon from '../assets/images/Icons/wrong.svg'

function QuizPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const course = location.state?.course

  // Get quiz settings from course tags
  const timeTag = course?.tags?.find(tag => ['10s', '20s', '30s'].includes(tag))
  const timePerQuestion = timeTag ? parseInt(timeTag) : 30
  const hasHint = course?.tags?.includes('hint')
  const hasMCQ = course?.tags?.includes('MCQ')
  const hasIdentification = course?.tags?.includes('Identification')

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(timePerQuestion)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [textAnswer, setTextAnswer] = useState('')
  const [answeredQuestions, setAnsweredQuestions] = useState([])
  const [answerResults, setAnswerResults] = useState({}) // Store correct/wrong for each question
  const [showingResult, setShowingResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [showExitConfirm, setShowExitConfirm] = useState(false)
  const [totalTimeSpent, setTotalTimeSpent] = useState(0)
  const [hintsUsed, setHintsUsed] = useState(0)

  // Placeholder quiz data - all questions
  const allQuestions = [
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

  // Filter questions based on course tags
  const questions = allQuestions.filter(q => {
    if (hasMCQ && hasIdentification) {
      // Show all questions if both tags are present
      return true
    } else if (hasMCQ) {
      // Show only MCQ questions
      return q.type === 'multiple-choice'
    } else if (hasIdentification) {
      // Show only identification questions
      return q.type === 'identification'
    }
    // Default: show all questions if no type tags
    return true
  })

  const currentQuestion = questions[currentQuestionIndex]

  // Timer countdown
  useEffect(() => {
    if (timeRemaining > 0 && !showingResult) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1)
        setTotalTimeSpent(totalTimeSpent + 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (timeRemaining === 0 && !showingResult) {
      // Auto-submit when timer runs out
      handleSubmitAnswer()
    }
  }, [timeRemaining, showingResult, totalTimeSpent])

  const handleSubmitAnswer = () => {
    if (showingResult) return

    // Check if answer is correct
    let correct = false
    if (currentQuestion.type === 'multiple-choice') {
      correct = selectedAnswer === currentQuestion.correctAnswer
    } else {
      correct = textAnswer.trim().toLowerCase() === currentQuestion.correctAnswer.toLowerCase()
    }

    // Mark question as answered and store result
    if (!answeredQuestions.includes(currentQuestionIndex)) {
      setAnsweredQuestions([...answeredQuestions, currentQuestionIndex])
    }
    setAnswerResults({ ...answerResults, [currentQuestionIndex]: correct })
    setIsCorrect(correct)
    setShowingResult(true)
    
    // Wait for delay then move to next question or show summary
    setTimeout(() => {
      setShowingResult(false)
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
        setSelectedAnswer(null)
        setTextAnswer('')
        setTimeRemaining(timePerQuestion)
      } else {
        // Quiz complete - navigate to summary
        const correctCount = Object.values({ ...answerResults, [currentQuestionIndex]: correct }).filter(r => r === true).length
        navigate('/quiz-summary', {
          state: {
            subject: course.title,
            totalTime: questions.length * timePerQuestion,
            timeSpent: totalTimeSpent,
            correctAnswers: correctCount,
            totalQuestions: questions.length,
            hintsUsed: hintsUsed
          }
        })
      }
    }, 1500)
  }

  const handleQuestionJump = (index) => {
    setCurrentQuestionIndex(index)
    setSelectedAnswer(null)
    setTextAnswer('')
    setTimeRemaining(timePerQuestion)
  }

  const handleExit = () => {
    setShowExitConfirm(true)
  }

  const confirmExit = () => {
    navigate('/dashboard')
  }

  const cancelExit = () => {
    setShowExitConfirm(false)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  if (!course) {
    navigate('/dashboard')
    return null
  }

  return (
    <div className="quiz-container">
      {/* Top Navigation Bar */}
      <div className="quiz-nav-bar">
        <button className="quiz-nav-btn" onClick={handleExit}>
          <img src={backIcon} alt="Back" className="quiz-nav-icon" />
        </button>
        <h1 className="quiz-title">{course.title}</h1>
        <button 
          className={`quiz-nav-btn hint-btn ${!hasHint ? 'hint-disabled' : ''}`}
          onClick={() => hasHint && setHintsUsed(hintsUsed + 1)}
          disabled={!hasHint}
        >
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
                    className={`quiz-answer-option ${
                      selectedAnswer === index ? 'selected' : ''
                    } ${
                      showingResult && selectedAnswer === index
                        ? isCorrect
                          ? 'correct'
                          : 'wrong'
                        : ''
                    }`}
                    onClick={() => !showingResult && setSelectedAnswer(index)}
                    disabled={showingResult}
                  >
                    <span className="quiz-answer-label">{String.fromCharCode(65 + index)}.</span>
                    <span className="quiz-answer-text">{option}</span>
                  </button>
                ))}
              </div>
            ) : (
              <input
                type="text"
                className={`quiz-text-input ${
                  showingResult
                    ? isCorrect
                      ? 'correct'
                      : 'wrong'
                    : ''
                }`}
                placeholder="Type your answer here..."
                value={textAnswer}
                onChange={(e) => setTextAnswer(e.target.value)}
                disabled={showingResult}
              />
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="quiz-sidebar">
          <div className="quiz-logo">
            <img src={logoIcon} alt="Logo" className="quiz-logo-img" />
          </div>

          <div className="quiz-question-list">
            {questions.map((_, index) => {
              let icon = questionIcon
              if (answerResults[index] === true) {
                icon = CheckIcon
              } else if (answerResults[index] === false) {
                icon = WrongIcon
              }
              
              return (
                <button
                  key={index}
                  className={`quiz-question-item ${
                    answeredQuestions.includes(index) ? 'answered' : ''
                  } ${currentQuestionIndex === index ? 'current' : ''} ${
                    answerResults[index] === true ? 'correct-result' : ''
                  } ${answerResults[index] === false ? 'wrong-result' : ''}`}
                  onClick={() => handleQuestionJump(index)}
                >
                  <img 
                    src={icon} 
                    alt="Status" 
                    className="quiz-question-icon" 
                  />
                  Question {index + 1}
                </button>
              )
            })}
          </div>

          <Button className="quiz-submit-btn" onClick={handleSubmitAnswer}>
            SUBMIT
          </Button>
        </div>
      </div>

      <ExitConfirmationModal 
        isOpen={showExitConfirm}
        onConfirm={confirmExit}
        onCancel={cancelExit}
      />
    </div>
  )
}

export default QuizPage
