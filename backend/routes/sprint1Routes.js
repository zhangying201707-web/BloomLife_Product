const express = require('express');
const router = express.Router();
const sprint1Controller = require('../controllers/sprint1Controller');

// US-001: Get all occasions
router.get('/occasions', sprint1Controller.getOccasions);

// US-002: Filter products by style/mood
router.get('/products/filter', sprint1Controller.filterByStyle);

// US-006: Get product pricing breakdown
router.get('/products/:productId/pricing', sprint1Controller.getPricingBreakdown);

// US-007: Check stock and delivery date
router.get('/availability', sprint1Controller.checkAvailability);

// US-011: Save greeting card information
router.post('/greeting-card', sprint1Controller.saveGreetingCard);

// US-012: Add optional gift
router.post('/add-gift', sprint1Controller.addOptionalGift);

// US-016: Manage shopping cart
router.post('/cart', sprint1Controller.manageCart);
// You can also use different action parameters
router.put('/cart', sprint1Controller.manageCart);
router.delete('/cart/:productId', (req, res) => {
  req.body.action = 'remove';
  req.body.productId = parseInt(req.params.productId);
  sprint1Controller.manageCart(req, res);
});

// US-017: Save delivery details
router.post('/delivery-details', sprint1Controller.saveDeliveryDetails);

// US-021: Track order status
router.get('/orders/:orderId/track', sprint1Controller.trackOrder);

// US-022: Get user notifications
router.get('/notifications/:userId', sprint1Controller.getNotifications);

module.exports = router;
