const express = require('express');
const { Product } = require('../models/productModel');

const router = express.Router();

const seedProducts = [
  {
    name: 'Morning Dew Rose Bouquet',
    description: '11 Ecuador roses, perfect for birthdays and anniversaries.',
    price: 299,
    image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1200&q=80',
    category: 'Bouquet',
    stock: 40,
  },
  {
    name: 'Sunny Tulip Gift Box',
    description: 'Colorful tulip gift box for cheerful and warm moments.',
    price: 259,
    image: 'https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=1200&q=80',
    category: 'Gift Box',
    stock: 35,
  },
  {
    name: 'White Lily Luxury Basket',
    description: 'White lilies with eucalyptus, ideal for home and business settings.',
    price: 369,
    image: 'https://images.unsplash.com/photo-1468327768560-75b778cbb551?auto=format&fit=crop&w=1200&q=80',
    category: 'Basket',
    stock: 25,
  },
  {
    name: 'Sunflower Energy Bundle',
    description: 'Sunflowers mixed with champagne roses for a warm uplifting vibe.',
    price: 219,
    image: 'https://images.unsplash.com/photo-1470509037663-253afd7f0f51?auto=format&fit=crop&w=1200&q=80',
    category: 'Bouquet',
    stock: 45,
  },
  {
    name: 'Preserved Rose Keepsake Box',
    description: 'Preserved roses with a custom card, made for lasting memories.',
    price: 459,
    image: 'https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?auto=format&fit=crop&w=1200&q=80',
    category: 'Preserved Flower',
    stock: 18,
  },
  {
    name: 'Spring Mixed Table Flowers',
    description: 'Carnations, daisies, and baby’s breath for everyday decor.',
    price: 189,
    image: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=1200&q=80',
    category: 'Table Arrangement',
    stock: 50,
  },
];

async function ensureSeeded() {
  const count = await Product.count();
  if (count === 0) {
    await Product.bulkCreate(seedProducts);
  }
}

router.get('/', async (req, res) => {
  try {
    await ensureSeeded();
    const products = await Product.findAll({ order: [['id', 'ASC']] });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
