const express = require('express');
const controller = require('./controller');

const router = express.Router();

router.get('/occasions', controller.getOccasions);
router.get('/products/filter', controller.filterProducts);
router.get('/products/trending', controller.getTrendingArrangements);
router.get('/products/compare', controller.compareProducts);
router.get('/products/:productId/details', controller.getProductDetails);
router.get('/products/:productId/reviews', controller.getProductReviews);
router.get('/products/:productId/gallery', controller.getProductGallery);
router.get('/products/:productId/wrapping', controller.getWrappingOptions);
router.get('/products/:productId/pricing', controller.getPricingBreakdown);
router.get('/availability', controller.checkAvailability);
router.post('/greeting-card', controller.saveGreetingCard);
router.post('/messages/favorites', controller.saveFavoriteMessage);
router.get('/messages/favorites/:userId', controller.getFavoriteMessages);
router.post('/add-gift', controller.addOptionalGift);
router.post('/cart/manage', controller.manageCart);
router.post('/delivery-details', controller.saveDeliveryDetails);
router.post('/promo/apply', controller.applyPromoCode);
router.get('/payment-methods', controller.getPaymentMethods);
router.post('/subscriptions', controller.subscribeMonthlyBox);
router.get('/support/options', controller.getSupportOptions);
router.get('/orders/:orderId/track', controller.trackOrder);
router.get('/notifications/:userId', controller.getNotifications);
router.get('/admin/products', controller.listAdminProducts);
router.post('/admin/products', controller.createAdminProduct);
router.patch('/admin/products/:productId', controller.updateAdminProduct);
router.get('/admin/orders', controller.listAdminOrders);
router.patch('/admin/orders/:orderId/status', controller.updateOrderStatus);

module.exports = router;
