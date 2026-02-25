const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { User } = require('../models/userModel');

router.post('/', userController.createUser);
router.get('/', userController.getUsers);

router.delete('/:id', async (req, res) => {
  try {
    await User.destroy({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    await User.update(req.body, { where: { id: req.params.id } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
