// Page route handlers - converted from HTML files

// Base HTML template
const baseTemplate = (title, content, includeScript = false) => `
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${title}</title>
  <link rel="stylesheet" href="/styles.css" />
</head>
<body>
  ${content}
  ${includeScript ? '<script src="/script.js"></script>' : ''}
</body>
</html>`;

// Header component
const header = (title, currentPage) => `
<header class="site-header">
  <h1>${title}</h1>
  <nav class="topnav">
    <a href="/" ${currentPage === 'home' ? 'class="active"' : ''}>Home</a>
    <a href="/about" ${currentPage === 'about' ? 'class="active"' : ''}>About</a>
    <a href="/review" ${currentPage === 'review' ? 'class="active"' : ''}>Reviews</a>
    ${currentPage === 'contacts' ? '<a href="#" id="contacts-link" class="active">Contacts</a>' : '<a href="#" id="contacts-link">Contacts</a>'}
  </nav>
</header>`;

// Footer component
const footer = (contact = '') => `
<footer class="site-footer">
  <p>${contact || '© AU Cafeteria'}</p>
</footer>`;

// Home page (index)
const homePage = () => {
  const content = `
    ${header('AU Cafeteria', 'home')}

    <main class="container">
      <p class="lead">Choose a place to view menu and order:</p>
      <div class="cards">
        <a class="card" href="/apj">
          <div class="card-icon">🥗</div>
          <h2>APJ Abdul Kalam Canteen</h2>
          <p>Healthy meals & snacks</p>
        </a>

        <a class="card" href="/dblock">
          <div class="card-icon">🍔</div>
          <h2>D Block Canteen</h2>
          <p>Franks, bakery items & snacks</p>
        </a>

        <a class="card" href="/juice">
          <div class="card-icon">🥤</div>
          <h2>Juice Point</h2>
          <p>Fresh juices & shakes</p>
        </a>
      </div>
    </main>

    ${footer()}
  `;

  return baseTemplate('AU Cafeteria', content);
};

// About page
const aboutPage = () => {
  const content = `
    ${header('About - AU Cafeteria', 'about')}

    <main class="container">
      <h2>About</h2>
      <p>AU Cafeteria is a student-friendly set of canteens serving affordable meals, snacks and drinks across campus. Locations available here:</p>
      <ul>
        <li>APJ Abdul Kalam Canteen</li>
        <li>D Block Canteen</li>
        <li>Juice Point</li>
      </ul>

      <h3>Contact Numbers</h3>
      <ul>
        <li>APJ Canteen: +91 98765 43210</li>
        <li>D Block Canteen: +91 91234 56789</li>
        <li>Juice Point: +91 90000 11111</li>
      </ul>
    </main>

    ${footer()}
  `;

  return baseTemplate('About - AU Cafeteria', content);
};

// Review page
const reviewPage = (token = null, place = null) => {
  let thankyouSection = '';
  if (token) {
    thankyouSection = `
      <div id="thankyou" style="display:block;">
        <h2>Thank you for your order!</h2>
        <p>Your token number is: <strong id="token-num">${token} (${place || ''})</strong></p>
        <p>Show this token at the selected place to collect your item.</p>
      </div>

      <div id="review-form" style="display:none;">
    `;
  } else {
    thankyouSection = '<div id="review-form">';
  }

  const content = `
    ${header('Review / Thank you - AU Cafeteria', 'review')}

    <main class="container">
      ${thankyouSection}
        <h2>Leave a review</h2>
        <form id="form-review">
          <label for="place">Place</label>
          <input id="place" name="place" required />

          <label for="rating">Rating (1-5)</label>
          <input id="rating" name="rating" type="number" min="1" max="5" required />

          <label for="message">Message</label>
          <textarea id="message" name="message" rows="3"></textarea>

          <button type="submit">Submit Review</button>
        </form>

        <div id="review-thanks" style="display:none;">
          <p>Thanks for your feedback!</p>
        </div>
      </div>
    </main>

    ${footer('Contact: +91 80000 22222')}
  `;

  return baseTemplate('Review / Thank you - AU Cafeteria', content, true);
};

