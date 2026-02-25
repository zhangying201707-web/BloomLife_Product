const express = require('express');
const router = express.Router();
const sprint1Controller = require('../controllers/sprint1Controller');

// US-001: 获取所有场合
router.get('/occasions', sprint1Controller.getOccasions);

// US-002: 按风格心情筛选产品
router.get('/products/filter', sprint1Controller.filterByStyle);

// US-006: 获取产品价格明细
router.get('/products/:productId/pricing', sprint1Controller.getPricingBreakdown);

// US-007: 检查库存和配送日期
router.get('/availability', sprint1Controller.checkAvailability);

// US-011: 保存问候卡信息
router.post('/greeting-card', sprint1Controller.saveGreetingCard);

// US-012: 添加可选礼物
router.post('/add-gift', sprint1Controller.addOptionalGift);

// US-016: 管理购物车
router.post('/cart', sprint1Controller.manageCart);
// 也可以用不同的action参数
router.put('/cart', sprint1Controller.manageCart);
router.delete('/cart/:productId', (req, res) => {
  req.body.action = 'remove';
  req.body.productId = parseInt(req.params.productId);
  sprint1Controller.manageCart(req, res);
});

// US-017: 保存配送信息
router.post('/delivery-details', sprint1Controller.saveDeliveryDetails);

// US-021: 追踪订单状态
router.get('/orders/:orderId/track', sprint1Controller.trackOrder);

// US-022: 获取用户通知
router.get('/notifications/:userId', sprint1Controller.getNotifications);

module.exports = router;