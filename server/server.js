import 'dotenv/config';
import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import authRoutes, { setPool } from './routes/auth.js';

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Configuration
const corsOptions = {
  origin: [
    'https://www.brain-arena.games',
    'https://brain-arena.games',
    'https://brainarena.vercel.app',
    'http://localhost:3000' // Keep this so you can still test locally
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Database connection
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

setPool(pool);

// Connect to database
pool.getConnection()
  .then(connection => {
    console.log('✅ Connected to Clever Cloud MySQL database!');
    connection.release();
  })
  .catch(err => {
    console.error('❌ Database connection failed:', err);
  });

// Routes
app.use('/api/auth', authRoutes);

// Test route
app.get('/api/test', async (req, res) => {
  try {
    const [results] = await pool.query('SELECT 1 + 1 AS result');
    res.json({ 
      message: 'Backend is working!', 
      database: 'Connected',
      queryResult: results[0].result 
    });
  } catch (err) {
    res.status(500).json({ 
      message: 'Backend is working!', 
      database: 'Connection failed',
      error: err.message 
    });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

export default pool;
