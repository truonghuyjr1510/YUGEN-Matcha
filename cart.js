/* =========================
   CART COUNT
========================= */
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const el = document.querySelector(".cart-count");
    if (el) el.innerText = count;
}

/* =========================
   ADD TO CART
========================= */
function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const item = cart.find(i => i.name === name);
    if (item) {
        item.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();
    renderMiniCart();
    showAddCartPopup(); // 👉 popup xác nhận
}

/* =========================
   MINI CART
========================= */
function renderMiniCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const items = document.querySelector(".mini-items");
    const totalEl = document.querySelector(".mini-total");
    if (!items || !totalEl) return;

    items.innerHTML = "";

    if (cart.length === 0) {
        items.innerHTML = "<p>Giỏ hàng trống</p>";
        totalEl.innerText = "";
        return;
    }

    let total = 0;

    cart.forEach(i => {
        total += i.price * i.quantity;
        items.innerHTML += `<p>${i.name} × ${i.quantity}</p>`;
    });

    totalEl.innerText = `Tổng: ${total.toLocaleString("vi-VN")} đ`;
}

/* =========================
   ADD CART POPUP
========================= */
function showAddCartPopup() {
    const popup = document.getElementById("addCartPopup");
    if (!popup) return;

    popup.classList.add("show");

    setTimeout(() => {
        popup.classList.remove("show");
    }, 1200);
}

/* =========================
   INIT
========================= */
document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
    renderMiniCart();

    document.querySelectorAll(".add-to-cart").forEach(btn => {
        btn.addEventListener("click", () => {
            addToCart(
                btn.dataset.name,
                parseInt(btn.dataset.price)
            );
        });
    });
});
