const express = require('express');
const router = express.Router();


// GET接口
router.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from backend GET!' });
});

// POST接口
router.post('/api/message', (req, res) => {
  const { name } = req.body;
  res.json({ message: `Hello, ${name || 'guest'}! (from backend POST)` });
});

module.exports = router;
