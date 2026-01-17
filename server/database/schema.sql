-- BrainArena Database Schema
-- Run this script to set up the initial database structure

CREATE DATABASE IF NOT EXISTS brainarena;
USE brainarena;

-- Example table
CREATE TABLE IF NOT EXISTS example_table (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO example_table (name, description) VALUES
('Sample 1', 'This is a sample entry'),
('Sample 2', 'Another sample entry');
