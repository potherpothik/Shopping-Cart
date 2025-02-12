class Cart {
    constructor() {
        this.items = [];
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            this.items.push({...product, quantity: 1});
        }
        updateCartUI();
    }

    removeItem(id) {
        this.items = this.items.filter(item => item.id !== id);
        updateCartUI();
    }

    updateQuantity(id, newQuantity) {
        if (newQuantity < 1) return;
        const item = this.items.find(item => item.id === id);
        if (item) item.quantity = newQuantity;
        updateCartUI();
    }

    clear() {
        this.items = [];
        updateCartUI();
    }

    getTotal() {
        return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }
}

const cart = new Cart();