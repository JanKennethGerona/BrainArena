import React from 'react'
import './TextField.css'

function TextField({ type = 'text', placeholder, value, onChange, icon }) {
  return (
    <div className="input-group">
      <div className="input-wrapper">
        {icon && <div className="input-icon">{icon}</div>}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="text-field-input"
        />
      </div>
    </div>
  )
}

export default TextField
