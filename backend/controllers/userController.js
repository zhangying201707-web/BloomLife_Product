const { User } = require('../models/userModel');

// create users
async function createUser(req, res) {
  const { username, email } = req.body;
  try {
    const user = await User.create({ username, email });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// search users
async function getUsers(req, res) {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json([]);
  }
}

module.exports = { createUser, getUsers };
