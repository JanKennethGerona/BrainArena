import React, { useEffect, useState } from 'react'
import './Home.css'

function Home() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('/api')
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(err => console.error('Error fetching data:', err))
  }, [])

  return (
    <div className="home">
      <div className="hero">
        <h1>Welcome to BrainArena</h1>
        <p>A full-stack React application with MySQL database</p>
        {message && <p className="server-message">{message}</p>}
      </div>
    </div>
  )
}

export default Home
