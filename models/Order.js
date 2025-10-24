const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true
  },
  place: {
    type: String,
    required: true
  },
  item: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['pending', 'preparing', 'ready', 'completed'],
    default: 'pending'
  },
  orderDate: {
    type: Date,
    default: Date.now
  },
  completedAt: {
    type: Date
  }
});

orderSchema.index({ place: 1 });
orderSchema.index({ orderDate: -1 });
orderSchema.statics.generateNextToken = async function() {
  const lastOrder = await this.findOne({}, {}, { sort: { 'token': -1 } });
  let lastTokenNumber = 1000;

  if (lastOrder && lastOrder.token) {
    const tokenNumber = parseInt(lastOrder.token.replace('AU', ''));
    if (!isNaN(tokenNumber)) {
      lastTokenNumber = tokenNumber;
    }
  }
  return `AU${lastTokenNumber + 1}`;
};

module.exports = mongoose.model('Order', orderSchema);