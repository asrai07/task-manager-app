# Task Manager App

This repository contains a React Native frontend (in `src/`) and a simple PHP backend API (can be served from XAMPP or copied into the project `backend/` directory).

---

## What to submit
- This `README.md` with setup instructions, API endpoints, and database schema.
- `database.sql` (provided in project root).
- Postman collection included at `backend/postman_collection.json`.

---

## Quick Setup (frontend)

Prerequisites
- Node.js (14+ recommended)
- npm or yarn
- React Native CLI
- Android Studio (for Android) or Xcode (for iOS)

Install and run
```bash
# from project root
npm install
npm start
# open another terminal to run on emulator/device
npm run android   # or npm run ios
```

---

## Backend (PHP) — two options

Option A — Use XAMPP (recommended)
1. Ensure XAMPP Apache + MySQL running.
2. Your backend files are already at: `C:\xampp\htdocs\task_manager`.
3. API entry: `http://localhost/task_manager/index.php` (host), emulator: `http://10.0.2.2/task_manager/index.php`.

Option B — Serve from project
1. Copy backend files into project: `TaskManagerApp/backend/`.
2. From project root run:
```bash
php -S 0.0.0.0:8080 -t backend
```
3. Example entry: `http://10.0.2.2:8080/task_manager/index.php` (adjust if `index.php` location differs).

---

## Import Database (MySQL)

From project root (or wherever `database.sql` is):
```bash
mysql -u root -p < database.sql
```

`database.sql` creates the `task_manager` DB and the `users` and `tasks` tables.

---

## API Endpoints

Base: (depends on how you serve backend)
- XAMPP (browser): `http://localhost/task_manager/index.php`
- Emulator (XAMPP): `http://10.0.2.2/task_manager/index.php`
- Built-in server: `http://10.0.2.2:8080/task_manager/index.php` or `http://10.0.2.2:8080/index.php`

Authentication
- POST `/register` — body: `{ "name": "...", "email": "...", "password": "..." }`
- POST `/login` — body: `{ "email": "...", "password": "..." }` => returns `{ token, user }`

Tasks
- GET `/tasks?user_id={id}` — returns `{ data: [ ...tasks ] }`
- POST `/tasks` — body: `{ "user_id":..., "title":"...", "description":"...", "status":"..." }`
- PUT `/tasks/{id}` — body: `{ "title":"...", "description":"...", "status":"..." }`
- DELETE `/tasks/{id}` — delete task

Headers: include `Authorization: {token}` (tokens expire after 7 days)

cURL examples
```bash
# Login
curl -X POST -H "Content-Type: application/json" -d '{"email":"john@example.com","password":"pass"}' http://10.0.2.2/task_manager/index.php/login

# Fetch tasks
curl "http://10.0.2.2/task_manager/index.php/tasks?user_id=1" -H "Authorization: TOKEN"
```

---

## Database schema (MySQL)

Users
```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

Tasks
```sql
CREATE TABLE tasks (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  status ENUM('pending','in_progress','completed') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

Tokens
```sql
CREATE TABLE tokens (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  token VARCHAR(64) UNIQUE NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

`database.sql` file (already present) contains these statements.

---

## Postman collection

A simple Postman collection is included at `backend/postman_collection.json` with requests for register, login, fetch tasks, create task, update task, delete task.

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

## Notes & Troubleshooting
- If emulator can't reach `localhost`, use `10.0.2.2` for Android emulator.
- Ensure `BASE_URL` values in `src/redux/sagas/authSaga.js` and `src/redux/sagas/taskSaga.js` match the backend URL used.
- If you see CORS issues when serving from a different host/port, enable CORS or use the backend `index.php` to set `Access-Control-Allow-Origin: *` (development only).

---

## License
MIT
