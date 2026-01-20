import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Button from '../components/Button'
import TextField from '../components/TextField'
import logo from '../assets/images/6.png'
import './Login.css'

function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const [isRegisterMode, setIsRegisterMode] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')

  useEffect(() => {
    if (location.state?.isRegister) {
      setIsRegisterMode(true)
    }
  }, [location])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isRegisterMode) {
      console.log('Register:', { username, password, repeatPassword })
    } else {
      console.log('Login:', { username, password })
      navigate('/dashboard')
    }
  }

  const toggleMode = () => {
    setIsRegisterMode(!isRegisterMode)
    setRepeatPassword('')
  }

  const UserIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 10C12.7614 10 15 7.76142 15 5C15 2.23858 12.7614 0 10 0C7.23858 0 5 2.23858 5 5C5 7.76142 7.23858 10 10 10Z" fill="#9CA3AF"/>
      <path d="M10 12.5C5.58172 12.5 2 14.7386 2 17.5C2 18.3284 2.67157 19 3.5 19H16.5C17.3284 19 18 18.3284 18 17.5C18 14.7386 14.4183 12.5 10 12.5Z" fill="#9CA3AF"/>
    </svg>
  )

  const LockIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M15 8H14V6C14 3.79086 12.2091 2 10 2C7.79086 2 6 3.79086 6 6V8H5C3.89543 8 3 8.89543 3 10V16C3 17.1046 3.89543 18 5 18H15C16.1046 18 17 17.1046 17 16V10C17 8.89543 16.1046 8 15 8ZM10 14C9.44772 14 9 13.5523 9 13C9 12.4477 9.44772 12 10 12C10.5523 12 11 12.4477 11 13C11 13.5523 10.5523 14 10 14ZM12 8H8V6C8 4.89543 8.89543 4 10 4C11.1046 4 12 4.89543 12 6V8Z" fill="#9CA3AF"/>
    </svg>
  )

  return (
    <div className="login">
      <div className="login-container">
        <div className="login-header">
          <img src={logo} alt="BrainArena Logo" className="login-logo" />
          <h1 className="login-brand">BRAINARENA</h1>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <TextField
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            icon={<UserIcon />}
          />

          <TextField
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={<LockIcon />}
          />

          <div className={`repeat-password-wrapper ${isRegisterMode ? 'show' : ''}`}>
            <TextField
              type="password"
              placeholder="Repeat Password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              icon={<LockIcon />}
            />
          </div>

          <div className="login-footer">
            <span className="login-text">
              {isRegisterMode ? "Already have an account?" : "Don't have an account?"}
            </span>
            <button type="button" onClick={toggleMode} className="register-link">
              {isRegisterMode ? "Login" : "Register"}
            </button>
          </div>

          <Button type="submit" variant="primary" className="login-btn-full">
            {isRegisterMode ? "REGISTER" : "LOG IN"}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Login
