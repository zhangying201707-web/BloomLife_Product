const { Product } = require('../../models/productModel');
const { Order } = require('../../models/orderModel');
const { User } = require('../../models/userModel');

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
    trendingScore: 98,
    rating: 4.9,
    reviewCount: 186,
    description:
      '11 Ecuador roses with eucalyptus, premium wrapping, and a keepsake vase insert for romantic occasions.',
    stemCount: 11,
    freshness: '48-hour freshness guarantee',
    wrapStyles: ['Rose Gold Mesh', 'Classic Ivory', 'Midnight Black'],
    gallery: [
      { angle: 'Front', image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1200&q=80' },
      { angle: 'Side', image: 'https://images.unsplash.com/photo-1468327768560-75b778cbb551?auto=format&fit=crop&w=1200&q=80' },
      { angle: 'Top', image: 'https://images.unsplash.com/photo-1455656678494-4d1b5f3e7ad1?auto=format&fit=crop&w=1200&q=80' },
    ],
    reviews: [
      { id: 101, author: 'Lina', rating: 5, comment: 'Looked exactly like the photo and lasted a full week.' },
      { id: 102, author: 'Mason', rating: 5, comment: 'Elegant wrapping and very reliable delivery.' },
    ],
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
    trendingScore: 95,
    rating: 4.8,
    reviewCount: 142,
    description:
      'A modern tulip arrangement packed in a rigid gift box with satin ribbon and mini care guide.',
    stemCount: 18,
    freshness: 'Cold-chain packed for gift presentation',
    wrapStyles: ['Apricot Ribbon', 'Minimal Kraft', 'Pearl White'],
    gallery: [
      { angle: 'Front', image: 'https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=1200&q=80' },
      { angle: '45 Degree', image: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=1200&q=80' },
      { angle: 'Open Box', image: 'https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?auto=format&fit=crop&w=1200&q=80' },
    ],
    reviews: [
      { id: 201, author: 'Ava', rating: 5, comment: 'Bright colors and very presentable for graduation.' },
      { id: 202, author: 'Noah', rating: 4, comment: 'Gift box looked premium and secure.' },
    ],
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
    trendingScore: 87,
    rating: 4.7,
    reviewCount: 96,
    description:
      'White lilies, lisianthus, and eucalyptus arranged in a reusable woven basket for refined gifting.',
    stemCount: 20,
    freshness: 'Hydration foam keeps blooms stable in transit',
    wrapStyles: ['Linen Bow', 'Champagne Satin', 'Soft Sage'],
    gallery: [
      { angle: 'Front', image: 'https://images.unsplash.com/photo-1468327768560-75b778cbb551?auto=format&fit=crop&w=1200&q=80' },
      { angle: 'Side', image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1200&q=80' },
      { angle: 'Basket Detail', image: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=1200&q=80' },
    ],
    reviews: [
      { id: 301, author: 'Emma', rating: 5, comment: 'Very tasteful and premium for a formal delivery.' },
      { id: 302, author: 'Leo', rating: 4, comment: 'Basket quality was better than expected.' },
    ],
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
    trendingScore: 92,
    rating: 4.8,
    reviewCount: 128,
    description:
      'Sunflowers with champagne roses and green fillers, designed for upbeat and celebratory gifting.',
    stemCount: 12,
    freshness: 'Best seller for same-day gifting',
    wrapStyles: ['Sunshine Yellow', 'Natural Kraft', 'Terracotta Wrap'],
    gallery: [
      { angle: 'Front', image: 'https://images.unsplash.com/photo-1470509037663-253afd7f0f51?auto=format&fit=crop&w=1200&q=80' },
      { angle: 'Close Up', image: 'https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=1200&q=80' },
      { angle: 'Top', image: 'https://images.unsplash.com/photo-1455656678494-4d1b5f3e7ad1?auto=format&fit=crop&w=1200&q=80' },
    ],
    reviews: [
      { id: 401, author: 'Ivy', rating: 5, comment: 'Super cheerful and the colors were vivid.' },
      { id: 402, author: 'Lucas', rating: 4, comment: 'Great value for the size.' },
    ],
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
    trendingScore: 90,
    rating: 4.9,
    reviewCount: 74,
    description:
      'Long-lasting preserved roses in an acrylic keepsake box for milestone celebrations and premium gifting.',
    stemCount: 9,
    freshness: 'Preserved arrangement with 12-month display life',
    wrapStyles: ['Velvet Sleeve', 'Gold Ribbon', 'Luxury Black Box'],
    gallery: [
      { angle: 'Front', image: 'https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?auto=format&fit=crop&w=1200&q=80' },
      { angle: 'Open Lid', image: 'https://images.unsplash.com/photo-1455656678494-4d1b5f3e7ad1?auto=format&fit=crop&w=1200&q=80' },
      { angle: 'Side', image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1200&q=80' },
    ],
    reviews: [
      { id: 501, author: 'Grace', rating: 5, comment: 'Ideal for anniversaries and looked very luxurious.' },
      { id: 502, author: 'Ethan', rating: 5, comment: 'Worth the premium price.' },
    ],
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
    trendingScore: 84,
    rating: 4.6,
    reviewCount: 88,
    description:
      'An affordable mixed-flower table arrangement with carnations, daisies, and baby’s breath.',
    stemCount: 16,
    freshness: 'Budget-friendly pick with daily restock',
    wrapStyles: ['Pastel Pink', 'Soft Mint', 'Minimal White'],
    gallery: [
      { angle: 'Front', image: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=1200&q=80' },
      { angle: 'Room View', image: 'https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=1200&q=80' },
      { angle: 'Top', image: 'https://images.unsplash.com/photo-1468327768560-75b778cbb551?auto=format&fit=crop&w=1200&q=80' },
    ],
    reviews: [
      { id: 601, author: 'Sophia', rating: 5, comment: 'Affordable and fresh for a desk arrangement.' },
      { id: 602, author: 'Jack', rating: 4, comment: 'Nice size for everyday gifting.' },
    ],
  },
];

const GIFTS = [
  { id: 1, name: 'Dove Chocolate', price: 88, description: 'Silky chocolate gift box' },
  { id: 2, name: 'Teddy Bear', price: 129, description: 'Soft plush teddy bear' },
  { id: 3, name: 'Greeting Card Premium', price: 29, description: 'Premium paper card' },
  { id: 4, name: 'Red Wine Mini', price: 199, description: 'Imported red wine mini bottle' },
  { id: 5, name: 'Perfume Sample Set', price: 59, description: 'Seasonal perfume set' },
];

const PAYMENT_METHODS = [
  { id: 'card', name: 'Credit / Debit Card', fee: 0, eta: 'Instant confirmation' },
  { id: 'paypal', name: 'PayPal', fee: 0, eta: 'Instant confirmation' },
  { id: 'applepay', name: 'Apple Pay', fee: 0, eta: 'Mobile quick pay' },
  { id: 'cod', name: 'Cash on Delivery', fee: 8, eta: 'Confirmed after dispatch' },
];

const SUPPORT_OPTIONS = [
  { id: 'live-chat', label: 'Live Chat', availability: '09:00-23:00', responseTime: '< 3 minutes' },
  { id: 'phone', label: 'Phone Support', availability: '24/7 hotline 400-800-1314', responseTime: 'Immediate' },
  { id: 'wechat', label: 'WeChat Concierge', availability: '08:00-22:00', responseTime: '< 10 minutes' },
];

const FAVORITE_MESSAGES = new Map();
const SUBSCRIPTIONS = [];
const FAVORITE_PRODUCTS = new Map();
const USER_PROFILES = new Map();
const SUPPORT_CHATS = new Map();
const SUBSCRIPTION_SHIPMENTS = [];

const FAQ_ITEMS = [
  {
    id: 1,
    question: 'Can I change the delivery time after checkout?',
    answer: 'Yes. You can change it before florist preparation starts.',
    category: 'Delivery',
  },
  {
    id: 2,
    question: 'Do you support same-day delivery?',
    answer: 'Yes, for supported ZIP zones before 18:00.',
    category: 'Delivery',
  },
  {
    id: 3,
    question: 'How do I pause my flower subscription?',
    answer: 'Go to Subscription settings and set status to Paused.',
    category: 'Subscription',
  },
  {
    id: 4,
    question: 'Can I update my subscription address?',
    answer: 'Yes. Address updates apply to the next scheduled shipment.',
    category: 'Subscription',
  },
];

const SUBSCRIPTION_THEMES = [
  { month: 'April', theme: 'Spring Garden Romance', palette: 'Blush Pink + Soft White', featuredStem: 'Peony' },
  { month: 'May', theme: 'Morning Citrus Bloom', palette: 'Orange + Lemon', featuredStem: 'Ranunculus' },
  { month: 'June', theme: 'Coastal Hydrangea Calm', palette: 'Sky Blue + Ivory', featuredStem: 'Hydrangea' },
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

function getProduct(productId) {
  return PRODUCTS.find((item) => item.id === toNumber(productId)) || PRODUCTS[0];
}

function normalizeFavoriteKey(userId) {
  return String(userId || 'guest');
}

function toIsoDate(date) {
  return new Date(date).toISOString().slice(0, 10);
}

function sevenDaysLater() {
  const date = new Date();
  date.setDate(date.getDate() + 7);
  return toIsoDate(date);
}

function isDeliveredStatus(status) {
  const value = String(status || '').toLowerCase();
  return value.includes('delivered');
}

function createSubscriptionShipment(subscription) {
  const shipment = {
    id: Date.now() + Math.floor(Math.random() * 1000),
    subscriptionId: subscription.id,
    userId: subscription.userId || null,
    plan: subscription.plan,
    address: subscription.address,
    eta: subscription.nextDelivery,
    status: 'scheduled',
    themePreview:
      SUBSCRIPTION_THEMES.find((item) => item.month.toLowerCase() === new Date().toLocaleString('en-US', { month: 'long' }).toLowerCase()) ||
      SUBSCRIPTION_THEMES[0],
    createdAt: new Date().toISOString(),
  };

  SUBSCRIPTION_SHIPMENTS.unshift(shipment);
  return shipment;
}

exports.getOccasions = (req, res) => {
  res.json({ success: true, data: OCCASIONS });
};

exports.filterProducts = (req, res) => {
  const { occasion, style, mood, maxBudget, trendingOnly } = req.query;

  let filtered = [...PRODUCTS];

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

  if (maxBudget) {
    const budget = toNumber(maxBudget, 0);
    filtered = filtered.filter((item) => item.price <= budget);
  }

  if (String(trendingOnly) === 'true') {
    filtered = filtered
      .filter((item) => item.trendingScore >= 90)
      .sort((a, b) => b.trendingScore - a.trendingScore);
  }

  res.json({ success: true, data: filtered, total: filtered.length });
};

exports.getTrendingArrangements = (req, res) => {
  const data = [...PRODUCTS]
    .sort((a, b) => b.trendingScore - a.trendingScore)
    .slice(0, 3)
    .map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      category: item.category,
      trendingScore: item.trendingScore,
      rating: item.rating,
    }));

  res.json({ success: true, data });
};

exports.compareProducts = (req, res) => {
  const productIds = String(req.query.productIds || '')
    .split(',')
    .map((item) => toNumber(item))
    .filter(Boolean)
    .slice(0, 2);

  if (productIds.length < 2) {
    return res.status(400).json({ success: false, error: 'Please select two products to compare' });
  }

  const data = productIds.map((id) => getProduct(id)).map((item) => ({
    id: item.id,
    name: item.name,
    price: item.price,
    category: item.category,
    style: item.style,
    mood: item.mood,
    rating: item.rating,
    reviewCount: item.reviewCount,
    stemCount: item.stemCount,
    freshness: item.freshness,
  }));

  res.json({ success: true, data });
};

exports.getProductDetails = (req, res) => {
  const product = getProduct(req.params.productId);

  res.json({
    success: true,
    data: {
      id: product.id,
      name: product.name,
      description: product.description,
      category: product.category,
      style: product.style,
      mood: product.mood,
      stemCount: product.stemCount,
      freshness: product.freshness,
      included: ['Flower arrangement', 'Care instruction card', 'Water pack', 'Gift bag'],
    },
  });
};

exports.getProductReviews = (req, res) => {
  const product = getProduct(req.params.productId);

  res.json({
    success: true,
    data: {
      rating: product.rating,
      reviewCount: product.reviewCount,
      items: product.reviews,
    },
  });
};

exports.getProductGallery = (req, res) => {
  const product = getProduct(req.params.productId);
  res.json({ success: true, data: product.gallery });
};

exports.getWrappingOptions = (req, res) => {
  const product = getProduct(req.params.productId);
  const data = product.wrapStyles.map((name, index) => ({
    id: `${product.id}-${index + 1}`,
    name,
    surcharge: index === 0 ? 0 : 12 + index * 6,
  }));

  res.json({ success: true, data });
};

exports.getPricingBreakdown = (req, res) => {
  const product = getProduct(req.params.productId);
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

exports.saveFavoriteMessage = (req, res) => {
  const { userId, label, message, recipient, sender } = req.body;

  if (!message) {
    return res.status(400).json({ success: false, error: 'Please provide a message to save' });
  }

  const key = normalizeFavoriteKey(userId);
  const existing = FAVORITE_MESSAGES.get(key) || [];
  const nextItem = {
    id: Date.now(),
    label: label || `Favorite ${existing.length + 1}`,
    message,
    recipient: recipient || '',
    sender: sender || '',
  };

  FAVORITE_MESSAGES.set(key, [nextItem, ...existing].slice(0, 5));
  res.json({ success: true, data: nextItem, total: FAVORITE_MESSAGES.get(key).length });
};

exports.getFavoriteMessages = (req, res) => {
  const key = normalizeFavoriteKey(req.params.userId);
  res.json({ success: true, data: FAVORITE_MESSAGES.get(key) || [] });
};

exports.addOptionalGift = (req, res) => {
  const productId = toNumber(req.body.productId, 1);
  const giftId = toNumber(req.body.giftId, 0);

  const product = getProduct(productId);
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

exports.applyPromoCode = (req, res) => {
  const subtotal = toNumber(req.body.subtotal, 0);
  const code = String(req.body.code || '').trim().toUpperCase();
  const promotions = {
    SAVE10: { type: 'percent', value: 0.1, label: '10% off flowers' },
    SPRING20: { type: 'amount', value: 20, label: 'Spring special ¥20 off' },
    FREESHIP: { type: 'amount', value: 15, label: 'Delivery fee waived' },
  };

  const promotion = promotions[code];

  if (!promotion) {
    return res.status(400).json({ success: false, error: 'Promo code is invalid or expired' });
  }

  const discount =
    promotion.type === 'percent'
      ? Math.round(subtotal * promotion.value * 100) / 100
      : Math.min(subtotal, promotion.value);

  res.json({
    success: true,
    data: {
      code,
      description: promotion.label,
      subtotal,
      discount,
      totalAfterDiscount: Math.max(0, subtotal - discount),
    },
  });
};

exports.getPaymentMethods = (req, res) => {
  res.json({ success: true, data: PAYMENT_METHODS });
};

exports.subscribeMonthlyBox = (req, res) => {
  const { userId, plan, address, frequency } = req.body;

  if (!plan || !address) {
    return res.status(400).json({ success: false, error: 'Please choose a plan and delivery address' });
  }

  const item = {
    id: Date.now(),
    userId: userId || null,
    plan,
    address,
    frequency: frequency || 'Monthly',
    status: 'active',
    nextDelivery: twoDaysLater(),
    pausedUntil: null,
    createdAt: new Date().toISOString(),
  };

  SUBSCRIPTIONS.unshift(item);
  const shipment = createSubscriptionShipment(item);
  res.json({ success: true, data: item, shipment });
};

exports.listUserSubscriptions = (req, res) => {
  const key = normalizeFavoriteKey(req.params.userId);
  const data = SUBSCRIPTIONS.filter((item) => normalizeFavoriteKey(item.userId) === key);
  res.json({ success: true, data });
};

exports.manageSubscription = (req, res) => {
  const subscriptionId = toNumber(req.params.subscriptionId, 0);
  const item = SUBSCRIPTIONS.find((subscription) => subscription.id === subscriptionId);

  if (!item) {
    return res.status(404).json({ success: false, error: 'Subscription not found' });
  }

  const nextStatus = req.body.status ? String(req.body.status).toLowerCase() : item.status;
  if (req.body.plan) item.plan = req.body.plan;
  if (req.body.frequency) item.frequency = req.body.frequency;
  if (req.body.address) item.address = req.body.address;

  item.status = ['active', 'paused', 'cancelled'].includes(nextStatus) ? nextStatus : item.status;
  item.pausedUntil = item.status === 'paused' ? req.body.pausedUntil || sevenDaysLater() : null;
  item.nextDelivery = item.status === 'paused' ? item.pausedUntil : req.body.nextDelivery || twoDaysLater();
  item.updatedAt = new Date().toISOString();

  res.json({ success: true, data: item });
};

exports.getSubscriptionThemes = (req, res) => {
  res.json({ success: true, data: SUBSCRIPTION_THEMES });
};

exports.getSupportOptions = (req, res) => {
  res.json({
    success: true,
    data: {
      channels: SUPPORT_OPTIONS,
      faqs: FAQ_ITEMS.map((item) => `${item.question} ${item.answer}`),
    },
  });
};

exports.getFaqs = (req, res) => {
  res.json({ success: true, data: FAQ_ITEMS });
};

exports.getSupportChat = (req, res) => {
  const key = normalizeFavoriteKey(req.params.userId);
  const existing = SUPPORT_CHATS.get(key) || [
    {
      id: 1,
      from: 'agent',
      text: 'Hello! This is BloomLife support. How can I help you today?',
      time: new Date().toISOString(),
    },
  ];

  SUPPORT_CHATS.set(key, existing);
  res.json({ success: true, data: existing });
};

exports.sendSupportMessage = (req, res) => {
  const key = normalizeFavoriteKey(req.body.userId);
  const text = String(req.body.message || '').trim();
  if (!text) {
    return res.status(400).json({ success: false, error: 'Please type a message before sending' });
  }

  const existing = SUPPORT_CHATS.get(key) || [];
  const customerMessage = {
    id: Date.now(),
    from: 'user',
    text,
    time: new Date().toISOString(),
  };
  const agentReply = {
    id: Date.now() + 1,
    from: 'agent',
    text: 'Thanks for contacting BloomLife. An agent has joined and will continue this chat shortly.',
    time: new Date().toISOString(),
  };

  const next = [...existing, customerMessage, agentReply].slice(-20);
  SUPPORT_CHATS.set(key, next);
  res.json({ success: true, data: next });
};

exports.trackOrder = (req, res) => {
  const { orderId } = req.params;
  const statuses = ['Paid', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered'];
  const index = Math.min(statuses.length - 1, toNumber(orderId, 1) % statuses.length);
  const currentStatus = statuses[index];
  const delayed = toNumber(orderId, 1) % 3 === 0;
  const delayMinutes = delayed ? 30 + (toNumber(orderId, 1) % 4) * 15 : 0;
  const deliveryPhoto =
    currentStatus === 'Delivered'
      ? {
          confirmed: true,
          takenAt: '2026-02-26 16:47:00',
          image:
            'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1200&q=80',
          note: 'Recipient signed and accepted the arrangement.',
        }
      : {
          confirmed: false,
          takenAt: null,
          image: null,
          note: 'Delivery photo will appear after successful handoff.',
        };

  res.json({
    success: true,
    data: {
      orderId,
      orderNumber: `BL-${String(orderId).padStart(6, '0')}`,
      currentStatus,
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
      delayAlert: {
        hasDelay: delayed,
        minutes: delayMinutes,
        reason: delayed ? 'High traffic on last-mile route' : null,
      },
      deliveryPhoto,
    },
  });
};

exports.getOrderHistory = async (req, res) => {
  try {
    const username = String(req.params.username || '').trim();
    if (!username) {
      return res.status(400).json({ success: false, error: 'Missing username' });
    }

    const orders = await Order.findAll({
      where: { customerName: username },
      order: [['createdAt', 'DESC']],
      limit: 20,
    });

    res.json({ success: true, data: orders, total: orders.length });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.reorderPreviousPurchase = async (req, res) => {
  try {
    const sourceOrder = await Order.findByPk(req.params.orderId);
    if (!sourceOrder) {
      return res.status(404).json({ success: false, error: 'Original order not found' });
    }

    const username = String(req.body.username || sourceOrder.customerName || '').trim();
    if (!username) {
      return res.status(400).json({ success: false, error: 'Missing username for reorder' });
    }

    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    const order = await Order.create({
      userId: user.id,
      customerName: username,
      items: sourceOrder.items,
      totalAmount: sourceOrder.totalAmount,
      deliveryAddress: sourceOrder.deliveryAddress,
      note: `Reordered from #${sourceOrder.id}`,
      status: 'confirmed',
    });

    res.status(201).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.saveFavoriteProduct = (req, res) => {
  const { userId, productId, name, price, image } = req.body;
  const key = normalizeFavoriteKey(userId);
  const list = FAVORITE_PRODUCTS.get(key) || [];

  const fallbackProduct = getProduct(productId);
  const item = {
    id: Number(productId) || fallbackProduct.id,
    name: name || fallbackProduct.name,
    price: toNumber(price, fallbackProduct.price),
    image: image || fallbackProduct.image,
    savedAt: new Date().toISOString(),
  };

  const deduped = [item, ...list.filter((product) => Number(product.id) !== Number(item.id))].slice(0, 12);
  FAVORITE_PRODUCTS.set(key, deduped);

  res.json({ success: true, data: item, total: deduped.length });
};

exports.getFavoriteProducts = (req, res) => {
  const key = normalizeFavoriteKey(req.params.userId);
  res.json({ success: true, data: FAVORITE_PRODUCTS.get(key) || [] });
};

exports.getPersonalInfo = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    const cache = USER_PROFILES.get(String(user.id)) || {};
    res.json({
      success: true,
      data: {
        userId: user.id,
        username: user.username,
        email: cache.email || user.email,
        fullName: cache.fullName || user.username,
        phone: cache.phone || '',
        birthday: cache.birthday || '',
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.updatePersonalInfo = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    const profile = USER_PROFILES.get(String(user.id)) || {};
    const nextProfile = {
      ...profile,
      fullName: req.body.fullName || profile.fullName || user.username,
      phone: req.body.phone || profile.phone || '',
      birthday: req.body.birthday || profile.birthday || '',
      email: req.body.email || profile.email || user.email,
      updatedAt: new Date().toISOString(),
    };

    USER_PROFILES.set(String(user.id), nextProfile);
    if (req.body.email && req.body.email !== user.email) {
      await user.update({ email: req.body.email });
    }

    res.json({
      success: true,
      data: {
        userId: user.id,
        username: user.username,
        ...nextProfile,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getNotifications = (req, res) => {
  const userId = req.params.userId;
  const trackedOrderId = 100 + toNumber(userId, 1);
  const trackedStatus = ['Paid', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered'];
  const statusIndex = Math.min(trackedStatus.length - 1, trackedOrderId % trackedStatus.length);
  const delivered = isDeliveredStatus(trackedStatus[statusIndex]);
  const delayed = trackedOrderId % 3 === 0;

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
    {
      id: 4,
      type: 'delay_alert',
      title: 'Delivery Delay Alert',
      message: delayed
        ? 'The courier reported a short delay. New ETA is about 45 minutes later.'
        : 'No active delays on your latest order.',
      read: !delayed,
      time: new Date().toISOString(),
    },
    {
      id: 5,
      type: 'delivery_photo',
      title: delivered ? 'Delivery Photo Confirmation' : 'Delivery Photo Pending',
      message: delivered
        ? 'Your bouquet has been delivered. A confirmation photo is now available in tracking.'
        : 'Photo confirmation will be available after successful delivery.',
      read: !delivered,
      time: new Date().toISOString(),
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

exports.listAdminProducts = async (req, res) => {
  try {
    const products = await Product.findAll({ order: [['id', 'ASC']] });
    res.json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.createAdminProduct = async (req, res) => {
  try {
    const { name, description, price, image, category, stock } = req.body;

    if (!name || !description || !image || !category) {
      return res.status(400).json({ success: false, error: 'Please complete the product form' });
    }

    const product = await Product.create({
      name,
      description,
      price: toNumber(price, 0),
      image,
      category,
      stock: Math.max(0, toNumber(stock, 0)),
    });

    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateAdminProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.productId);

    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    const { price, stock, description } = req.body;
    await product.update({
      price: price === undefined ? product.price : toNumber(price, product.price),
      stock: stock === undefined ? product.stock : Math.max(0, toNumber(stock, product.stock)),
      description: description || product.description,
    });

    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.listAdminOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({ order: [['createdAt', 'DESC']], limit: 10 });
    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.orderId);

    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }

    const nextStatus = String(req.body.status || '').trim();
    if (!nextStatus) {
      return res.status(400).json({ success: false, error: 'Please provide a new status' });
    }

    await order.update({ status: nextStatus });
    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.listSubscriptionShipments = (req, res) => {
  res.json({ success: true, data: SUBSCRIPTION_SHIPMENTS.slice(0, 20) });
};

exports.updateSubscriptionShipmentStatus = (req, res) => {
  const shipmentId = toNumber(req.params.shipmentId, 0);
  const shipment = SUBSCRIPTION_SHIPMENTS.find((item) => item.id === shipmentId);

  if (!shipment) {
    return res.status(404).json({ success: false, error: 'Subscription shipment not found' });
  }

  const status = String(req.body.status || '').trim().toLowerCase();
  if (!status) {
    return res.status(400).json({ success: false, error: 'Please provide shipment status' });
  }

  shipment.status = status;
  shipment.updatedAt = new Date().toISOString();
  res.json({ success: true, data: shipment });
};

exports.getSalesAnalytics = async (req, res) => {
  try {
    const orders = await Order.findAll({ order: [['createdAt', 'DESC']] });
    const products = await Product.findAll({ order: [['id', 'ASC']] });

    const totalRevenue = orders.reduce((sum, order) => sum + toNumber(order.totalAmount, 0), 0);
    const totalOrders = orders.length;
    const avgOrderValue = totalOrders > 0 ? Math.round((totalRevenue / totalOrders) * 100) / 100 : 0;

    const bestSellers = products
      .map((product, index) => ({
        id: product.id,
        name: product.name,
        category: product.category,
        sales: Math.max(5, 40 - index * 3),
      }))
      .slice(0, 5);

    const monthlyRevenue = [
      { month: 'Jan', revenue: 12680 },
      { month: 'Feb', revenue: 14320 },
      { month: 'Mar', revenue: 15860 },
      { month: 'Apr', revenue: Math.max(5200, Math.round(totalRevenue || 7800)) },
    ];

    res.json({
      success: true,
      data: {
        totalRevenue,
        totalOrders,
        avgOrderValue,
        repeatCustomerRate: totalOrders === 0 ? 0 : 37,
        bestSellers,
        monthlyRevenue,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
