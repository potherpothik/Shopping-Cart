let products = [];

async function fetchProducts() {
    try {
        const response = await fetch('products.json');
        products = await response.json();
        // console.log("All products", products); 
        renderProducts();
    } catch (error) {
        // console.error('Error loading products:', error);
    }
}

function renderProducts() {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = '';

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'col';
        card.innerHTML = `
            <div class="card h-100">
                <img src="${product.image}" class="card-img-top product-img" alt="${product.title}">
                <div class="card-body">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text text-muted">${product.description.substring(0, 100)}...</p>
                    <p class="fw-bold">$${product.price}</p>
                    <button class="btn btn-primary add-to-cart" data-id="${product.id}">Add to Cart</button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}