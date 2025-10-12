# AU Cafeteria

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
