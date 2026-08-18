const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ error: 'Phone is required' });
  
  res.json({
    token: 'mock-jwt-token-12345',
    user: {
      id: 1,
      phone,
      tier: 'Free',
      dailyLimit: 5,
      completedToday: 0
    }
  });
});

module.exports = router;
