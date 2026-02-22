import React, { useState } from 'react'
import './Settings.css'
import settingsIcon from '../assets/images/Icons/settings/settings.svg'
import lightbulbIcon from '../assets/images/Icons/settings/btheme.svg'
import musicIcon from '../assets/images/Icons/settings/bsound.svg'
import timezoneIcon from '../assets/images/Icons/settings/bdate.svg'
import languageIcon from '../assets/images/Icons/settings/blanguage.svg'
import moonIcon from '../assets/images/Icons/settings/bnight.svg'
import sunIcon from '../assets/images/Icons/settings/bsun.svg'
import invertsunIcon from '../assets/images/Icons/settings/wsun.svg'
import invertmoonIcon from '../assets/images/Icons/settings/wnight.svg'
import volumeOffIcon from '../assets/images/Icons/settings/bvolume.svg'

function Settings({ isOpen, onClose }) {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isBGMEnabled, setIsBGMEnabled] = useState(true)
  const [selectedDate, setSelectedDate] = useState('2026-01-12')
  const [selectedTime, setSelectedTime] = useState('20:00')
  const [selectedLanguage, setSelectedLanguage] = useState('English')
  const [isClosing, setIsClosing] = useState(false)

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsClosing(false)
      onClose()
    }, 200) // Match animation duration
  }

  const languages = [
    'English',
    'Spanish',
    'French',
    'German',
    'Italian',
    'Portuguese',
    'Russian',
    'Chinese',
    'Japanese',
    'Korean',
    'Arabic',
    'Hindi',
    'Dutch',
    'Swedish',
    'Norwegian',
    'Danish',
    'Finnish',
    'Polish',
    'Turkish',
    'Vietnamese',
    'Thai',
    'Indonesian',
    'Greek',
    'Czech',
    'Hungarian'
  ]

  if (!isOpen) return null

  return (
    <div className={`settings-overlay ${isClosing ? 'closing' : ''}`} onClick={handleClose}>
      <div className="settings-modal" onClick={(e) => e.stopPropagation()}>
        <button className="settings-close" onClick={handleClose}>✕</button>
        
        <div className="settings-header">
          <img src={settingsIcon} alt="Settings" className="settings-header-icon" />
          <h2 className="settings-title">SETTINGS</h2>
        </div>

        <div className="settings-content">
          <div className="settings-row">
            <div className="settings-label">
              <img src={lightbulbIcon} alt="Theme" className="settings-icon" />
              <span>Theme</span>
            </div>
            <div className="settings-controls">
              <button 
                className={`theme-button ${isDarkMode ? 'active' : ''}`}
                onClick={() => setIsDarkMode(true)}
              >
                <img src={isDarkMode ? invertmoonIcon : moonIcon} alt="Dark" className="theme-icon" />
              </button>
              <button 
                className={`theme-button ${!isDarkMode ? 'active' : ''}`}
                onClick={() => setIsDarkMode(false)}
              >
                <img src={!isDarkMode ? invertsunIcon : sunIcon} alt="Light" className="theme-icon" />
              </button>
            </div>
          </div>

          <div className="settings-row">
            <div className="settings-label">
              <img src={musicIcon} alt="BGM" className="settings-icon" />
              <span>BGM</span>
            </div>
            <div className="settings-controls">
              <button 
                className="bgm-button"
                onClick={() => setIsBGMEnabled(!isBGMEnabled)}
              >
                {isBGMEnabled ? (
                  <img src={musicIcon} alt="Mute" className="volume-icon" />
                ) : (
                  <img src={volumeOffIcon} alt="Unmute" className="volume-icon" />
                )}
              </button>
            </div>
          </div>

          <div className="settings-row">
            <div className="settings-label">
              <img src={timezoneIcon} alt="Date & Time" className="settings-icon" />
              <span>Date & Time</span>
            </div>
            <div className="settings-controls">
              <input 
                type="date" 
                className="settings-date-input"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
              <input 
                type="time" 
                className="settings-time-input"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
              />
            </div>
          </div>

          <div className="settings-row">
            <div className="settings-label">
              <img src={languageIcon} alt="Language" className="settings-icon" />
              <span>Language</span>
            </div>
            <div className="settings-controls">
              <select 
                className="settings-select"
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
