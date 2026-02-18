# MedWise — Spotting Medical Misinformation

An educational web application that teaches users how to identify AI-generated or misleading medical information through quizzes, videos, articles, and progress tracking.

## Project Structure

```
MedWise/
├── backend/            # Node.js + Express API server
│   ├── routes/
│   │   └── content.js  # Content progress API (the "one working button")
│   ├── db.js           # PostgreSQL connection pool
│   ├── server.js       # Express entry point
│   └── .env            # DB credentials (not committed)
├── db/                 # Database scripts
│   ├── schema.sql      # Creates all 8 tables
│   └── seed.sql        # Populates with sample data
├── css/styles.css      # Stylesheet
├── js/
│   ├── main.js         # Nav, mobile menu, scroll animations
│   ├── progress.js     # LocalStorage progress tracker
│   └── quiz.js         # Quiz logic
├── index.html          # Home page
├── quiz.html           # Quiz flow
├── content.html        # Learning library (has the working button)
├── about.html          # About page
├── account.html        # Progress dashboard
├── signin.html         # Sign in
├── register.html       # Register
└── reset-password.html # Password reset
```

## Database (8 Tables)

| Table                    | Purpose                                 |
|--------------------------|-----------------------------------------|
| `users`                  | User accounts                           |
| `content`                | Learning library items                  |
| `quizzes`                | Quiz definitions                        |
| `quiz_questions`         | Questions belonging to each quiz        |
| `quiz_attempts`          | Records every quiz a user has taken     |
| `user_content_progress`  | Tracks which content each user completed|
| `milestones`             | Achievement definitions                 |
| `user_milestones`        | Which milestones each user has earned   |

## Setup Instructions

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [PostgreSQL](https://www.postgresql.org/) 14+

### 1. Create the database

Open a terminal and run:

```bash
psql -U postgres -c "CREATE DATABASE medwise;"
psql -U postgres -d medwise -f db/schema.sql
psql -U postgres -d medwise -f db/seed.sql
```

### 2. Configure the backend

Copy or edit `backend/.env` with your PostgreSQL credentials:

```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password_here
DB_NAME=medwise
PORT=3000
```

### 3. Install dependencies and start the server

```bash
cd backend
npm install
npm start
```

The server starts at **http://localhost:3000**. It also serves the frontend static files, so you can open that URL in a browser to use the full app.

### 4. Verify the database connection

Visit **http://localhost:3000/api/health** — you should see:

```json
{ "status": "ok", "time": "2026-..." }
```

## One Working Button

The **"Mark as Done"** button on the **Learn** page (`content.html`) is wired to the database:

1. User clicks "Mark as Done" on any content card
2. Frontend sends `POST /api/content/complete` with `{ userId, contentId }`
3. Backend runs `INSERT ... ON CONFLICT DO UPDATE` on `user_content_progress`
4. Backend returns the updated row
5. Frontend updates the button to show "Completed" with a green checkmark

**API endpoint:** `POST /api/content/complete`

```json
// Request
{ "userId": 1, "contentId": "vid-ai-fake" }

// Response
{
  "message": "Content marked as completed",
  "progress": {
    "id": 7,
    "user_id": 1,
    "content_id": "vid-ai-fake",
    "completed": true,
    "viewed_at": "2026-02-18T..."
  }
}
```

If the backend server is not running, the button gracefully falls back to localStorage-only tracking.
