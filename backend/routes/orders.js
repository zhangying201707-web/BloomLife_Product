const express = require('express');
const { User } = require('../models/userModel');
const { Order } = require('../models/orderModel');

const router = express.Router();

router.post('/', async (req, res) => {
  const { username, items, deliveryAddress, note } = req.body;
  if (!username || !Array.isArray(items) || items.length === 0 || !deliveryAddress) {
    return res.status(400).json({ error: 'Incomplete order information' });
  }

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const totalAmount = items.reduce((sum, item) => {
      const price = Number(item.price) || 0;
      const quantity = Number(item.quantity) || 1;
      return sum + price * quantity;
    }, 0);

    const order = await Order.create({
      userId: user.id,
      customerName: username,
      items,
      totalAmount,
      deliveryAddress,
      note: note || '',
      status: 'confirmed',
    });

    res.status(201).json({
      success: true,
      orderId: order.id,
      totalAmount,
      status: order.status,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const { username } = req.query;
    if (!username) {
      return res.status(400).json({ error: 'Missing username' });
    }

    const user = await User.findOne({ where: { username } });
    if (!user) return res.json([]);

    const orders = await Order.findAll({
      where: { userId: user.id },
      order: [['createdAt', 'DESC']],
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
