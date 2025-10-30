const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/database');
const Order = require('./models/Order');
const pageRoutes = require('./routes/pages');
const app = express();
const PORT = process.env.PORT || 3001;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

connectDB();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.post('/order', async (req, res) => {
  try {
    const { place, item, price } = req.body || {};
    if (!place || !item) {
      return res.status(400).json({ error: 'Missing place or item' });
    }
    const token = await Order.generateNextToken();
    const order = new Order({
      token,
      place,
      item,
      price: price || 0,
      status: 'pending'
    });
    await order.save();
    res.json({ token });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/admin/orders', async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ orderDate: -1 });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

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

app.get('/orders/place/:place', async (req, res) => {
  try {
    const orders = await Order.find({ place: req.params.place }).sort({ orderDate: -1 });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders by place:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.use('/', pageRoutes);

app.listen(PORT, () => console.log(`AU Cafeteria server running on http://localhost:${PORT}`));
