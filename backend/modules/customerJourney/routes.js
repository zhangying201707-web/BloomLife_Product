const express = require('express');
const controller = require('./controller');

const router = express.Router();

router.get('/occasions', controller.getOccasions);
router.get('/products/filter', controller.filterProducts);
router.get('/products/:productId/pricing', controller.getPricingBreakdown);
router.get('/availability', controller.checkAvailability);
router.post('/greeting-card', controller.saveGreetingCard);
router.post('/add-gift', controller.addOptionalGift);
router.post('/cart/manage', controller.manageCart);
router.post('/delivery-details', controller.saveDeliveryDetails);
router.get('/orders/:orderId/track', controller.trackOrder);
router.get('/notifications/:userId', controller.getNotifications);

module.exports = router;
