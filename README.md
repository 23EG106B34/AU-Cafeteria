# AU Cafeteria with MongoDB

A full-stack cafeteria ordering system for AU (Anna University) with MongoDB backend for persistent data storage.

## Features

- 🍽️ Multiple canteen locations (APJ Abdul Kalam Canteen, D Block Canteen, Juice Point)
- 🛒 Shopping cart functionality
- 🎫 Token-based order system with persistent storage
- 📱 Responsive web interface
- 👨‍💼 Admin panel for order management
- 📊 Order status tracking (pending, preparing, ready, completed)

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Frontend**: HTML, CSS, JavaScript (Vanilla)
- **Environment**: dotenv for configuration

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

## Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd au-cafeteria
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up MongoDB**
   - Install MongoDB on your system
   - Start MongoDB service
   - Default connection: `mongodb://localhost:27017/au-cafeteria`

4. **Configure environment (optional)**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` file to customize:
   ```env
   MONGODB_URI=mongodb://localhost:27017/au-cafeteria
   PORT=3000
   NODE_ENV=development
   ```

5. **Initialize database**
   ```bash
   node scripts/setup-db.js
   ```

## Usage

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

### Order Management
- `POST /order` - Create a new order
- `GET /admin/orders` - Get all orders (admin)
- `GET /admin/orders/:token` - Get specific order by token
- `PUT /admin/orders/:token/status` - Update order status
- `GET /orders/place/:place` - Get orders by place

### Order Status Values
- `pending` - Order received, not yet started
- `preparing` - Order is being prepared
- `ready` - Order is ready for pickup
- `completed` - Order has been delivered

## Project Structure

```
au-cafeteria/
├── config/
│   └── database.js          # MongoDB connection configuration
├── models/
│   └── Order.js             # Order schema/model
├── routes/
│   └── pages.js             # Page route handlers (converted from HTML)
├── scripts/
│   └── setup-db.js          # Database initialization script
├── public/                  # Static assets
│   ├── script.js           # Frontend JavaScript
│   └── styles.css          # CSS styles
├── .env                     # Environment variables
├── server.js               # Main server file
├── test-api.js             # API testing script
├── test-website.js         # Website testing script
└── package.json            # Dependencies and scripts
```

## Features Overview

### For Customers
- Browse multiple canteen menus
- Add items to cart
- Place orders with automatic token generation
- Receive order confirmation with unique token

### For Administrators
- View all orders in real-time
- Update order status through API
- Filter orders by location
- Persistent order history

## Database Schema

### Order Collection
```javascript
{
  token: String (unique),
  place: String (required),
  item: String (required),
  price: Number (required),
  status: String (enum: ['pending', 'preparing', 'ready', 'completed']),
  orderDate: Date,
  completedAt: Date
}
```

## Development Notes

- Orders are automatically assigned incrementing tokens (AU1001, AU1002, etc.)
- All order data is persisted in MongoDB
- Server includes CORS support for cross-origin requests
- Error handling and validation included
- Responsive design works on mobile and desktop

## Troubleshooting

1. **MongoDB Connection Issues**
   - Ensure MongoDB is running on your system
   - Check the connection string in `.env` file
   - Verify MongoDB port (default: 27017)

2. **Port Already in Use**
   - Change the PORT in `.env` file
   - Or kill the process using the port: `npx kill-port 3000`

3. **Dependencies Issues**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

This is a demo web project for **AU Cafeteria**. It includes three locations (APJ Abdul Kalam Canteen, D Block Canteen, Juice Point). You can view menus, place an order, and receive a token number to collect the item.

## How to run
1. Make sure you have Node.js installed (Node 14+ recommended).
2. Extract the ZIP and open a terminal in the project root.
3. Install dependencies:

```bash
npm install
```

4. Start the server:

```bash
npm start
```

5. Open http://localhost:3000 in your browser.

## Notes
- Orders are stored in memory (server restart clears them).
- `review.html` doubles as the thank-you page; after ordering you will be redirected there with a token in the URL.
