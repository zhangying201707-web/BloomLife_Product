const OCCASIONS = [
  { id: 1, name: 'Birthday' },
  { id: 2, name: "Valentine's Day" },
  { id: 3, name: "Mother's Day" },
  { id: 4, name: "Father's Day" },
  { id: 5, name: 'Wedding Anniversary' },
  { id: 6, name: 'Graduation' },
  { id: 7, name: 'Chinese Valentine' },
  { id: 8, name: 'Christmas' },
];

const PRODUCTS = [
  {
    id: 1,
    name: 'Morning Dew Rose Bouquet',
    style: 'Romantic',
    mood: 'Love',
    occasionIds: [1, 2, 5, 7],
    price: 299,
    image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1200&q=80',
    category: 'Bouquet',
  },
  {
    id: 2,
    name: 'Sunny Tulip Gift Box',
    style: 'Modern',
    mood: 'Happy',
    occasionIds: [1, 6, 8],
    price: 259,
    image: 'https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=1200&q=80',
    category: 'Gift Box',
  },
  {
    id: 3,
    name: 'White Lily Luxury Basket',
    style: 'Elegant',
    mood: 'Respect',
    occasionIds: [3, 4, 5],
    price: 369,
    image: 'https://images.unsplash.com/photo-1468327768560-75b778cbb551?auto=format&fit=crop&w=1200&q=80',
    category: 'Basket',
  },
  {
    id: 4,
    name: 'Sunflower Energy Bundle',
    style: 'Sunny',
    mood: 'Cheerful',
    occasionIds: [1, 6],
    price: 219,
    image: 'https://images.unsplash.com/photo-1470509037663-253afd7f0f51?auto=format&fit=crop&w=1200&q=80',
    category: 'Bouquet',
  },
  {
    id: 5,
    name: 'Preserved Rose Keepsake Box',
    style: 'Classic',
    mood: 'Admiration',
    occasionIds: [2, 5, 7],
    price: 459,
    image: 'https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?auto=format&fit=crop&w=1200&q=80',
    category: 'Preserved Flower',
  },
  {
    id: 6,
    name: 'Spring Mixed Table Flowers',
    style: 'Simple',
    mood: 'Warm',
    occasionIds: [1, 3, 8],
    price: 189,
    image: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=1200&q=80',
    category: 'Table Arrangement',
  },
];

const GIFTS = [
  { id: 1, name: 'Dove Chocolate', price: 88, description: 'Silky chocolate gift box' },
  { id: 2, name: 'Teddy Bear', price: 129, description: 'Soft plush teddy bear' },
  { id: 3, name: 'Greeting Card Premium', price: 29, description: 'Premium paper card' },
  { id: 4, name: 'Red Wine Mini', price: 199, description: 'Imported red wine mini bottle' },
  { id: 5, name: 'Perfume Sample Set', price: 59, description: 'Seasonal perfume set' },
];

