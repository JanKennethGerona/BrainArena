import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/images/6.png'
import './Landing.css'

function Landing() {
  const navigate = useNavigate()

  const handleLogin = () => {
    // Navigate to login page (you'll create this later)
    navigate('/login')
  }

  const handleCreateAccount = () => {
    // Navigate to login page with register mode enabled
    navigate('/login', { state: { isRegister: true } })
  }

  return (
    <div className="landing">
      <div className="landing-container">
        <div className="logo-section">
          <img src={logo} alt="BrainArena Logo" className="logo" />
        </div>
        
        <h1 className="brand-name">BRAINARENA</h1>
        <p className="tagline">LEARNING MEETS <br />COMPETITION</p>
        
        <div className="button-group">
          <button className="btn btn-primary" onClick={handleLogin}>
            LOG IN
          </button>
          <button className="btn btn-secondary" onClick={handleCreateAccount}>
            CREATE NEW ACCOUNT
          </button>
        </div>
      </div>
    </div>
  )
}

export default Landing
