// Express backend for AU Cafeteria with MongoDB
const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/database');
const Order = require('./models/Order');
const pages = require('./routes/pages');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// POST /order - Create new order
app.post('/order', async (req, res) => {
  try {
    const { place, item, price } = req.body || {};

    if (!place || !item) {
      return res.status(400).json({ error: 'Missing place or item' });
    }

    // Generate next token
    const token = await Order.generateNextToken();

    // Create new order
    const order = new Order({
      token,
      place,
      item,
      price: price || 0,
      status: 'pending'
    });

    await order.save();

    // Return token
    res.json({ token });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /admin/orders - List all orders for admin
app.get('/admin/orders', async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ orderDate: -1 });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /admin/orders/:token - Get specific order by token
app.get('/admin/orders/:token', async (req, res) => {
  try {
    const order = await Order.findOne({ token: req.params.token });
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /admin/orders/:token/status - Update order status
app.put('/admin/orders/:token/status', async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'preparing', 'ready', 'completed'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const updateData = { status };
    if (status === 'completed') {
      updateData.completedAt = new Date();
    }

    const order = await Order.findOneAndUpdate(
      { token: req.params.token },
      updateData,
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /orders/place/:place - Get orders by place
app.get('/orders/place/:place', async (req, res) => {
  try {
    const orders = await Order.find({ place: req.params.place }).sort({ orderDate: -1 });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders by place:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Page Routes - Serve HTML pages as JavaScript functions
app.get('/', (req, res) => {
  res.send(pages.homePage());
});

app.get('/about', (req, res) => {
  res.send(pages.aboutPage());
});

app.get('/review', (req, res) => {
  const token = req.query.token;
  const place = req.query.place;
  res.send(pages.reviewPage(token, place));
});

app.get('/thankyou', (req, res) => {
  const token = req.query.token || 'AU1001';
  const place = req.query.place || 'AU Cafeteria';
  res.send(pages.thankyouPage(token, place));
});

app.get('/apj', (req, res) => {
  res.send(pages.apjPage());
});

app.get('/dblock', (req, res) => {
  res.send(pages.dblockPage());
});

app.get('/juice', (req, res) => {
  res.send(pages.juicePage());
});

app.listen(PORT, () => console.log(`AU Cafeteria server running on http://localhost:${PORT}`));