function toNumber(value, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function twoDaysLater() {
  const date = new Date();
  date.setDate(date.getDate() + 2);
  return date.toISOString().slice(0, 10);
}

exports.getOccasions = (req, res) => {
  res.json({ success: true, data: OCCASIONS });
};

exports.filterProducts = (req, res) => {
  const { occasion, style, mood } = req.query;

  let filtered = PRODUCTS;

  if (occasion) {
    const occasionId = toNumber(occasion, -1);
    filtered = filtered.filter((item) => item.occasionIds.includes(occasionId));
  }

  if (style) {
    filtered = filtered.filter((item) => item.style.toLowerCase() === String(style).toLowerCase());
  }

  if (mood) {
    filtered = filtered.filter((item) => item.mood.toLowerCase() === String(mood).toLowerCase());
  }

  res.json({ success: true, data: filtered, total: filtered.length });
};

exports.getPricingBreakdown = (req, res) => {
  const productId = toNumber(req.params.productId, 1);
  const product = PRODUCTS.find((item) => item.id === productId) || PRODUCTS[0];
  const basePrice = product.price;
  const packaging = 25;
  const deliveryFee = 15;
  const tax = Math.round(basePrice * 0.1 * 100) / 100;

  res.json({
    success: true,
    data: {
      productId: product.id,
      productName: product.name,
      basePrice,
      packaging,
      deliveryFee,
      tax,
      total: basePrice + packaging + deliveryFee + tax,
      breakdown: [
        { item: 'Flowers', price: basePrice },
        { item: 'Packaging', price: packaging },
        { item: 'Delivery', price: deliveryFee },
        { item: 'Tax (10%)', price: tax },
      ],
    },
  });
};

exports.checkAvailability = (req, res) => {
  const productId = toNumber(req.query.productId, 1);
  const zipCode = String(req.query.zipCode || '');
  const zone = zipCode.slice(0, 3);
  const deliveryAvailable = ['100', '200', '300', '400', '510'].includes(zone);

  res.json({
    success: true,
    data: {
      productId,
      zipCode,
      inStock: true,
      stockCount: 12 + (productId % 7) * 5,
      deliveryAvailable,
      estimatedDelivery: twoDaysLater(),
      deliveryDays: 2,
      cutOffTime: '18:00',
      nextDayDelivery: false,
    },
  });
};

exports.saveGreetingCard = (req, res) => {
  const { message, recipient, sender, cardType } = req.body;

  if (!message || !recipient) {
    return res.status(400).json({ success: false, error: 'Please provide recipient and message' });
  }

  const from = sender || 'Anonymous';
  const type = cardType || 'standard';

  res.json({
    success: true,
    data: {
      id: Date.now(),
      recipient,
      sender: from,
      cardType: type,
      message,
      price: type === 'premium' ? 29 : 19,
      createdAt: new Date().toISOString(),
      preview: `To ${recipient}:\n${message}\n\nFrom ${from}`,
    },
  });
};

exports.addOptionalGift = (req, res) => {
  const productId = toNumber(req.body.productId, 1);
  const giftId = toNumber(req.body.giftId, 0);

  const product = PRODUCTS.find((item) => item.id === productId) || PRODUCTS[0];
  const gift = GIFTS.find((item) => item.id === giftId);

  if (!gift) {
    return res.status(400).json({ success: false, error: 'Gift not found' });
  }

  res.json({
    success: true,
    data: {
      productId: product.id,
      productName: product.name,
      addedGift: gift,
      subtotal: product.price,
      giftPrice: gift.price,
      newTotal: product.price + gift.price,
      message: `${gift.name} added to your order`,
    },
  });
};

exports.manageCart = (req, res) => {
  const { action, productId, quantity, product, cart = [] } = req.body;
  let items = Array.isArray(cart) ? [...cart] : [];

  if (items.length === 0) {
    items = [{ id: 1, name: 'Morning Dew Rose Bouquet', quantity: 1, price: 299 }];
  }

  switch (action) {
    case 'add': {
      if (product) {
        const existing = items.find((item) => item.id === product.id);
        if (existing) {
          existing.quantity += toNumber(quantity, 1);
        } else {
          items.push({ ...product, quantity: toNumber(quantity, 1) });
        }
      }
      break;
    }
    case 'remove': {
      items = items.filter((item) => item.id !== toNumber(productId));
      break;
    }
    case 'update': {
      items = items.map((item) =>
        item.id === toNumber(productId) ? { ...item, quantity: Math.max(1, toNumber(quantity, 1)) } : item
      );
      break;
    }
    case 'clear': {
      items = [];
      break;
    }
    default:
      break;
  }

  const total = items.reduce((sum, item) => sum + toNumber(item.price) * toNumber(item.quantity, 1), 0);
  const itemCount = items.reduce((sum, item) => sum + toNumber(item.quantity, 1), 0);

  res.json({ success: true, data: { items, total, itemCount } });
};

exports.saveDeliveryDetails = (req, res) => {
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
    remarks,
  } = req.body;

  if (!recipient || !phone || !address) {
    return res.status(400).json({
      success: false,
      error: 'Please provide recipient, phone, and address',
    });
  }

  if (!/^1[3-9]\d{9}$/.test(String(phone))) {
    return res.status(400).json({ success: false, error: 'Invalid phone number format' });
  }

  const provinceValue = province || 'Beijing';
  const cityValue = city || 'Beijing';
  const districtValue = district || 'Chaoyang';

  res.json({
    success: true,
    data: {
      id: Date.now(),
      recipient,
      phone,
      province: provinceValue,
      city: cityValue,
      district: districtValue,
      address,
      zipCode: zipCode || '100000',
      fullAddress: `${provinceValue} ${cityValue} ${districtValue} ${address}`,
      deliveryDate: deliveryDate || twoDaysLater(),
      deliveryTime: deliveryTime || '09:00-12:00',
      remarks: remarks || '',
      verified: true,
      savedAt: new Date().toISOString(),
    },
  });
};

exports.trackOrder = (req, res) => {
  const { orderId } = req.params;
  const statuses = ['Paid', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered'];
  const index = Math.min(statuses.length - 1, toNumber(orderId, 1) % statuses.length);

  res.json({
    success: true,
    data: {
      orderId,
      orderNumber: `BL-${String(orderId).padStart(6, '0')}`,
      currentStatus: statuses[index],
      statusHistory: [
        { status: 'Order Created', completed: true, time: '2026-02-25 10:30:00' },
        { status: 'Paid', completed: true, time: '2026-02-25 10:35:00' },
        { status: 'Processing', completed: index >= 1, time: index >= 1 ? '2026-02-25 14:20:00' : null },
        { status: 'Shipped', completed: index >= 2, time: index >= 2 ? '2026-02-26 09:00:00' : null },
        { status: 'Out for Delivery', completed: index >= 3, time: index >= 3 ? '2026-02-26 14:30:00' : null },
        { status: 'Delivered', completed: index >= 4, time: index >= 4 ? '2026-02-26 16:45:00' : null },
      ],
      estimatedDelivery: twoDaysLater(),
      courier: 'SF Express',
      trackingNumber: `SF-${String(orderId).padStart(6, '0')}`,
      courierPhone: '95338',
      currentLocation: index >= 2 ? 'Distribution Center' : 'Merchant Warehouse',
    },
  });
};

exports.getNotifications = (req, res) => {
  const notifications = [
    {
      id: 1,
      type: 'order_confirmed',
      title: 'Order Confirmed',
      message: 'Your order has been confirmed.',
      read: false,
      time: '2026-02-25T10:35:00Z',
    },
    {
      id: 2,
      type: 'order_shipped',
      title: 'Order Shipped',
      message: 'Your order is on the way.',
      read: true,
      time: '2026-02-26T09:00:00Z',
    },
    {
      id: 3,
      type: 'delivery_reminder',
      title: 'Delivery Reminder',
      message: 'Your flowers are expected to arrive tomorrow.',
      read: false,
      time: '2026-02-26T18:00:00Z',
    },
  ];

  const unreadOnly = String(req.query.unreadOnly || '') === 'true';
  const result = unreadOnly ? notifications.filter((item) => !item.read) : notifications;

  res.json({
    success: true,
    data: result,
    total: result.length,
    unreadCount: notifications.filter((item) => !item.read).length,
  });
};
