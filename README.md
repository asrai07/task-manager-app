# Task Manager App

A full-stack mobile task management application built with React Native, Redux, Redux-Saga, Core PHP, and MySQL.

---

## Prerequisites

Before you begin, ensure you have the following installed:

**Frontend:**
- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [React Native CLI](https://reactnative.dev/docs/environment-setup)
- [Android Studio](https://developer.android.com/studio) (for Android development)
- [Xcode](https://developer.apple.com/xcode/) (for iOS development, macOS only)
- [JDK 11](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html) or higher

**Backend:**
- [PHP](https://www.php.net/downloads) (v7.4 or higher)
- [MySQL](https://dev.mysql.com/downloads/) (v5.7 or higher)
- [XAMPP](https://www.apachefriends.org/) (recommended for easy PHP + MySQL setup)
- [Composer](https://getcomposer.org/) (for PHP dependencies, optional)

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd task-manager-app
```

### 2. Backend Setup

#### Option A: Using XAMPP (Recommended)

1. **Install XAMPP:**
   - Download from [https://www.apachefriends.org/](https://www.apachefriends.org/)
   - Install and start Apache and MySQL services

2. **Setup Database:**
   ```bash
   # Open MySQL command line or phpMyAdmin
   # Navigate to http://localhost/phpmyadmin
   
   # Import the database schema
   mysql -u root -p < database.sql
   
   # Or manually create database and run SQL from database.sql file
   ```

3. **Configure Database Connection:**
   - Open `backend/task_manager/config/db.php`
   - Update credentials if needed:
   ```php
   $host = "localhost";
   $dbname = "task_manager";
   $username = "root";
   $password = "";  // Your MySQL password
   ```

4. **Copy Backend Files:**
   ```bash
   # Copy backend folder to XAMPP htdocs
   cp -r backend/task_manager /Applications/XAMPP/htdocs/  # macOS
   # OR
   copy backend\task_manager C:\xampp\htdocs\  # Windows
   ```

5. **Verify Backend:**
   - Open browser: `http://localhost/task_manager/index.php`
   - You should see: `{"error":"Invalid route"}`

#### Option B: Using Built-in PHP Server

1. **Setup Database:**
   ```bash
   # Start MySQL service
   mysql.server start  # macOS
   # OR
   net start MySQL  # Windows
   
   # Import database
   mysql -u root -p < database.sql
   ```

2. **Configure Database Connection:**
   - Update `backend/task_manager/config/db.php` with your MySQL credentials

3. **Start PHP Server:**
   ```bash
   cd backend
   php -S 0.0.0.0:8080 -t task_manager
   ```

4. **Verify Backend:**
   - Open browser: `http://localhost:8080/index.php`

### 3. Frontend Setup

1. **Install Dependencies:**
   ```bash
   npm install
   # OR
   yarn install
   ```

2. **Configure API Base URL:**
   - Open `src/services/authService.js`
   - Update BASE_URL:
   ```javascript
   // For XAMPP:
   const BASE_URL = "http://10.0.2.2/task_manager/index.php";  // Android Emulator
   // OR
   const BASE_URL = "http://localhost/task_manager/index.php";  // iOS Simulator
   
   // For Built-in PHP Server:
   const BASE_URL = "http://10.0.2.2:8080/index.php";  // Android Emulator
   // OR
   const BASE_URL = "http://localhost:8080/index.php";  // iOS Simulator
   ```
   
   - Update the same in `src/services/taskService.js`

3. **Start Metro Bundler:**
   ```bash
   npm start
   # OR
   yarn start
   ```

4. **Run on Android:**
   ```bash
   # In a new terminal
   npm run android
   # OR
   yarn android
   ```

5. **Run on iOS (macOS only):**
   ```bash
   # Install pods
   cd ios && pod install && cd ..
   
   # Run app
   npm run ios
   # OR
   yarn ios
   ```

---

## Verification Steps

### 1. Verify Backend is Running

```bash
# Test register endpoint
curl -X POST -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"test123"}' \
  http://localhost/task_manager/index.php/register

# Expected: {"message":"User registered successfully"}
```

### 2. Verify Database Connection

```bash
mysql -u root -p
USE task_manager;
SHOW TABLES;
# Should show: users, tasks, tokens
```

### 3. Verify Frontend

- App should open on emulator/simulator
- You should see the Login screen
- Try creating an account and logging in

### 4. UI Testing

For comprehensive UI testing instructions, see [UI-TESTING.md](UI-TESTING.md)

---

## API Endpoints

**Base URL:**
- XAMPP: `http://localhost/task_manager/index.php` (browser) or `http://10.0.2.2/task_manager/index.php` (Android emulator)
- Built-in Server: `http://localhost:8080/index.php` (browser) or `http://10.0.2.2:8080/index.php` (Android emulator)
- iOS Simulator: Use `localhost` instead of `10.0.2.2`

### Authentication Endpoints

#### Register User
```http
POST /register
Content-Type: application/json

Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response (200):
{
  "message": "User registered successfully"
}

Response (400):
{
  "error": "All fields required" | "Invalid email format" | "User already exists"
}
```

#### Login
```http
POST /login
Content-Type: application/json

Body:
{
  "email": "john@example.com",
  "password": "password123"
}

Response (200):
{
  "message": "Login successful",
  "token": "abc123...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}

Response (401):
{
  "error": "Email not found" | "Invalid password"
}
```

### Task Endpoints

**Note:** All task endpoints require authentication. Include token in header:
```
Authorization: {token}
```

#### Get All Tasks
```http
GET /tasks?user_id={user_id}
Authorization: {token}

Response (200):
{
  "data": [
    {
      "id": 1,
      "user_id": 1,
      "title": "Complete project",
      "description": "Finish the task manager app",
      "status": "pending",
      "created_at": "2024-01-01 10:00:00",
      "updated_at": "2024-01-01 10:00:00"
    }
  ]
}

Response (401):
{
  "error": "Unauthorized"
}
```

#### Create Task
```http
POST /tasks
Content-Type: application/json
Authorization: {token}

Body:
{
  "user_id": 1,
  "title": "New Task",
  "description": "Task description",
  "status": "pending"  // Optional: pending | in_progress | completed
}

Response (200):
{
  "message": "Task created"
}

Response (400):
{
  "error": "Missing required fields" | "Invalid status" | "Title must be less than 200 characters"
}
```

#### Update Task
```http
PUT /tasks/{id}
Content-Type: application/json
Authorization: {token}

Body:
{
  "title": "Updated Task",
  "description": "Updated description",
  "status": "completed"
}

Response (200):
{
  "message": "Task updated"
}

Response (400):
{
  "error": "Title required" | "Invalid status"
}
```

#### Delete Task
```http
DELETE /tasks/{id}
Authorization: {token}

Response (200):
{
  "message": "Task deleted"
}

Response (401):
{
  "error": "Unauthorized"
}
```

### Status Values
Valid task status values:
- `pending` - Task is pending
- `in_progress` - Task is in progress
- `completed` - Task is completed

### Error Codes
- `200` - Success
- `400` - Bad Request (validation error)
- `401` - Unauthorized (invalid/missing token)
- `404` - Not Found (invalid route)

---

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

**Fields:**
- `id` - Unique user identifier
- `name` - User's full name (max 100 characters)
- `email` - User's email address (unique)
- `password` - Hashed password using PHP password_hash()
- `created_at` - Account creation timestamp
- `updated_at` - Last update timestamp

### Tasks Table
```sql
CREATE TABLE tasks (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  title VARCHAR(200) NOT NULL,
  description LONGTEXT,
  status ENUM('pending', 'in_progress', 'completed') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

**Fields:**
- `id` - Unique task identifier
- `user_id` - Foreign key to users table
- `title` - Task title (max 200 characters)
- `description` - Task description (long text)
- `status` - Task status (pending, in_progress, completed)
- `created_at` - Task creation timestamp
- `updated_at` - Last update timestamp

**Constraints:**
- Foreign key on user_id with CASCADE delete (deleting user deletes their tasks)

### Tokens Table
```sql
CREATE TABLE tokens (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  token VARCHAR(64) UNIQUE NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

**Fields:**
- `id` - Unique token identifier
- `user_id` - Foreign key to users table
- `token` - Authentication token (64 characters, unique)
- `expires_at` - Token expiration timestamp (7 days from creation)
- `created_at` - Token creation timestamp

**Constraints:**
- Unique constraint on token
- Foreign key on user_id with CASCADE delete

**Indexes:**
- Index on `token` for fast lookup
- Index on `user_id` for user-based queries
- Index on `email` in users table
- Index on `user_id` in tasks table

### Database Import

The complete database schema is available in `database.sql` file. Import using:

```bash
# Using MySQL command line
mysql -u root -p < database.sql

# Or using phpMyAdmin
# 1. Open http://localhost/phpmyadmin
# 2. Click "Import" tab
# 3. Choose database.sql file
# 4. Click "Go"
```

---

## Postman Collection

A Postman collection is included at `backend/postman_collection.json` with pre-configured requests:

1. **Import Collection:**
   - Open [Postman](https://www.postman.com/downloads/)
   - Click "Import" → Choose `backend/postman_collection.json`

2. **Configure Variables:**
   - Set `baseUrl` variable to your backend URL
   - After login, copy the token from response and set `token` variable

3. **Available Requests:**
   - Register - Create new user account
   - Login - Authenticate and get token
   - Fetch Tasks - Get all tasks for a user
   - Create Task - Add new task
   - Update Task - Modify existing task
   - Delete Task - Remove task

---

## Running Tests

**Frontend Tests:**
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

**Backend Tests:**
```bash
# Install PHPUnit (if not installed)
composer require --dev phpunit/phpunit

# Run tests
cd backend/task_manager
vendor/bin/phpunit
```

---

## What Would I Improve With More Time

**Security & Authentication:**
- Implement JWT tokens instead of custom tokens for better security and standardization
- Add refresh token mechanism for seamless session management
- Implement rate limiting on API endpoints to prevent abuse
- Add HTTPS/SSL support for production deployment

**Code Quality & Architecture:**
- Add comprehensive unit and integration tests (Jest, React Native Testing Library)
- Implement error boundaries in React Native for better error handling
- Add TypeScript for type safety across the entire codebase
- Implement proper logging system for debugging and monitoring

**Features & UX:**
- Add task filtering and sorting (by status, date, priority)
- Implement task search functionality
- Add task due dates and reminders
- Implement offline support with local caching (Redux Persist)
- Add pagination for large task lists
- Implement real-time updates using WebSockets

**Performance:**
- Optimize database queries with proper indexing
- Implement caching strategy (Redis) for frequently accessed data
- Add image optimization and lazy loading if images are added
- Implement code splitting and lazy loading for React Native

**DevOps & Deployment:**
- Set up CI/CD pipeline for automated testing and deployment
- Add Docker containerization for consistent environments
- Implement proper environment configuration management
- Add API documentation using Swagger/OpenAPI
- Set up monitoring and analytics (Sentry, Firebase Analytics)

---

## Troubleshooting

**Backend Issues:**

1. **Database connection failed:**
   - Verify MySQL is running: `mysql.server status` or check XAMPP control panel
   - Check credentials in `backend/task_manager/config/db.php`
   - Ensure database `task_manager` exists

2. **Invalid route error:**
   - Check Apache/PHP server is running
   - Verify URL includes `/index.php` in the path
   - Check `.htaccess` file exists in `backend/task_manager/`

3. **Token validation fails:**
   - Ensure tokens table exists in database
   - Check token hasn't expired (7 days)
   - Verify Authorization header is being sent

**Frontend Issues:**

1. **Cannot connect to backend:**
   - Android Emulator: Use `10.0.2.2` instead of `localhost`
   - iOS Simulator: Use `localhost`
   - Check BASE_URL in `src/services/authService.js` and `taskService.js`
   - Verify backend is running and accessible

2. **Metro bundler issues:**
   ```bash
   # Clear cache and restart
   npm start -- --reset-cache
   ```

3. **Build errors:**
   ```bash
   # Clean and rebuild
   cd android && ./gradlew clean && cd ..
   npm run android
   ```

4. **Pod install fails (iOS):**
   ```bash
   cd ios
   pod deintegrate
   pod install
   cd ..
   ```

---

## Project Structure

```
task-manager-app/
├── android/                 # Android native code
├── ios/                     # iOS native code
├── backend/
│   └── task_manager/
│       ├── config/
│       │   └── db.php      # Database configuration
│       ├── tests/          # PHPUnit tests
│       ├── index.php       # Main API entry point
│       ├── phpunit.xml     # PHPUnit configuration
│       └── .htaccess       # Apache configuration
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Button.js
│   │   ├── Input.js
│   │   ├── TaskCard.js
│   │   └── Loader.js
│   ├── navigation/         # Navigation configuration
│   │   └── AppNavigator.js
│   ├── redux/
│   │   ├── actions/        # Redux action creators
│   │   ├── reducers/       # Redux reducers
│   │   ├── sagas/          # Redux-Saga middleware
│   │   └── store.js        # Redux store configuration
│   ├── screens/            # App screens
│   │   ├── LoginScreen.js
│   │   ├── SignupScreen.js
│   │   ├── TaskListScreen.js
│   │   └── AddEditTaskScreen.js
│   └── services/           # API service layer
│       ├── authService.js
│       └── taskService.js
├── database.sql            # Database schema
├── package.json            # Node dependencies
└── README.md              # This file
```

---

## License
MIT