// Thank you page
const thankyouPage = (token = 'AU1001', place = 'AU Cafeteria') => {
  const content = `
    ${header('🎉 Order Confirmed!', 'thankyou')}

    <main class="container" style="text-align: center; padding: 60px 20px;">
      <div style="max-width: 600px; margin: 0 auto; background: rgba(255,255,255,0.95); padding: 40px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
        <div style="font-size: 60px; margin-bottom: 20px;">✅</div>
        <h2 style="color: #2d3748; margin-bottom: 20px;">Thank You for Your Order!</h2>

        <div style="background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%); color: white; padding: 20px; border-radius: 15px; margin: 20px 0;">
          <h3 style="margin: 0 0 15px 0;">Order Details</h3>
          <p style="margin: 10px 0; font-size: 18px;"><strong>Token Number:</strong> <span id="order-token" style="font-size: 24px; color: #fff;">${token}</span></p>
          <p style="margin: 10px 0; font-size: 18px;"><strong>Place:</strong> <span id="order-place">${place}</span></p>
        </div>

        <div id="order-summary" style="background: #f7f7f9; padding: 20px; border-radius: 10px; margin: 20px 0; text-align: left;">
          <!-- Order summary will be populated by JavaScript -->
        </div>

        <div style="margin-top: 30px;">
          <p style="color: #666; margin-bottom: 20px;">Your order will be ready for pickup shortly. Please show this token number at the counter.</p>
          <button id="ok-btn" class="order-btn" style="padding: 15px 40px; font-size: 18px; background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);">
            🏠 OK - Back to Home
          </button>
        </div>
      </div>
    </main>

    ${footer('© AU Cafeteria - Delicious food, delivered with care!')}
  `;

  return baseTemplate('Order Confirmed - AU Cafeteria', content, true);
};

// APJ Canteen page
const apjPage = () => {
  const content = `
    ${header('APJ Abdul Kalam Canteen', 'apj')}

    <main class="container">
      <h2>Menu</h2>
      <div class="cart-section" style="margin-bottom: 30px; text-align: center;">
        <button id="view-cart-btn" class="order-btn" style="background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%); padding: 15px 30px; font-size: 18px; border-radius: 25px; box-shadow: 0 6px 20px rgba(255,107,107,0.3);">
          🛒 View Cart (0 items)
        </button>
        <button id="clear-cart-btn" class="order-btn" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 12px 20px; margin-left: 10px; display: none;">
          Clear Cart
        </button>
      </div>

      <div class="menu" data-place="APJ Abdul Kalam Canteen">
        <div class="item">
          <div><strong>Idly</strong></div>
          <div>₹30</div>
          <button class="add-to-cart-btn" data-name="Idly" data-price="30">Add to Cart</button>
        </div>
        <div class="item">
          <div><strong>Dosa</strong></div>
          <div>₹40</div>
          <button class="add-to-cart-btn" data-name="Dosa" data-price="40">Add to Cart</button>
        </div>
        <div class="item">
          <div><strong>Meals</strong></div>
          <div>₹70</div>
          <button class="add-to-cart-btn" data-name="Meals" data-price="70">Add to Cart</button>
        </div>
        <div class="item">
          <div><strong>Chapathi</strong></div>
          <div>₹35</div>
          <button class="add-to-cart-btn" data-name="Chapathi" data-price="35">Add to Cart</button>
        </div>
        <div class="item">
          <div><strong>Samosa</strong></div>
          <div>₹20</div>
          <button class="add-to-cart-btn" data-name="Samosa" data-price="20">Add to Cart</button>
        </div>
        <div class="item">
          <div><strong>Vada</strong></div>
          <div>₹25</div>
          <button class="add-to-cart-btn" data-name="Vada" data-price="25">Add to Cart</button>
        </div>
        <div class="item">
          <div><strong>Tea</strong></div>
          <div>₹15</div>
          <button class="add-to-cart-btn" data-name="Tea" data-price="15">Add to Cart</button>
        </div>
        <div class="item">
          <div><strong>Coffee</strong></div>
          <div>₹20</div>
          <button class="add-to-cart-btn" data-name="Coffee" data-price="20">Add to Cart</button>
        </div>
        <div class="item">
          <div><strong>Veg Roll</strong></div>
          <div>₹40</div>
          <button class="add-to-cart-btn" data-name="Veg Roll" data-price="40">Add to Cart</button>
        </div>
        <div class="item">
          <div><strong>Egg Roll</strong></div>
          <div>₹50</div>
          <button class="add-to-cart-btn" data-name="Egg Roll" data-price="50">Add to Cart</button>
        </div>
      </div>

      <!-- Cart Modal -->
      <div id="cart-modal" class="cart-modal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 1000; overflow-y: auto;">
        <div style="background: white; margin: 5% auto; padding: 30px; border-radius: 20px; max-width: 600px; position: relative;">
          <button id="close-cart-btn" style="position: absolute; top: 15px; right: 20px; background: #ff6b6b; color: white; border: none; border-radius: 50%; width: 40px; height: 40px; font-size: 20px; cursor: pointer;">×</button>
          <h2 style="color: #2d3748; margin-bottom: 20px;">🛒 Your Cart</h2>
          <div id="cart-items"></div>
          <div id="cart-total" style="margin-top: 20px; padding: 15px; background: #f7f7f9; border-radius: 10px; font-weight: bold; font-size: 18px;"></div>
          <div style="margin-top: 20px; text-align: center;">
            <button id="place-order-btn" class="order-btn" style="padding: 15px 40px; font-size: 18px; margin-right: 10px;">Place Order</button>
            <button id="continue-shopping-btn" class="order-btn" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">Continue Shopping</button>
          </div>
        </div>
      </div>
    </main>

    ${footer('Contact: +91 98765 43210')}
  `;

  return baseTemplate('APJ Abdul Kalam Canteen - AU Cafeteria', content, true);
};

