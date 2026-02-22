import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import logo from '../assets/images/6.svg'
import './Landing.css'

function Landing() {
  const navigate = useNavigate()

  const handleLogin = () => {
    navigate('/login')
  }

  const handleCreateAccount = () => {
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
          <Button variant="primary" onClick={handleLogin}>
            LOG IN
          </Button>
          <Button variant="secondary" onClick={handleCreateAccount}>
            CREATE NEW ACCOUNT
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Landing
