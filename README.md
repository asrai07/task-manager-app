# Task Manager App

This repository contains a React Native frontend (in `src/`) and a simple PHP backend API (can be served from XAMPP or copied into the project `backend/` directory).

---

## What to submit
- GitHub repository link (replace the `Repository` line above).
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
- DELETE `/tasks/{id}` — delete

Headers: include `Authorization: Bearer {token}` (frontend currently reads token and sets header in sagas)

cURL examples
```bash
# Login
curl -X POST -H "Content-Type: application/json" -d '{"email":"john@example.com","password":"pass"}' http://10.0.2.2/task_manager/index.php/login

# Fetch tasks
curl "http://10.0.2.2/task_manager/index.php/tasks?user_id=1" -H "Authorization: Bearer TOKEN"
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
  status ENUM('pending','in_progress','Completed') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

`database.sql` file (already present) contains these statements.

---

## Postman collection

A simple Postman collection is included at `backend/postman_collection.json` with requests for register, login, fetch tasks, create task, update task, delete task.

---

## Notes & Troubleshooting
- If emulator can't reach `localhost`, use `10.0.2.2` for Android emulator.
- Ensure `BASE_URL` values in `src/redux/sagas/authSaga.js` and `src/redux/sagas/taskSaga.js` match the backend URL used.
- If you see CORS issues when serving from a different host/port, enable CORS or use the backend `index.php` to set `Access-Control-Allow-Origin: *` (development only).

---

## License
MIT
