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
const { router: authRouter, ensureDemoAdmin } = require('./routes/auth');
const productRouter = require('./routes/products');
const orderRouter = require('./routes/orders');
const customerJourneyRouter = require('./modules/customerJourney/routes');

app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.use('/api/customer-journey', customerJourneyRouter);

app.get('/', (req, res) => {
  res.json({
    message: 'BloomLife API',
    modules: {
      core: ['/api/users', '/api/auth', '/api/products', '/api/orders'],
      customerJourney: [
        '/api/customer-journey/occasions',
        '/api/customer-journey/products/filter',
        '/api/customer-journey/products/trending',
        '/api/customer-journey/products/compare',
        '/api/customer-journey/products/:id/pricing',
        '/api/customer-journey/products/:id/details',
        '/api/customer-journey/products/:id/reviews',
        '/api/customer-journey/products/:id/gallery',
        '/api/customer-journey/products/:id/wrapping',
        '/api/customer-journey/availability',
        '/api/customer-journey/greeting-card',
        '/api/customer-journey/messages/favorites',
        '/api/customer-journey/add-gift',
        '/api/customer-journey/cart/manage',
        '/api/customer-journey/delivery-details',
        '/api/customer-journey/promo/apply',
        '/api/customer-journey/payment-methods',
        '/api/customer-journey/subscriptions',
        '/api/customer-journey/support/options',
        '/api/customer-journey/orders/:id/track',
        '/api/customer-journey/notifications/:userId',
        '/api/customer-journey/admin/products',
        '/api/customer-journey/admin/orders',
      ],
    },
  });
});

app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  try {
    await sequelize.sync({ alter: true });
    await ensureDemoAdmin();
    console.log('Database sync completed');
  } catch (err) {
    console.error('Database sync failed:', err.message);
  }
});
