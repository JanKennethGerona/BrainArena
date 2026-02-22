import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

let pool;
export const setPool = (dbPool) => { pool = dbPool; };

// REGISTER
router.post('/register',
  [
    body('username')
      .trim()
      .notEmpty().withMessage('Username is required')
      .isLength({ min: 3, max: 50 }).withMessage('Username must be between 3 and 50 characters')
      .isAlphanumeric().withMessage('Username can only contain letters and numbers'),
    body('email')
      .trim()
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Please enter a valid email address')
      .normalizeEmail(),
    body('password')
      .notEmpty().withMessage('Password is required')
      .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('displayName')
      .optional()
      .trim()
      .isLength({ max: 100 }).withMessage('Display name cannot exceed 100 characters')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password, displayName } = req.body;

    try {
      // Check for existing username
      const [existingUsername] = await pool.query(
        'SELECT id FROM users WHERE username = ?',
        [username]
      );

      if (existingUsername.length > 0) {
        return res.status(400).json({ error: 'This username is already taken. Please choose a different username.' });
      }

      // Check for existing email
      const [existingEmail] = await pool.query(
        'SELECT id FROM users WHERE email = ?',
        [email]
      );

      if (existingEmail.length > 0) {
        return res.status(400).json({ error: 'An account with this email already exists. Please use a different email or login.' });
      }

      const passwordHash = await bcrypt.hash(password, 10);

      const [result] = await pool.query(
        'INSERT INTO users (username, email, password_hash, display_name) VALUES (?, ?, ?, ?)',
        [username, email, passwordHash, displayName || username]
      );

      const token = jwt.sign(
        { userId: result.insertId, username },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      res.status(201).json({
        message: 'User registered successfully',
        token,
        user: {
          id: result.insertId,
          username,
          email,
          displayName: displayName || username
        }
      });

    } catch (err) {
      console.error('Registration error:', err);
      res.status(500).json({ error: 'Something went wrong while creating your account. Please try again later.' });
    }
  }
);

// LOGIN
router.post('/login',
  [
    body('username')
      .trim()
      .notEmpty().withMessage('Username or email is required'),
    body('password')
      .notEmpty().withMessage('Password is required')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
      const [users] = await pool.query(
        'SELECT * FROM users WHERE username = ? OR email = ?',
        [username, username]
      );

      if (users.length === 0) {
        return res.status(401).json({ error: 'Incorrect username/email or password.' });
      }

      const user = users[0];
      const isValidPassword = await bcrypt.compare(password, user.password_hash);

      if (!isValidPassword) {
        return res.status(401).json({ error: 'Incorrect username/email or password.' });
      }

      await pool.query(
        'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?',
        [user.id]
      );

      const token = jwt.sign(
        { userId: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      res.json({
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          displayName: user.display_name
        }
      });

    } catch (err) {
      console.error('Login error:', err);
      res.status(500).json({ error: 'Something went wrong while logging you in. Please try again later.' });
    }
  }
);

// GET CURRENT USER
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const [users] = await pool.query(
      'SELECT id, username, email, display_name, created_at FROM users WHERE id = ?',
      [req.user.userId]
    );

    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user: users[0] });

  } catch (err) {
    console.error('Get user error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;