// D Block Canteen page
const dblockPage = () => {
  const content = `
    ${header('D Block Canteen', 'dblock')}

    <main class="container">
      <h2>Menu</h2>
      <div class="cart-section" style="margin-bottom: 30px; text-align: center;">
        <button id="view-cart-btn" class="order-btn" style="background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%); padding: 15px 30px; font-size: 18px; border-radius: 25px; box-shadow: 0 6px 20px rgba(255,107,107,0.3);">
          🛒 View Cart (0 items)
        </button>
        <button id="clear-cart-btn" class="order-btn" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 12px 20px; margin-left: 10px; display: none;">
          Clear Cart
        </button>
      </div>

      <div class="menu" data-place="D Block Canteen">
        <div class="item">
          <div><strong>Veg Franky</strong></div>
          <div>₹50</div>
          <button class="add-to-cart-btn" data-name="Veg Franky" data-price="50">Add to Cart</button>
        </div>
        <div class="item">
          <div><strong>Non-Veg Franky</strong></div>
          <div>₹70</div>
          <button class="add-to-cart-btn" data-name="Non-Veg Franky" data-price="70">Add to Cart</button>
        </div>
        <div class="item">
          <div><strong>Veg Puff</strong></div>
          <div>₹20</div>
          <button class="add-to-cart-btn" data-name="Veg Puff" data-price="20">Add to Cart</button>
        </div>
        <div class="item">
          <div><strong>Non-Veg Puff</strong></div>
          <div>₹30</div>
          <button class="add-to-cart-btn" data-name="Non-Veg Puff" data-price="30">Add to Cart</button>
        </div>
        <div class="item">
          <div><strong>Sandwich</strong></div>
          <div>₹40</div>
          <button class="add-to-cart-btn" data-name="Sandwich" data-price="40">Add to Cart</button>
        </div>
        <div class="item">
          <div><strong>Fries</strong></div>
          <div>₹45</div>
          <button class="add-to-cart-btn" data-name="Fries" data-price="45">Add to Cart</button>
        </div>
        <div class="item">
          <div><strong>Ice Cream</strong></div>
          <div>₹40</div>
          <button class="add-to-cart-btn" data-name="Ice Cream" data-price="40">Add to Cart</button>
        </div>
        <div class="item">
          <div><strong>Chips</strong></div>
          <div>₹15</div>
          <button class="add-to-cart-btn" data-name="Chips" data-price="15">Add to Cart</button>
        </div>
        <div class="item">
          <div><strong>Biscuits</strong></div>
          <div>₹10</div>
          <button class="add-to-cart-btn" data-name="Biscuits" data-price="10">Add to Cart</button>
        </div>
      </div>

      <!-- Cart Modal -->
      <div id="cart-modal" class="cart-modal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 1000; overflow-y: auto;">
        <div style="background: white; margin: 5% auto; padding: 30px; border-radius: 20px; max-width: 600px; position: relative;">
          <button id="close-cart-btn" style="position: absolute; top: 15px; right: 20px; background: #ff6b6b; color: white; border: none; border-radius: 50%; width: 40px; height: 40px; font-size: 20px; cursor: pointer;">×</button>
          <h2 style="color: #2d3748; margin-bottom: 20px;">🛒 Your Cart</h2>
          <div id="cart-items"></div>
          <div id="cart-total" style="margin-top: 20px; padding: 15px; background: #f7f7f9; border-radius: 10px; font-weight: bold; font-size: 18px;"></div>
          <div style="margin-top: 20px; text-align: center;">
            <button id="place-order-btn" class="order-btn" style="padding: 15px 40px; font-size: 18px; margin-right: 10px;">Place Order</button>
            <button id="continue-shopping-btn" class="order-btn" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">Continue Shopping</button>
          </div>
        </div>
      </div>
    </main>

    ${footer('Contact: +91 91234 56789')}
  `;

  return baseTemplate('D Block Canteen - AU Cafeteria', content, true);
};

