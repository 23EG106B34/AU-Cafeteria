const mongoose = require('mongoose');
const Order = require('../models/Order');
require('dotenv').config();

const connectDB = require('../config/database');

// Connect to MongoDB
connectDB();

async function setupDatabase() {
  try {
    console.log('Setting up AU Cafeteria database...');

    // Check if we need to seed initial data
    const orderCount = await Order.countDocuments();

    if (orderCount === 0) {
      console.log('No orders found. Database is ready for use.');
      console.log('You can start placing orders through the web interface.');
    } else {
      console.log(`Found ${orderCount} existing orders in database.`);
    }

    console.log('Database setup complete!');
    process.exit(0);

  } catch (error) {
    console.error('Error setting up database:', error);
    process.exit(1);
  }
}

// Run setup
setupDatabase();
