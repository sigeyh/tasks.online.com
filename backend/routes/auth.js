const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const DB_PATH = path.join(__dirname, '../data/users.json');

// Ensure data dir and file exist
const ensureDB = () => {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DB_PATH)) fs.writeFileSync(DB_PATH, JSON.stringify([]));
};

const readUsers = () => {
  ensureDB();
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
};

const writeUsers = (users) => {
  ensureDB();
  fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2));
};

const makeToken = (id) => crypto.createHash('sha256').update(`${id}-secret-key`).digest('hex');

// POST /api/auth/register
router.post('/register', (req, res) => {
  const { phone, fullName, idNumber, county, country, gender } = req.body;

  if (!phone || !fullName || !idNumber || !county || !country || !gender) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const users = readUsers();

  const existing = users.find(u => u.phone === phone);
  if (existing) {
    return res.status(409).json({ error: 'An account with this phone number already exists. Please sign in.' });
  }

  const existingId = users.find(u => u.idNumber === idNumber);
  if (existingId) {
    return res.status(409).json({ error: 'An account with this ID number already exists.' });
  }

  const newUser = {
    id: Date.now(),
    phone,
    fullName,
    idNumber,
    county,
    country,
    gender,
    tier: 'Free',
    dailyLimit: 5,
    completedToday: 0,
    balance: 0,
    registeredAt: new Date().toISOString()
  };

  users.push(newUser);
  writeUsers(users);

  const { idNumber: _id, ...safeUser } = newUser;
  res.json({ token: makeToken(newUser.id), user: safeUser });
});

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ error: 'Phone number is required' });

  const users = readUsers();
  const user = users.find(u => u.phone === phone);

  if (!user) {
    return res.status(404).json({ error: 'No account found with this phone. Please register first.' });
  }

  const { idNumber: _id, ...safeUser } = user;
  res.json({ token: makeToken(user.id), user: safeUser });
});

// GET /api/auth/me  (verify token & return user)
router.get('/me', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Unauthorized' });

  const users = readUsers();
  // Match token to user
  const user = users.find(u => makeToken(u.id) === authHeader.replace('Bearer ', ''));
  if (!user) return res.status(401).json({ error: 'Invalid token' });

  const { idNumber: _id, ...safeUser } = user;
  res.json({ user: safeUser });
});

module.exports = router;
