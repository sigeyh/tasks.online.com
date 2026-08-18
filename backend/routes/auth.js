const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const connectDB = require('../db');
const User = require('../models/User');

const makeToken = (id) => crypto.createHash('sha256').update(`${id}-secret-key`).digest('hex');

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    await connectDB();
    const { phone, fullName, idNumber, county, country, gender } = req.body;

    if (!phone || !fullName || !idNumber || !county || !country || !gender) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existing = await User.findOne({ $or: [{ phone }, { idNumber }] });
    if (existing) {
      if (existing.phone === phone) {
        return res.status(409).json({ error: 'An account with this phone number already exists. Please sign in.' });
      }
      return res.status(409).json({ error: 'An account with this ID number already exists.' });
    }

    const user = await User.create({ phone, fullName, idNumber, county, country, gender });

    const safeUser = {
      id: user._id,
      phone: user.phone,
      fullName: user.fullName,
      county: user.county,
      country: user.country,
      gender: user.gender,
      tier: user.tier,
      dailyLimit: user.dailyLimit,
      completedToday: user.completedToday,
      balance: user.balance,
      registeredAt: user.registeredAt,
    };

    res.json({ token: makeToken(user._id), user: safeUser });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Registration failed. Please try again.' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    await connectDB();
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ error: 'Phone number is required' });

    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({ error: 'No account found with this phone. Please register first.' });
    }

    const safeUser = {
      id: user._id,
      phone: user.phone,
      fullName: user.fullName,
      county: user.county,
      country: user.country,
      gender: user.gender,
      tier: user.tier,
      dailyLimit: user.dailyLimit,
      completedToday: user.completedToday,
      balance: user.balance,
      registeredAt: user.registeredAt,
    };

    res.json({ token: makeToken(user._id), user: safeUser });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Login failed. Please try again.' });
  }
});

// GET /api/auth/me
router.get('/me', async (req, res) => {
  try {
    await connectDB();
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Unauthorized' });

    const token = authHeader.replace('Bearer ', '');
    const users = await User.find({});
    const user = users.find(u => makeToken(u._id) === token);
    if (!user) return res.status(401).json({ error: 'Invalid token' });

    res.json({
      user: {
        id: user._id,
        phone: user.phone,
        fullName: user.fullName,
        county: user.county,
        country: user.country,
        gender: user.gender,
        tier: user.tier,
        dailyLimit: user.dailyLimit,
        completedToday: user.completedToday,
        balance: user.balance,
        registeredAt: user.registeredAt,
      }
    });
  } catch (err) {
    console.error('Me error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
