const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/', userController.createUser);
router.get('/', userController.getUsers);
// 删除用户
router.delete('/:id', async (req, res) => {
  try {
    const { User } = require('../models/userModel');
    await User.destroy({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// 更新用户
router.put('/:id', async (req, res) => {
  try {
    const { User } = require('../models/userModel');
    await User.update(req.body, { where: { id: req.params.id } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
