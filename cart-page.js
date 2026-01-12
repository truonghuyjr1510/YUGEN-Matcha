let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItemsEl = document.getElementById("cart-items");
const cartTotalEl = document.getElementById("cart-total");

function formatPrice(price) {
    return price.toLocaleString("vi-VN") + " đ";
}

function renderCart() {
    cartItemsEl.innerHTML = "";

    if (cart.length === 0) {
        cartItemsEl.innerHTML = "<p>Giỏ hàng đang trống.</p>";
        cartTotalEl.innerText = "0 đ";
        return;
    }

    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        const div = document.createElement("div");
        div.className = "cart-item";

        div.innerHTML = `
            <h3>${item.name}</h3>
            <p class="cart-price">${formatPrice(item.price)}</p>

            <div class="quantity">
                <button onclick="decrease(${index})">-</button>
                <span>${item.quantity}</span>
                <button onclick="increase(${index})">+</button>
            </div>

            <span class="remove" onclick="removeItem(${index})">✕</span>
        `;

        cartItemsEl.appendChild(div);
    });

    cartTotalEl.innerText = formatPrice(total);
}

function increase(index) {
    cart[index].quantity++;
    saveCart();
}

function decrease(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1);
    }
    saveCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

renderCart();

const checkoutBtn = document.querySelector(".checkout-btn");
const paymentPopup = document.getElementById("paymentSuccess");

if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {

        if (cart.length === 0) {
            alert("Giỏ hàng của bạn đang trống!");
            return;
        }

        // Hiện popup
        paymentPopup.classList.add("show");

        // Xóa giỏ hàng
        localStorage.removeItem("cart");
        cart = [];
        renderCart();
    });
}

function goHome() {
    window.location.href = "index.html";
}

