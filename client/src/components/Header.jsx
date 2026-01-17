import React from 'react'
import './Header.css'

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <h1 className="logo">BrainArena</h1>
        <nav className="nav">
          <a href="/" className="nav-link">Home</a>
        </nav>
      </div>
    </header>
  )
}

export default Header
