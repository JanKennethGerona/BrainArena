import React, { useState } from 'react'
import './Settings.css'
import settingsIcon from '../assets/images/Icons/SettingsGreeen.png'
import lightbulbIcon from '../assets/images/Icons/lightbulb-fill2.png'
import musicIcon from '../assets/images/Icons/music-2-fill.png'
import timezoneIcon from '../assets/images/Icons/time-zone-fill.png'
import languageIcon from '../assets/images/Icons/character-recognition-line.png'
import moonIcon from '../assets/images/Icons/moon-clear-fill.png'
import sunIcon from '../assets/images/Icons/sun-line.png'
import volumeOffIcon from '../assets/images/Icons/volume-off-vibrate-fill.png'
import volumeUpIcon from '../assets/images/Icons/volume-up-fill.png'

function Settings({ isOpen, onClose }) {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isBGMEnabled, setIsBGMEnabled] = useState(true)
  const [selectedDate, setSelectedDate] = useState('2026-01-12')
  const [selectedTime, setSelectedTime] = useState('20:00')
  const [selectedLanguage, setSelectedLanguage] = useState('English')

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
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-modal" onClick={(e) => e.stopPropagation()}>
        <button className="settings-close" onClick={onClose}>✕</button>
        
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
                <img src={moonIcon} alt="Dark" className="theme-icon" />
              </button>
              <button 
                className={`theme-button ${!isDarkMode ? 'active' : ''}`}
                onClick={() => setIsDarkMode(false)}
              >
                <img src={sunIcon} alt="Light" className="theme-icon" />
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
                  <img src={volumeUpIcon} alt="Mute" className="volume-icon" />
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
