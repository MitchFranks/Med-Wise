-- ============================================
--  MedWise — Database Schema
--  PostgreSQL 14+
--  Run:  psql -U postgres -f schema.sql
-- ============================================

-- Create database (run this line separately if needed)
-- CREATE DATABASE medwise;

-- Connect to the database
-- \c medwise;

-- Drop tables in reverse dependency order for clean re-runs
DROP TABLE IF EXISTS user_milestones  CASCADE;
DROP TABLE IF EXISTS milestones        CASCADE;
DROP TABLE IF EXISTS user_content_progress CASCADE;
DROP TABLE IF EXISTS quiz_attempts     CASCADE;
DROP TABLE IF EXISTS quiz_questions    CASCADE;
DROP TABLE IF EXISTS quizzes           CASCADE;
DROP TABLE IF EXISTS content           CASCADE;
DROP TABLE IF EXISTS users             CASCADE;

-- ============================================
-- 1. users
-- ============================================
CREATE TABLE users (
    id             SERIAL PRIMARY KEY,
    first_name     VARCHAR(100)  NOT NULL,
    last_name      VARCHAR(100)  NOT NULL,
    email          VARCHAR(255)  UNIQUE NOT NULL,
    password_hash  VARCHAR(255)  NOT NULL,
    created_at     TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 2. content — learning library items
-- ============================================
CREATE TABLE content (
    id          VARCHAR(50)   PRIMARY KEY,
    title       VARCHAR(255)  NOT NULL,
    description TEXT,
    type        VARCHAR(50)   NOT NULL
                CHECK (type IN ('video','article','guide','infographic')),
    duration    VARCHAR(50),
    created_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 3. quizzes — quiz definitions
-- ============================================
CREATE TABLE quizzes (
    id          SERIAL PRIMARY KEY,
    title       VARCHAR(255) NOT NULL,
    description TEXT,
    created_at  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 4. quiz_questions — questions per quiz
-- ============================================
CREATE TABLE quiz_questions (
    id              SERIAL PRIMARY KEY,
    quiz_id         INTEGER   NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
    question_text   TEXT      NOT NULL,
    correct_answer  VARCHAR(10) NOT NULL,
    explanation     TEXT,
    sort_order      INTEGER   DEFAULT 0
);

CREATE INDEX idx_quiz_questions_quiz ON quiz_questions(quiz_id);

-- ============================================
-- 5. quiz_attempts — records every quiz taken
-- ============================================
CREATE TABLE quiz_attempts (
    id               SERIAL PRIMARY KEY,
    user_id          INTEGER   NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    quiz_id          INTEGER   REFERENCES quizzes(id) ON DELETE SET NULL,
    score            INTEGER   NOT NULL,
    total_questions  INTEGER   NOT NULL,
    completed_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_quiz_attempts_user ON quiz_attempts(user_id);

-- ============================================
-- 6. user_content_progress — per-user completion
-- ============================================
CREATE TABLE user_content_progress (
    id          SERIAL PRIMARY KEY,
    user_id     INTEGER     NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    content_id  VARCHAR(50) NOT NULL REFERENCES content(id) ON DELETE CASCADE,
    completed   BOOLEAN     DEFAULT TRUE,
    viewed_at   TIMESTAMP   DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, content_id)
);

CREATE INDEX idx_ucp_user ON user_content_progress(user_id);

-- ============================================
-- 7. milestones — achievement definitions
-- ============================================
CREATE TABLE milestones (
    id          SERIAL PRIMARY KEY,
    key         VARCHAR(50)  UNIQUE NOT NULL,
    label       VARCHAR(100) NOT NULL,
    description TEXT,
    icon        VARCHAR(50)
);

-- ============================================
-- 8. user_milestones — earned achievements
-- ============================================
CREATE TABLE user_milestones (
    id            SERIAL PRIMARY KEY,
    user_id       INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    milestone_id  INTEGER NOT NULL REFERENCES milestones(id) ON DELETE CASCADE,
    earned_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, milestone_id)
);

CREATE INDEX idx_user_milestones_user ON user_milestones(user_id);
