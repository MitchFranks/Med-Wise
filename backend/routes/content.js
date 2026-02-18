const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/content — list all content items
router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT id, title, description, type, duration FROM content ORDER BY created_at'
    );
    res.json(rows);
  } catch (err) {
    console.error('GET /api/content error:', err.message);
    res.status(500).json({ error: 'Failed to fetch content' });
  }
});

// GET /api/content/progress/:userId — all progress for a user
router.get('/progress/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { rows } = await pool.query(
      `SELECT ucp.content_id, ucp.completed, ucp.viewed_at
       FROM user_content_progress ucp
       WHERE ucp.user_id = $1`,
      [userId]
    );
    res.json(rows);
  } catch (err) {
    console.error('GET /api/content/progress error:', err.message);
    res.status(500).json({ error: 'Failed to fetch progress' });
  }
});

// POST /api/content/complete — mark a content item as done
// Body: { userId: number, contentId: string }
// This is the "One Working Button" endpoint.
router.post('/complete', async (req, res) => {
  try {
    const { userId, contentId } = req.body;

    if (!userId || !contentId) {
      return res.status(400).json({ error: 'userId and contentId are required' });
    }

    const { rows } = await pool.query(
      `INSERT INTO user_content_progress (user_id, content_id, completed, viewed_at)
       VALUES ($1, $2, true, NOW())
       ON CONFLICT (user_id, content_id)
       DO UPDATE SET completed = true, viewed_at = NOW()
       RETURNING *`,
      [userId, contentId]
    );

    res.json({
      message: 'Content marked as completed',
      progress: rows[0]
    });
  } catch (err) {
    console.error('POST /api/content/complete error:', err.message);
    res.status(500).json({ error: 'Failed to update progress' });
  }
});

module.exports = router;
