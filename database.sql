-- Task Manager Database Schema
-- MySQL Database Dump

-- Create Database
CREATE DATABASE IF NOT EXISTS task_manager;
USE task_manager;

-- Create Users Table
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create Tasks Table
CREATE TABLE IF NOT EXISTS tasks (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  title VARCHAR(200) NOT NULL,
  description LONGTEXT,
  status ENUM('pending', 'in_progress', 'Completed') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create Indexes for better performance
CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_users_email ON users(email);

-- Sample Data (Optional)
-- INSERT INTO users (name, email, password) VALUES
-- ('John Doe', 'john@example.com', 'hashed_password_here'),
-- ('Jane Smith', 'jane@example.com', 'hashed_password_here');

-- INSERT INTO tasks (user_id, title, description, status) VALUES
-- (1, 'Complete Project', 'Finish the React Native application', 'in_progress'),
-- (1, 'Database Design', 'Design the database schema', 'Completed'),
-- (2, 'API Development', 'Build REST API endpoints', 'pending');
