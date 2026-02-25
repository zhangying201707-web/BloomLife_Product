// US-001: 场合选择
exports.getOccasions = async (req, res) => {
  try {
    const occasions = [
      { id: 1, name: '生日' },
      { id: 2, name: '情人节' },
      { id: 3, name: '母亲节' },
      { id: 4, name: '父亲节' },
      { id: 5, name: '结婚纪念日' },
      { id: 6, name: '毕业典礼' },
      { id: 7, name: '七夕' },
      { id: 8, name: '圣诞节' }
    ];
    res.json({ success: true, data: occasions });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// US-002: 按风格或心情筛选
exports.filterByStyle = async (req, res) => {
  try {
    const { style, mood } = req.query;
    
    const products = [
      { id: 1, name: '玫瑰鲜花束', style: '浪漫', mood: '爱情', price: 299, image: 'rose.jpg' },
      { id: 2, name: '向日葵花束', style: '阳光', mood: '快乐', price: 199, image: 'sunflower.jpg' },
      { id: 3, name: '百合花篮', style: '优雅', mood: '尊敬', price: 399, image: 'lily.jpg' },
      { id: 4, name: '混搭花束', style: '现代', mood: '惊喜', price: 259, image: 'mixed.jpg' },
      { id: 5, name: '郁金香', style: '简约', mood: '爱慕', price: 299, image: 'tulip.jpg' },
      { id: 6, name: '康乃馨', style: '温馨', mood: '感恩', price: 189, image: 'carnation.jpg' }
    ];
    
    let filtered = products;
    if (style) {
      filtered = filtered.filter(p => p.style === style);
    }
    if (mood) {
      filtered = filtered.filter(p => p.mood === mood);
    }
    
    res.json({ 
      success: true, 
      data: filtered,
      total: filtered.length 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// US-006: 价格明细显示
exports.getPricingBreakdown = async (req, res) => {
  try {
    const { productId } = req.params;
    
    const products = {
      1: { name: '玫瑰鲜花束', basePrice: 299 },
      2: { name: '向日葵花束', basePrice: 199 },
      3: { name: '百合花篮', basePrice: 399 },
      4: { name: '混搭花束', basePrice: 259 }
    };
    
    const product = products[productId] || products[1];
    const basePrice = product.basePrice;
    const tax = Math.round(basePrice * 0.1 * 10) / 10; // 10%税费
    const deliveryFee = 15;
    const packaging = 25;
    const total = basePrice + tax + deliveryFee + packaging;
    
    const pricing = {
      productId: parseInt(productId),
      productName: product.name,
      basePrice: basePrice,
      tax: tax,
      deliveryFee: deliveryFee,
      packaging: packaging,
      total: total,
      breakdown: [
        { item: '鲜花', price: basePrice - 49 },
        { item: '包装', price: 49 },
        { item: '税费 (10%)', price: tax },
        { item: '配送费', price: deliveryFee }
      ]
    };
    
    res.json({ success: true, data: pricing });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// US-007: 可用性和配送日期
exports.checkAvailability = async (req, res) => {
  try {
    const { productId, zipCode } = req.query;
    
    // 计算配送日期（当前日期+2天）
    const today = new Date();
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + 2);
    
    // 格式化日期为 YYYY-MM-DD
    const year = deliveryDate.getFullYear();
    const month = String(deliveryDate.getMonth() + 1).padStart(2, '0');
    const day = String(deliveryDate.getDate()).padStart(2, '0');
    
    // 根据邮政编码判断是否可配送（示例：只配送某些区域）
    const availableZips = ['100000', '200000', '300000', '400000', '510000'];
    const deliveryAvailable = availableZips.includes(zipCode?.substring(0, 3) + '000');
    
    const availability = {
      productId: parseInt(productId),
      inStock: true,
      stockCount: Math.floor(Math.random() * 50) + 10, // 10-60随机库存
      zipCode: zipCode || '未知',
      deliveryAvailable: deliveryAvailable,
      estimatedDelivery: `${year}-${month}-${day}`,
      deliveryDays: 2,
      cutOffTime: '18:00',
      nextDayDelivery: false
    };
    
    res.json({ success: true, data: availability });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// US-011: 问候卡信息
exports.saveGreetingCard = async (req, res) => {
  try {
    const { message, recipient, sender, cardType } = req.body;
    
    if (!message || !recipient) {
      return res.status(400).json({ 
        success: false, 
        error: '请填写留言和收卡人' 
      });
    }
    
    const card = {
      id: Date.now(),
      message: message,
      recipient: recipient,
      sender: sender || '匿名',
      cardType: cardType || 'standard',
      createdAt: new Date().toISOString(),
      preview: `致 ${recipient}：\n${message}\n\n—— ${sender || '匿名'} 敬上`,
      price: cardType === 'premium' ? 29 : 19
    };
    
    res.json({ success: true, data: card });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// US-012: 可选礼物
exports.addOptionalGift = async (req, res) => {
  try {
    const { productId, giftId } = req.body;
    
    const gifts = {
      1: { id: 1, name: '德芙巧克力', price: 88, image: 'chocolate.jpg', description: '丝滑巧克力礼盒' },
      2: { id: 2, name: '小熊玩偶', price: 129, image: 'bear.jpg', description: '可爱毛绒小熊' },
      3: { id: 3, name: '贺卡', price: 19, image: 'card.jpg', description: '精美手写贺卡' },
      4: { id: 4, name: '红酒', price: 199, image: 'wine.jpg', description: '进口红酒' },
      5: { id: 5, name: '香水小样', price: 59, image: 'perfume.jpg', description: '品牌香水小样套装' }
    };
    
    const products = {
      1: { name: '玫瑰鲜花束', price: 299 },
      2: { name: '向日葵花束', price: 199 }
    };
    
    const selectedGift = gifts[giftId];
    const product = products[productId] || products[1];
    
    if (!selectedGift) {
      return res.status(400).json({ success: false, error: '礼物不存在' });
    }
    
    const result = {
      productId: parseInt(productId),
      productName: product.name,
      addedGift: selectedGift,
      subtotal: product.price,
      giftPrice: selectedGift.price,
      newTotal: product.price + selectedGift.price,
      message: `成功添加 ${selectedGift.name} 到订单`
    };
    
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// US-016: 管理购物车
exports.manageCart = async (req, res) => {
  try {
    const { action, productId, quantity, product } = req.body;
    
    // 模拟购物车数据（实际应该从session或数据库获取）
    let cart = {
      items: [
        { productId: 1, name: '玫瑰鲜花束', quantity: 1, price: 299, image: 'rose.jpg' },
        { productId: 2, name: '巧克力', quantity: 1, price: 88, image: 'chocolate.jpg' }
      ],
      total: 387,
      itemCount: 2
    };
    
    switch(action) {
      case 'add':
        if (product) {
          cart.items.push({
            productId: product.id || Date.now(),
            name: product.name || '新商品',
            quantity: quantity || 1,
            price: product.price || 0
          });
        }
        break;
      case 'remove':
        cart.items = cart.items.filter(item => item.productId !== productId);
        break;
      case 'update':
        cart.items = cart.items.map(item => {
          if (item.productId === productId) {
            item.quantity = quantity;
          }
          return item;
        });
        break;
      case 'clear':
        cart.items = [];
        break;
    }
    
    // 重新计算总价
    cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cart.itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    
    res.json({ 
      success: true, 
      data: cart,
      message: action === 'add' ? '商品已添加到购物车' : '购物车已更新'
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// US-017: 输入配送详情
exports.saveDeliveryDetails = async (req, res) => {
  try {
    const { 
      recipient, 
      phone, 
      province, 
      city, 
      district, 
      address, 
      zipCode,
      deliveryDate,
      deliveryTime,
      remarks 
    } = req.body;
    
    // 简单验证
    if (!recipient || !phone || !address) {
      return res.status(400).json({ 
        success: false, 
        error: '请填写收件人、电话和详细地址' 
      });
    }
    
    // 手机号简单验证
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      return res.status(400).json({ 
        success: false, 
        error: '手机号格式不正确' 
      });
    }
    
    const deliveryInfo = {
      id: Date.now(),
      recipient: recipient,
      phone: phone,
      province: province || '北京市',
      city: city || '北京市',
      district: district || '朝阳区',
      address: address,
      zipCode: zipCode || '100000',
      fullAddress: `${province || '北京市'}${city || '北京市'}${district || '朝阳区'}${address}`,
      deliveryDate: deliveryDate || '2026-03-01',
      deliveryTime: deliveryTime || '09:00-12:00',
      remarks: remarks || '',
      savedAt: new Date().toISOString(),
      verified: true
    };
    
    res.json({ 
      success: true, 
      data: deliveryInfo,
      message: '配送信息保存成功' 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// US-021: 追踪订单状态
exports.trackOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    
    // 模拟订单状态
    const statuses = ['已付款', '配货中', '已发货', '派送中', '已签收'];
    const currentIndex = Math.floor(Math.random() * 3) + 1; // 随机状态 1-3
    
    const status = {
      orderId: orderId,
      orderNumber: `BL${orderId}${Date.now().toString().slice(-6)}`,
      currentStatus: statuses[currentIndex],
      statusHistory: [
        { status: '订单已创建', time: '2026-02-25 10:30:00', completed: true, description: '您的订单已提交成功' },
        { status: '已付款', time: '2026-02-25 10:35:00', completed: currentIndex >= 0, description: '支付成功' },
        { status: '配货中', time: currentIndex >= 1 ? '2026-02-25 14:20:00' : null, completed: currentIndex >= 1, description: '正在准备您的商品' },
        { status: '已发货', time: currentIndex >= 2 ? '2026-02-26 09:00:00' : null, completed: currentIndex >= 2, description: '订单已发出' },
        { status: '派送中', time: currentIndex >= 3 ? '2026-02-26 14:30:00' : null, completed: currentIndex >= 3, description: '快递员正在派送' },
        { status: '已签收', time: currentIndex >= 4 ? '2026-02-26 16:45:00' : null, completed: currentIndex >= 4, description: '订单已完成' }
      ],
      estimatedDelivery: '2026-02-27',
      courier: '顺丰速运',
      trackingNumber: 'SF' + orderId + '123456',
      courierPhone: '95338',
      currentLocation: currentIndex >= 2 ? '北京市中转中心' : '商家仓库'
    };
    
    res.json({ success: true, data: status });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// US-022: 订单通知
exports.getNotifications = async (req, res) => {
  try {
    const { userId } = req.params;
    const { unreadOnly } = req.query;
    
    const notifications = [
      {
        id: 1,
        type: 'order_confirmed',
        title: '订单确认成功',
        message: '您的订单 #BL2026022512345 已确认成功',
        read: false,
        time: '2026-02-25T10:35:00Z',
        actionUrl: '/orders/12345'
      },
      {
        id: 2,
        type: 'order_shipped',
        title: '订单已发货',
        message: '您的订单 #BL2026022512345 已通过顺丰速运发出',
        read: true,
        time: '2026-02-26T09:00:00Z',
        actionUrl: '/orders/12345/track'
      },
      {
        id: 3,
        type: 'delivery_reminder',
        title: '配送提醒',
        message: '您的订单预计明天送达，请保持电话畅通',
        read: false,
        time: '2026-02-26T18:00:00Z',
        actionUrl: '/orders/12345'
      },
      {
        id: 4,
        type: 'promotion',
        title: '情人节特惠',
        message: '满299减30，限时优惠',
        read: false,
        time: '2026-02-25T09:00:00Z',
        actionUrl: '/promotions'
      },
      {
        id: 5,
        type: 'payment_success',
        title: '支付成功',
        message: '您已成功支付 ¥387.00',
        read: true,
        time: '2026-02-25T10:35:00Z'
      }
    ];
    
    let filtered = notifications;
    if (unreadOnly === 'true') {
      filtered = notifications.filter(n => !n.read);
    }
    
    // 按时间倒序
    filtered.sort((a, b) => new Date(b.time) - new Date(a.time));
    
    res.json({ 
      success: true, 
      data: filtered,
      total: filtered.length,
      unreadCount: notifications.filter(n => !n.read).length
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};