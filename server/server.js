import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mysql from 'mysql2/promise'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'brainarena',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

// Test database connection
pool.getConnection()
  .then(connection => {
    console.log('✓ MySQL database connected')
    connection.release()
  })
  .catch(err => {
    console.error('✗ MySQL connection error:', err.message)
  })

// Routes
app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to BrainArena API' })
})

app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT 1')
    res.json({ status: 'healthy', database: 'connected' })
  } catch (error) {
    res.status(500).json({ status: 'unhealthy', database: 'disconnected', error: error.message })
  }
})

// Example database query
app.get('/api/data', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM example_table LIMIT 10')
    res.json(rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.listen(PORT, () => {
  console.log(`✓ Server running on port ${PORT}`)
})
