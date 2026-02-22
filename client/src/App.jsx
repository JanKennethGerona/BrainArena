import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import LeaderBoard from './pages/LeaderBoard'
import History from './pages/History'
import QuizPage from './pages/QuizPage'
import QuizSummary from './pages/QuizSummary'
import './App.css'

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="app">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/leaderboard" element={<LeaderBoard />} />
          <Route path="/history" element={<History />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/quiz-summary" element={<QuizSummary />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
