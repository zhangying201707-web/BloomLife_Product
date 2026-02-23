const { User } = require('../models/userModel');

// 创建用户
async function createUser(req, res) {
  const { username, email } = req.body;
  try {
    const user = await User.create({ username, email });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// 查询所有用户
async function getUsers(req, res) {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json([]);
  }
}

module.exports = { createUser, getUsers };
