import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './PlayerCard.css'
import Settings from './Settings'
import userIcon from '../assets/images/Icons/user-3-fill.png'
import settingsIcon from '../assets/images/Icons/settings-3-fill.png'
import logoutIcon from '../assets/images/Icons/logout-box-fill.png'

function PlayerCard({ playerData }) {
  const navigate = useNavigate()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const handleMenuClick = (action) => {
    console.log(action)
    setIsDropdownOpen(false)
    if (action === 'settings') {
      setIsSettingsOpen(true)
    } else if (action === 'logout') {
      navigate('/')
    }
  }

  const closeSettings = () => {
    setIsSettingsOpen(false)
  }

  return (
    <>
      <div className="player-card">
        <div className="player-avatar-wrapper">
          <img 
            src={playerData.avatar} 
            alt="Player Avatar" 
            className="player-avatar" 
            onClick={toggleDropdown}
          />
          {isDropdownOpen && (
            <div className="player-dropdown">
              <button 
                className="dropdown-item" 
                onClick={() => handleMenuClick('profile')}
              >
                <img src={userIcon} alt="Profile" className="dropdown-icon" />
                <span>Profile</span>
              </button>
              <button 
                className="dropdown-item" 
                onClick={() => handleMenuClick('settings')}
              >
                <img src={settingsIcon} alt="Settings" className="dropdown-icon" />
                <span>Settings</span>
              </button>
              <button 
                className="dropdown-item" 
                onClick={() => handleMenuClick('logout')}
              >
                <img src={logoutIcon} alt="Logout" className="dropdown-icon" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
        <div className="player-info">
          <h3 className="player-name">{playerData.name}</h3>
          <p className="player-level">Level: {playerData.level}</p>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${playerData.progress}%` }}></div>
          </div>
        </div>
      </div>

      <Settings isOpen={isSettingsOpen} onClose={closeSettings} />
    </>
  )
}

export default PlayerCard
