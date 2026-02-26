exports.getOccasions = async (req, res) => {
  try {
    const occasions = [
      { id: 1, name: 'Birthday' },
      { id: 2, name: "Valentine's Day" },
      { id: 3, name: "Mother's Day" },
      { id: 4, name: "Father's Day" },
      { id: 5, name: 'Wedding Anniversary' },
      { id: 6, name: 'Graduation' },
      { id: 7, name: 'Chinese Valentine' },
      { id: 8, name: 'Christmas' }
    ];
    res.json({ success: true, data: occasions });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.filterByStyle = async (req, res) => {
  try {
    const { style, mood } = req.query;
    
    const products = [
      { id: 1, name: 'Rose Bouquet', style: 'Romantic', mood: 'Love', price: 299, image: 'rose.jpg' },
      { id: 2, name: 'Sunflower Bouquet', style: 'Sunny', mood: 'Happy', price: 199, image: 'sunflower.jpg' },
      { id: 3, name: 'Lily Basket', style: 'Elegant', mood: 'Respect', price: 399, image: 'lily.jpg' },
      { id: 4, name: 'Mixed Bouquet', style: 'Modern', mood: 'Surprise', price: 259, image: 'mixed.jpg' },
      { id: 5, name: 'Tulip', style: 'Simple', mood: 'Admiration', price: 299, image: 'tulip.jpg' },
      { id: 6, name: 'Carnation', style: 'Warm', mood: 'Gratitude', price: 189, image: 'carnation.jpg' }
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

exports.getPricingBreakdown = async (req, res) => {
  try {
    const { productId } = req.params;
    
    const products = {
      1: { name: 'Rose Bouquet', basePrice: 299 },
      2: { name: 'Sunflower Bouquet', basePrice: 199 },
      3: { name: 'Lily Basket', basePrice: 399 },
      4: { name: 'Mixed Bouquet', basePrice: 259 }
    };
    
    const product = products[productId] || products[1];
    const basePrice = product.basePrice;
    const tax = Math.round(basePrice * 0.1 * 10) / 10;
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
        { item: 'Flowers', price: basePrice - 49 },
        { item: 'Packaging', price: 49 },
        { item: 'Tax (10%)', price: tax },
        { item: 'Delivery', price: deliveryFee }
      ]
    };
    
    res.json({ success: true, data: pricing });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.checkAvailability = async (req, res) => {
  try {
    const { productId, zipCode } = req.query;
    
    const today = new Date();
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + 2);
    
    const year = deliveryDate.getFullYear();
    const month = String(deliveryDate.getMonth() + 1).padStart(2, '0');
    const day = String(deliveryDate.getDate()).padStart(2, '0');
    
    const availableZips = ['100000', '200000', '300000', '400000', '510000'];
    const deliveryAvailable = availableZips.includes(zipCode?.substring(0, 3) + '000');
    
    const availability = {
      productId: parseInt(productId),
      inStock: true,
      stockCount: Math.floor(Math.random() * 50) + 10,
      zipCode: zipCode || 'Unknown',
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


exports.saveGreetingCard = async (req, res) => {
  try {
    const { message, recipient, sender, cardType } = req.body;
    
    if (!message || !recipient) {
      return res.status(400).json({ 
        success: false, 
        error: 'Please enter message and recipient' 
      });
    }
    
    const card = {
      id: Date.now(),
      message: message,
      recipient: recipient,
      sender: sender || 'Anonymous',
      cardType: cardType || 'standard',
      createdAt: new Date().toISOString(),
      preview: `To ${recipient}:\n${message}\n\n—— ${sender || 'Anonymous'}`,
      price: cardType === 'premium' ? 29 : 19
    };
    
    res.json({ success: true, data: card });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.addOptionalGift = async (req, res) => {
  try {
    const { productId, giftId } = req.body;
    
    const gifts = {
      1: { id: 1, name: 'Dove Chocolate', price: 88, image: 'chocolate.jpg', description: 'Silky chocolate gift box' },
      2: { id: 2, name: 'Teddy Bear', price: 129, image: 'bear.jpg', description: 'Cute plush teddy bear' },
      3: { id: 3, name: 'Greeting Card', price: 19, image: 'card.jpg', description: 'Handwritten greeting card' },
      4: { id: 4, name: 'Red Wine', price: 199, image: 'wine.jpg', description: 'Imported red wine' },
      5: { id: 5, name: 'Perfume Sample', price: 59, image: 'perfume.jpg', description: 'Brand perfume sample set' }
    };
    
    const products = {
      1: { name: 'Rose Bouquet', price: 299 },
      2: { name: 'Sunflower Bouquet', price: 199 }
    };
    
    const selectedGift = gifts[giftId];
    const product = products[productId] || products[1];
    
    if (!selectedGift) {
      return res.status(400).json({ success: false, error: 'Gift not found' });
    }
    
    const result = {
      productId: parseInt(productId),
      productName: product.name,
      addedGift: selectedGift,
      subtotal: product.price,
      giftPrice: selectedGift.price,
      newTotal: product.price + selectedGift.price,
      message: `Successfully added ${selectedGift.name} to order`
    };
    
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.manageCart = async (req, res) => {
  try {
    const { action, productId, quantity, product } = req.body;
    
    let cart = {
      items: [
        { productId: 1, name: 'Rose Bouquet', quantity: 1, price: 299, image: 'rose.jpg' },
        { productId: 2, name: 'Chocolate', quantity: 1, price: 88, image: 'chocolate.jpg' }
      ],
      total: 387,
      itemCount: 2
    };
    
    switch(action) {
      case 'add':
        if (product) {
          cart.items.push({
            productId: product.id || Date.now(),
            name: product.name || 'New Item',
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
    
    cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cart.itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    
    res.json({ 
      success: true, 
      data: cart,
      message: action === 'add' ? 'Item added to cart' : 'Cart updated'
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
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
    
    if (!recipient || !phone || !address) {
      return res.status(400).json({ 
        success: false, 
        error: 'Please enter recipient, phone and address' 
      });
    }
    
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid phone number format' 
      });
    }
    
    const deliveryInfo = {
      id: Date.now(),
      recipient: recipient,
      phone: phone,
      province: province || 'Beijing',
      city: city || 'Beijing',
      district: district || 'Chaoyang',
      address: address,
      zipCode: zipCode || '100000',
      fullAddress: `${province || 'Beijing'}${city || 'Beijing'}${district || 'Chaoyang'}${address}`,
      deliveryDate: deliveryDate || '2026-03-01',
      deliveryTime: deliveryTime || '09:00-12:00',
      remarks: remarks || '',
      savedAt: new Date().toISOString(),
      verified: true
    };
    
    res.json({ 
      success: true, 
      data: deliveryInfo,
      message: 'Delivery information saved successfully' 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// US-021: track order  status
exports.trackOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    
    const statuses = ['Paid', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered'];
    const currentIndex = Math.floor(Math.random() * 3) + 1;
    
    const status = {
      orderId: orderId,
      orderNumber: `BL${orderId}${Date.now().toString().slice(-6)}`,
      currentStatus: statuses[currentIndex],
      statusHistory: [
        { status: 'Order Created', time: '2026-02-25 10:30:00', completed: true, description: 'Order submitted successfully' },
        { status: 'Paid', time: '2026-02-25 10:35:00', completed: currentIndex >= 0, description: 'Payment successful' },
        { status: 'Processing', time: currentIndex >= 1 ? '2026-02-25 14:20:00' : null, completed: currentIndex >= 1, description: 'Preparing your order' },
        { status: 'Shipped', time: currentIndex >= 2 ? '2026-02-26 09:00:00' : null, completed: currentIndex >= 2, description: 'Order has been shipped' },
        { status: 'Out for Delivery', time: currentIndex >= 3 ? '2026-02-26 14:30:00' : null, completed: currentIndex >= 3, description: 'Courier is delivering' },
        { status: 'Delivered', time: currentIndex >= 4 ? '2026-02-26 16:45:00' : null, completed: currentIndex >= 4, description: 'Order completed' }
      ],
      estimatedDelivery: '2026-02-27',
      courier: 'SF Express',
      trackingNumber: 'SF' + orderId + '123456',
      courierPhone: '95338',
      currentLocation: currentIndex >= 2 ? 'Beijing Distribution Center' : 'Merchant Warehouse'
    };
    
    res.json({ success: true, data: status });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


exports.getNotifications = async (req, res) => {
  try {
    const { userId } = req.params;
    const { unreadOnly } = req.query;
    
    const notifications = [
      {
        id: 1,
        type: 'order_confirmed',
        title: 'Order Confirmed',
        message: 'Your order #BL2026022512345 has been confirmed',
        read: false,
        time: '2026-02-25T10:35:00Z',
        actionUrl: '/orders/12345'
      },
      {
        id: 2,
        type: 'order_shipped',
        title: 'Order Shipped',
        message: 'Your order #BL2026022512345 has been shipped via SF Express',
        read: true,
        time: '2026-02-26T09:00:00Z',
        actionUrl: '/orders/12345/track'
      },
      {
        id: 3,
        type: 'delivery_reminder',
        title: 'Delivery Reminder',
        message: 'Your order is expected to arrive tomorrow, please keep your phone available',
        read: false,
        time: '2026-02-26T18:00:00Z',
        actionUrl: '/orders/12345'
      },
      {
        id: 4,
        type: 'promotion',
        title: "Valentine's Day Special",
        message: 'Spend ¥299 get ¥30 off, limited time offer',
        read: false,
        time: '2026-02-25T09:00:00Z',
        actionUrl: '/promotions'
      },
      {
        id: 5,
        type: 'payment_success',
        title: 'Payment Successful',
        message: 'You have successfully paid ¥387.00',
        read: true,
        time: '2026-02-25T10:35:00Z'
      }
    ];
    
    let filtered = notifications;
    if (unreadOnly === 'true') {
      filtered = notifications.filter(n => !n.read);
    }
    
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