import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Button from '../components/Button'
import TextField from '../components/TextField'
import logo from '../assets/images/6.svg'
import './Login.css'
import API_URL from '../config'

function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const [isLoginMode, setIsLoginMode] = useState(true)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    displayName: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (location.state?.isRegister) {
      setIsLoginMode(false)
    }
  }, [location])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const endpoint = isLoginMode ? '/api/auth/login' : '/api/auth/register'
      const body = isLoginMode 
        ? { username: formData.username, password: formData.password }
        : { 
            username: formData.username, 
            email: formData.email, 
            password: formData.password,
            displayName: formData.displayName 
          }

      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

      const data = await response.json()

      if (response.ok) {
        // Save token to localStorage
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        
        // Redirect to dashboard
        navigate('/dashboard')
      } else {
        // Handle validation errors or general error
        if (data.errors && data.errors.length > 0) {
          setError(data.errors.map(err => err.msg).join(', '))
        } else {
          setError(data.error || 'Authentication failed. Please try again.')
        }
      }
    } catch (err) {
      setError('Unable to connect to the server. Please check your connection and try again.')
      console.error('Auth error:', err)
    } finally {
      setLoading(false)
    }
  }

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode)
    setError('')
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
            name="username"
            placeholder="Enter Username"
            value={formData.username}
            onChange={handleChange}
            icon={<UserIcon />}
            required
          />

          {!isLoginMode && (
            <>
              <TextField
                type="email"
                name="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <TextField
                type="text"
                name="displayName"
                placeholder="Enter Display Name (optional)"
                value={formData.displayName}
                onChange={handleChange}
              />
            </>
          )}

          <TextField
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            icon={<LockIcon />}
            required
          />

          <div className="login-footer">
            <span className="login-text">
              {isLoginMode ? "Don't have an account?" : "Already have an account?"}
            </span>
            <button type="button" onClick={toggleMode} className="register-link">
              {isLoginMode ? "Register" : "Login"}
            </button>
          </div>

          {error && <div className="error-message" style={{ marginBottom: '1rem' }}>{error}</div>}
          <Button type="submit" variant="primary" className="login-btn-full" disabled={loading}>
            {loading ? 'Please wait...' : (isLoginMode ? "LOG IN" : "REGISTER")}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Login
