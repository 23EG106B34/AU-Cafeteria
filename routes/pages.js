const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/about', (req, res) => {
  res.render('about');
});

router.get('/review', (req, res) => {
  const { token, place } = req.query;
  res.render('review', { token, place });
});

router.get('/thankyou', (req, res) => {
  const token = req.query.token || 'AU1001';
  const place = req.query.place || 'AU Cafeteria';
  res.render('thankyou', { token, place });
});

router.get('/apj', (req, res) => {
  res.render('apj');
});

router.get('/dblock', (req, res) => {
  res.render('dblock');
});

router.get('/juice', (req, res) => {
  res.render('juice');
});

module.exports = router;
