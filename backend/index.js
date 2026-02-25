const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3000;

const { sequelize } = require('./models/userModel');
require('./models/productModel');
require('./models/orderModel');

const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const productRouter = require('./routes/products');
const orderRouter = require('./routes/orders');

// ===== 添加 Sprint 1 路由 =====
const sprint1Router = require('./routes/sprint1Routes');

app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);

// ===== 添加 Sprint 1 API 前缀 =====
app.use('/api', sprint1Router);  // 这样 /api/occasions 等就可以访问了

// 根路由测试
app.get('/', (req, res) => {
  res.json({ 
    message: 'BloomLife API - Sprint 1',
    sprint1_endpoints: [
      '/api/occasions',
      '/api/products/filter?style=浪漫&mood=爱情',
      '/api/products/:id/pricing',
      '/api/availability?productId=1&zipCode=100000',
      '/api/greeting-card (POST)',
      '/api/add-gift (POST)',
      '/api/cart (POST)',
      '/api/delivery-details (POST)',
      '/api/orders/:id/track',
      '/api/notifications/:userId'
    ],
    existing_endpoints: [
      '/api/users',
      '/api/auth',
      '/api/products',
      '/api/orders'
    ]
  });
});

app.listen(PORT, async () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  try {
    await sequelize.sync({ alter: true });
    console.log('✅ Database sync completed');
  } catch (err) {
    console.error('❌ Database sync failed:', err.message);
  }
});