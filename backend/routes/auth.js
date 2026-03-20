const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { User } = require('../models/userModel');

const DEMO_ADMIN = {
  username: 'demo_admin',
  email: 'demo_admin@bloomlife.local',
  password: 'Admin123456',
  role: 'admin',
};

async function ensureDemoAdmin() {
  const existing = await User.findOne({ where: { username: DEMO_ADMIN.username } });
  if (existing) {
    if (existing.role !== 'admin') {
      existing.role = 'admin';
      await existing.save();
    }
    return existing;
  }

  const hash = await bcrypt.hash(DEMO_ADMIN.password, 10);
  return User.create({
    username: DEMO_ADMIN.username,
    email: DEMO_ADMIN.email,
    password: hash,
    role: DEMO_ADMIN.role,
  });
}

// Register
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    const exist = await User.findOne({ where: { username } });
    if (exist) return res.status(400).json({ error: 'Username already exists' });
    const emailExist = await User.findOne({ where: { email } });
    if (emailExist) return res.status(400).json({ error: 'Email already exists' });
    const hash = await bcrypt.hash(password, 10);
    await User.create({ username, email, password: hash, role: 'customer' });
    res.json({ success: true, username });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(400).json({ error: 'User not found' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: 'Incorrect password' });
    res.json({ success: true, username: user.username, userId: user.id, role: user.role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/admin-login', async (_req, res) => {
  try {
    const admin = await ensureDemoAdmin();
    res.json({
      success: true,
      username: admin.username,
      userId: admin.id,
      role: admin.role,
      demoCredentials: {
        username: DEMO_ADMIN.username,
        password: DEMO_ADMIN.password,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = { router, ensureDemoAdmin, DEMO_ADMIN };
