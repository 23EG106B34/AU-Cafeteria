let cart = JSON.parse(localStorage.getItem('cart')) || [];
async function placeOrder(place, items) {
  try {
    const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemNames = items.map(item => `${item.name} (x${item.quantity})`).join(', ');
    const res = await fetch('/order', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({place, item: itemNames, price: totalPrice})
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Order failed', err);
    alert('Order failed. Try again.');
  }
}

function updateCartDisplay() {
  const cartBtn = document.getElementById('view-cart-btn');
  const clearBtn = document.getElementById('clear-cart-btn');
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (cartBtn) {
    cartBtn.textContent = `🛒 View Cart (${itemCount} items)`;
  }
  if (clearBtn) {
    clearBtn.style.display = itemCount > 0 ? 'inline-block' : 'none';
  }
  localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(name, price) {
  const existingItem = cart.find(item => item.name === name);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({name, price: Number(price), quantity: 1});
  }
  updateCartDisplay();
  showNotification(`${name} added to cart!`);
}

function showNotification(message) {
  const notification = document.createElement('div');
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #4CAF50;
    color: white;
    padding: 15px 20px;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    z-index: 1001;
    font-weight: bold;
  `;
  document.body.appendChild(notification);
  setTimeout(() => {
    notification.remove();
  }, 2000);
}

function showCartModal() {
  const modal = document.getElementById('cart-modal');
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');

  if (!modal) return;
  if (cart.length === 0) {
    cartItems.innerHTML = '<p style="text-align: center; color: #666;">Your cart is empty</p>';
    cartTotal.textContent = 'Total: ₹0';
    document.getElementById('place-order-btn').style.display = 'none';
  } else {
    cartItems.innerHTML = cart.map(item => `
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px; background: #f7f7f9; margin-bottom: 10px; border-radius: 8px;">
        <div>
          <strong>${item.name}</strong><br>
          <span style="color: #666;">₹${item.price} × ${item.quantity}</span>
        </div>
        <div>
          <button onclick="changeQuantity('${item.name}', ${item.quantity - 1})" style="background: #ff6b6b; color: white; border: none; border-radius: 50%; width: 30px; height: 30px; cursor: pointer; margin-right: 5px;">-</button>
          <button onclick="changeQuantity('${item.name}', ${item.quantity + 1})" style="background: #4CAF50; color: white; border: none; border-radius: 50%; width: 30px; height: 30px; cursor: pointer; margin-right: 10px;">+</button>
          <span style="font-weight: bold;">₹${item.price * item.quantity}</span>
        </div>
      </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `Total: ₹${total}`;
    document.getElementById('place-order-btn').style.display = 'inline-block';
  }
  modal.style.display = 'block';
}

function changeQuantity(name, newQuantity) {
  if (newQuantity <= 0) {
    cart = cart.filter(item => item.name !== name);
  } else {
    const item = cart.find(item => item.name === name);
    if (item) {
      item.quantity = newQuantity;
    }
  }
  updateCartDisplay();
  showCartModal();
}

function clearCart() {
  cart = [];
  updateCartDisplay();
  showCartModal();
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const name = btn.dataset.name;
      const price = btn.dataset.price;
      addToCart(name, price);
    });
  });

  const viewCartBtn = document.getElementById('view-cart-btn');
  if (viewCartBtn) {
    viewCartBtn.addEventListener('click', showCartModal);
  }

  const clearCartBtn = document.getElementById('clear-cart-btn');
  if (clearCartBtn) {
    clearCartBtn.addEventListener('click', clearCart);
  }

  const closeCartBtn = document.getElementById('close-cart-btn');
  if (closeCartBtn) {
    closeCartBtn.addEventListener('click', () => {
      document.getElementById('cart-modal').style.display = 'none';
    });
  }

  const continueShoppingBtn = document.getElementById('continue-shopping-btn');
  if (continueShoppingBtn) {
    continueShoppingBtn.addEventListener('click', () => {
      document.getElementById('cart-modal').style.display = 'none';
    });
  }

  const placeOrderBtn = document.getElementById('place-order-btn');
  if (placeOrderBtn) {
    placeOrderBtn.addEventListener('click', async () => {
      if (cart.length === 0) return;
      const menu = document.querySelector('.menu');
      const place = menu ? menu.dataset.place : 'AU Cafeteria';
      const confirmMsg = `Place order for ${cart.length} items from ${place}?`;
      if (!confirm(confirmMsg)) return;
      const resp = await placeOrder(place, cart);
      if (resp && resp.token) {
        // Clear cart and redirect to thank you page
        cart = [];
        localStorage.removeItem('cart');
        window.location.href = `/thankyou?token=${resp.token}&place=${encodeURIComponent(place)}`;
      }
    });
  }

  if (location.pathname === '/thankyou') {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const place = params.get('place');
    if (token) {
      document.getElementById('order-token').textContent = token;
      document.getElementById('order-place').textContent = place || 'AU Cafeteria';

      const orderSummary = document.getElementById('order-summary');
      const cartData = sessionStorage.getItem('lastOrder');
      if (cartData && orderSummary) {
        const items = JSON.parse(cartData);
        const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        orderSummary.innerHTML = `
          <h3>Order Summary:</h3>
          ${items.map(item => `<p>${item.name} × ${item.quantity} = ₹${item.price * item.quantity}</p>`).join('')}
          <p><strong>Total: ₹${total}</strong></p>
        `;
      }
    }

    const okBtn = document.getElementById('ok-btn');
    if (okBtn) {
      okBtn.addEventListener('click', () => {
        window.location.href = '/';
      });
    }
  }

  if (location.pathname === '/review') {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const place = params.get('place');
    const item = params.get('item');
    if (token) {
      document.getElementById('thankyou').style.display = 'block';
      document.getElementById('token-num').textContent = token + ' (' + (place||'') + ')';
      document.getElementById('review-form').style.display = 'none';
    }

    const form = document.getElementById('form-review');
    form && form.addEventListener('submit', (ev) => {
      ev.preventDefault();
      document.getElementById('review-form').style.display = 'none';
      document.getElementById('review-thanks').style.display = 'block';
      setTimeout(() => {
        window.location.href = '/';
      }, 1800);
    });
  }

  const contactsLink = document.getElementById('contacts-link');
  if (contactsLink) {
    contactsLink.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Contacts:\nAPJ: +91 98765 43210\nD Block: +91 91234 56789\nJuice Point: +91 90000 11111');
    });
  }
});

window.changeQuantity = changeQuantity;