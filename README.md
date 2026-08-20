# Employee Salary MERN Project

## Requirements
- Node.js
- MongoDB Community Server running locally, or a MongoDB Atlas connection string
- VS Code

## Backend

```bash
cd backend
npm install
```

Copy `.env.example` to `.env` and set:

```env
MONGO_URI=mongodb://127.0.0.1:27017/employee_salary
JWT_SECRET=change_this_to_a_long_random_secret
PORT=5000
```

Start:

```bash
npm run dev
```

Backend:
http://localhost:5000/

## Frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend:
http://localhost:5173/

## Features

- Signup with email, password and salary
- bcrypt password hashing
- Login
- JWT authentication
- Employee dashboard
- Employee list
- Logout
- Responsive CSS

## Important

Never commit `.env` or real secrets to GitHub. Do not display or store plain-text passwords.