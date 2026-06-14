<script>
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    updateCartCount();
  }

  function updateCartCount() {
    const el = document.getElementById("cartCount");
    if (el) el.textContent = cart.reduce((s, i) => s + i.quantity, 0);
  }

  function showToast(message) {
    const t = document.getElementById("toast");
    if (!t) return;
    t.textContent = message;
    t.classList.add("show");
    setTimeout(() => t.classList.remove("show"), 1800);
  }

  function increaseQty(id) {
    const item = cart.find(x => x.id === id);
    if (item) { item.quantity += 1; saveCart(); }
  }

  function decreaseQty(id) {
    const item = cart.find(x => x.id === id);
    if (item) {
      item.quantity -= 1;
      if (item.quantity <= 0) cart = cart.filter(x => x.id !== id);
      saveCart();
    }
  }

  function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    showToast("Item removed");
  }

  function renderCart() {
    const cartItems = document.getElementById("cartItems");
    const totalAmount = document.getElementById("totalAmount");
    if (!cartItems || !totalAmount) return;

    if (cart.length === 0) {
      cartItems.innerHTML = "<p style='text-align:center;color:#666'>Your cart is empty.</p>";
      totalAmount.textContent = "0";
      updateCartCount();
      return;
    }

    let total = 0;
    cartItems.innerHTML = cart.map(item => {
      const itemTotal = Number(item.price) * item.quantity;
      total += itemTotal;
      return `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}">
          <div style="flex:1">
            <h3>${item.name}</h3>
            <p>₹${item.price} x ${item.quantity} = ₹${itemTotal}</p>
            <div class="qty-wrap">
              <button class="qty-btn" onclick="decreaseQty('${item.id}')">-</button>
              <span>${item.quantity}</span>
              <button class="qty-btn" onclick="increaseQty('${item.id}')">+</button>
              <button class="remove-btn" onclick="removeItem('${item.id}')">Remove</button>
            </div>
          </div>
        </div>
      `;
    }).join("");

    totalAmount.textContent = total;
    updateCartCount();
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderCart();
    updateCartCount();
    document.getElementById("clearCart")?.addEventListener("click", () => {
      cart = [];
      saveCart();
      showToast("Cart cleared");
    });
  });
</script>