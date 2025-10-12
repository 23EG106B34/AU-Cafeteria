// Simple Express backend for AU Cafeteria
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-memory order counter
let lastToken = 1000;
const orders = [];

app.post('/order', (req, res) => {
  const {place, item, price} = req.body || {};
  if (!place || !item) return res.status(400).json({error: 'Missing place or item'});

  lastToken += 1;
  const token = 'AU' + lastToken;
  const order = {token, place, item, price: price||0, time: new Date().toISOString()};
  orders.push(order);

  // Return token
  res.json({token});
});

// Optional: list orders for debugging (not advertised)
app.get('/admin/orders', (req, res) => {
  res.json(orders);
});

app.listen(PORT, () => console.log(`AU Cafeteria server running on http://localhost:${PORT}`));
