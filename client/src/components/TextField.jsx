import React from 'react'
import './TextField.css'

function TextField({ type = 'text', name, placeholder, value, onChange, icon, required }) {
  return (
    <div className="input-group">
      <div className="input-wrapper">
        {icon && <div className="input-icon">{icon}</div>}
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="text-field-input"
          required={required}
        />
      </div>
    </div>
  )
}

export default TextField
