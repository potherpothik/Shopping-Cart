document.addEventListener('DOMContentLoaded', () => {
    // console.log('DOM fully loaded and parsed');
    fetchProducts();

    document.getElementById('productGrid').addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = parseInt(e.target.dataset.id);
            const product = products.find(p => p.id === productId);
            cart.addItem(product);
        }
    });

    document.getElementById('clearCart').addEventListener('click', () => cart.clear());

    document.getElementById('cartItems').addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-increment')) {
            const id = parseInt(e.target.dataset.id);
            const item = cart.items.find(item => item.id === id);
            cart.updateQuantity(id, item.quantity + 1);
        }
        if (e.target.classList.contains('btn-decrement')) {
            const id = parseInt(e.target.dataset.id);
            const item = cart.items.find(item => item.id === id);
            cart.updateQuantity(id, item.quantity - 1);
        }
        if (e.target.classList.contains('btn-remove')) {
            const id = parseInt(e.target.dataset.id);
            cart.removeItem(id);
        }
    });
});

function updateCartUI() {
    // Update cart count
    const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = itemCount;
    
    // Update cart items
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';
    
    cart.items.forEach(item => {
        const li = document.createElement('div');
        li.className = 'list-group-item';
        li.innerHTML = `
            <img src="${item.image}" class="cart-item-img" alt="${item.title}">
            <div>
                <h6>${item.title}</h6>
                <p>$${item.price} x ${item.quantity}</p>
            </div>
            <div class="quantity-controls">
                <button class="btn btn-sm btn-outline-secondary btn-decrement" data-id="${item.id}">-</button>
                <span>${item.quantity}</span>
                <button class="btn btn-sm btn-outline-secondary btn-increment" data-id="${item.id}">+</button>
                <button class="btn btn-sm btn-danger btn-remove" data-id="${item.id}">×</button>
            </div>
        `;
        cartItems.appendChild(li);
    });

    // Update totals
    document.getElementById('cartItemCount').textContent = itemCount;
    document.getElementById('cartTotal').textContent = cart.getTotal().toFixed(2);
}