// Juice Point page
const juicePage = () => {
  const content = `
    ${header('Juice Point', 'juice')}

    <main class="container">
      <h2>Menu</h2>
      <div class="cart-section" style="margin-bottom: 30px; text-align: center;">
        <button id="view-cart-btn" class="order-btn" style="background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%); padding: 15px 30px; font-size: 18px; border-radius: 25px; box-shadow: 0 6px 20px rgba(255,107,107,0.3);">
          🛒 View Cart (0 items)
        </button>
        <button id="clear-cart-btn" class="order-btn" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 12px 20px; margin-left: 10px; display: none;">
          Clear Cart
        </button>
      </div>

      <div class="menu" data-place="Juice Point">
        <div class="item">
          <div><strong>Mango Juice</strong></div>
          <div>₹40</div>
          <button class="add-to-cart-btn" data-name="Mango Juice" data-price="40">Add to Cart</button>
        </div>
        <div class="item">
          <div><strong>Lemon Soda</strong></div>
          <div>₹25</div>
          <button class="add-to-cart-btn" data-name="Lemon Soda" data-price="25">Add to Cart</button>
        </div>
        <div class="item">
          <div><strong>Cold Coffee</strong></div>
          <div>₹50</div>
          <button class="add-to-cart-btn" data-name="Cold Coffee" data-price="50">Add to Cart</button>
        </div>
        <div class="item">
          <div><strong>Watermelon Juice</strong></div>
          <div>₹35</div>
          <button class="add-to-cart-btn" data-name="Watermelon Juice" data-price="35">Add to Cart</button>
        </div>
        <div class="item">
          <div><strong>Apple Juice</strong></div>
          <div>₹45</div>
          <button class="add-to-cart-btn" data-name="Apple Juice" data-price="45">Add to Cart</button>
        </div>
        <div class="item">
          <div><strong>Pineapple Juice</strong></div>
          <div>₹40</div>
          <button class="add-to-cart-btn" data-name="Pineapple Juice" data-price="40">Add to Cart</button>
        </div>
        <div class="item">
          <div><strong>Chocolate Milkshake</strong></div>
          <div>₹60</div>
          <button class="add-to-cart-btn" data-name="Chocolate Milkshake" data-price="60">Add to Cart</button>
        </div>
      </div>

      <!-- Cart Modal -->
      <div id="cart-modal" class="cart-modal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 1000; overflow-y: auto;">
        <div style="background: white; margin: 5% auto; padding: 30px; border-radius: 20px; max-width: 600px; position: relative;">
          <button id="close-cart-btn" style="position: absolute; top: 15px; right: 20px; background: #ff6b6b; color: white; border: none; border-radius: 50%; width: 40px; height: 40px; font-size: 20px; cursor: pointer;">×</button>
          <h2 style="color: #2d3748; margin-bottom: 20px;">🛒 Your Cart</h2>
          <div id="cart-items"></div>
          <div id="cart-total" style="margin-top: 20px; padding: 15px; background: #f7f7f9; border-radius: 10px; font-weight: bold; font-size: 18px;"></div>
          <div style="margin-top: 20px; text-align: center;">
            <button id="place-order-btn" class="order-btn" style="padding: 15px 40px; font-size: 18px; margin-right: 10px;">Place Order</button>
            <button id="continue-shopping-btn" class="order-btn" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">Continue Shopping</button>
          </div>
        </div>
      </div>
    </main>

    ${footer('Contact: +91 90000 11111')}
  `;

  return baseTemplate('Juice Point - AU Cafeteria', content, true);
};

module.exports = {
  homePage,
  aboutPage,
  reviewPage,
  thankyouPage,
  apjPage,
  dblockPage,
  juicePage
};
