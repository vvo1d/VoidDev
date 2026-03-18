// Основной JavaScript файл
console.log('QPick script loaded');

// Функция для аккордеона
function toggleAccordion(button) {
    const accordionItem = button.closest('.accordion-item');
    const isActive = accordionItem.classList.contains('active');
    
    // Закрыть все открытые аккордеоны
    const allItems = document.querySelectorAll('.accordion-item');
    allItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // Открыть текущий аккордеон если он был закрыт
    if (!isActive) {
        accordionItem.classList.add('active');
    }
}

// Функция для работы с избранным (сердечко)
document.addEventListener('DOMContentLoaded', function() {
    const hearts = document.querySelectorAll('.heart');
    
    hearts.forEach(heart => {
        heart.addEventListener('click', function(e) {
            e.preventDefault();
            this.classList.toggle('filled');
        });
    });
});

// Корзина товаров
class ShoppingCart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
        this.deliveryCost = 0;
        this.init();
    }

    init() {
        this.render();
        this.setupEventListeners();
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += product.quantity || 1;
        } else {
            this.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: product.quantity || 1
            });
        }
        
        this.save();
        this.render();
    }

    removeItem(itemId) {
        this.items = this.items.filter(item => item.id !== itemId);
        this.save();
        this.render();
    }

    updateQuantity(itemId, quantity) {
        const item = this.items.find(item => item.id === itemId);
        if (item) {
            item.quantity = Math.max(1, parseInt(quantity));
            this.save();
            this.render();
        }
    }

    getSubtotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getTotal() {
        return this.getSubtotal() + this.deliveryCost;
    }

    save() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    render() {
        const emptyCart = document.getElementById('emptyCart');
        const cartFilled = document.getElementById('cartFilled');

        if (this.items.length === 0) {
            if (emptyCart) emptyCart.style.display = 'flex';
            if (cartFilled) cartFilled.style.display = 'none';
        } else {
            if (emptyCart) emptyCart.style.display = 'none';
            if (cartFilled) cartFilled.style.display = 'block';
            this.renderItems();
            this.renderSummary();
        }
    }

    renderItems() {
        const cartItemsContainer = document.getElementById('cartItems');
        if (!cartItemsContainer) return;

        cartItemsContainer.innerHTML = this.items.map(item => {
            const itemTotal = item.price * item.quantity;
            return `
                <div class="cart-item" data-id="${item.id}">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-info">
                        <div class="cart-item-header">
                            <h4 class="cart-item-name">${item.name}</h4>
                            <button class="cart-item-delete" onclick="cart.removeItem('${item.id}')">🗑</button>
                        </div>
                        <div class="cart-item-bottom">
                            <span class="cart-item-price">${item.price} ₸</span>
                            <div class="cart-item-qty">
                                <button class="qty-btn" onclick="cart.updateQuantity('${item.id}', ${item.quantity - 1})">−</button>
                                <span class="qty-value">${item.quantity}</span>
                                <button class="qty-btn" onclick="cart.updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
                            </div>
                            <span class="cart-item-total">${itemTotal} ₸</span>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    renderSummary() {
        const totalAmountEl = document.getElementById('totalAmount');
        const deliveryPriceEl = document.getElementById('deliveryPrice');

        if (totalAmountEl) totalAmountEl.textContent = `Т ${this.getTotal()}`;
        if (deliveryPriceEl) deliveryPriceEl.textContent = `${this.deliveryCost} ₸`;
    }
}

// Функция для обновления доставки
function updateDelivery() {
    const select = document.getElementById('deliverySelect');
    if (select && cart) {
        cart.deliveryCost = parseInt(select.value);
        cart.renderSummary();
    }
}

// Класс для управления избранным
class Favorites {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('favorites')) || [];
    }

    addItem(product) {
        const exists = this.items.some(item => item.id === product.id);
        if (!exists) {
            this.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                rating: product.rating || 0
            });
            this.save();
        }
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.save();
    }

    toggleItem(product) {
        if (this.items.some(item => item.id === product.id)) {
            this.removeItem(product.id);
        } else {
            this.addItem(product);
        }
    }

    isFavorite(productId) {
        return this.items.some(item => item.id === productId);
    }

    save() {
        localStorage.setItem('favorites', JSON.stringify(this.items));
    }
}

// Инициализация избранного
let favorites = new Favorites();

// Рендер страницы избранного
function renderFavoritesPage() {
    if (window.location.pathname.includes('favorites.php')) {
        const emptyFavorites = document.getElementById('emptyFavorites');
        const favoritesContent = document.getElementById('favoritesContent');

        if (favorites.items.length === 0) {
            if (emptyFavorites) emptyFavorites.style.display = 'flex';
            if (favoritesContent) favoritesContent.style.display = 'none';
        } else {
            if (emptyFavorites) emptyFavorites.style.display = 'none';
            if (favoritesContent) favoritesContent.style.display = 'flex';
            
            // Разделяем товары по категориям (простой пример)
            const headphones = favorites.items.filter((_, i) => i < 3);
            const wirelessHeadphones = favorites.items.filter((_, i) => i >= 3);

            const sections = document.querySelectorAll('.favorites-grid');
            if (sections[0]) renderFavoritesGrid(sections[0], headphones);
            if (sections[1]) renderFavoritesGrid(sections[1], wirelessHeadphones);
        }
    }
}

function renderFavoritesGrid(container, items) {
    container.innerHTML = items.map(item => `
        <div class="favorite-item">
            <div class="favorite-header">
                <span class="favorite-heart" onclick="toggleFavorite('${item.id}')">♥</span>
            </div>
            <img src="${item.image}" alt="${item.name}" class="favorite-image">
            <h4 class="favorite-name">${item.name}</h4>
            <p class="favorite-price">${item.price} ₸</p>
            <div class="favorite-rating">
                <span class="favorite-star">★</span>
                <span class="favorite-rating-value">${item.rating || 4.7}</span>
            </div>
            <div class="favorite-actions">
                <button class="favorite-btn" onclick="viewProduct('${item.id}')">Подробнее</button>
                <button class="favorite-btn add-to-cart" onclick="addToCart('${item.id}')">В корзину</button>
            </div>
        </div>
    `).join('');
}

function toggleFavorite(productId) {
    const item = favorites.items.find(i => i.id === productId);
    if (item) {
        favorites.removeItem(productId);
        renderFavoritesPage();
    }
}

function viewProduct(productId) {
    alert(`Перейти к товару: ${productId}`);
    // TODO: Перейти на страницу товара
}

function addToCart(productId) {
    const item = favorites.items.find(i => i.id === productId);
    if (item && cart) {
        cart.addItem({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: 1
        });
        alert('Товар добавлен в корзину');
    }
}

// Функция для работы с избранным (сердечко)
document.addEventListener('DOMContentLoaded', function() {
    const hearts = document.querySelectorAll('.heart');
    
    hearts.forEach(heart => {
        heart.addEventListener('click', function(e) {
            e.preventDefault();
            this.classList.toggle('filled');
            
            // Получить ID товара из ближайшей карточки
            const card = this.closest('.product-card');
            if (card) {
                const productId = card.dataset.id || 'sample-' + Math.random();
                const product = {
                    id: productId,
                    name: card.querySelector('.product-card h4')?.textContent || 'Товар',
                    price: parseInt(card.querySelector('.price')?.textContent) || 0,
                    image: card.querySelector('img')?.src || '',
                    rating: card.querySelector('.rating-value')?.textContent || 4.7
                };
                
                if (this.classList.contains('filled')) {
                    favorites.addItem(product);
                } else {
                    favorites.removeItem(productId);
                }
            }
        });
    });
    
    renderFavoritesPage();
});

// Функция оформления заказа
function completeOrder() {
    const phone = document.querySelector('.phone-input');
    const city = document.querySelector('select');
    const street = document.querySelector('input[placeholder="Улица / Район"]');

    if (!phone || !phone.value.trim()) {
        alert('Пожалуйста, укажите номер телефона');
        return;
    }

    if (!city || !city.value) {
        alert('Пожалуйста, выберите город');
        return;
    }

    if (!street || !street.value.trim()) {
        alert('Пожалуйста, укажите улицу');
        return;
    }

    // TODO: Отправить заказ на сервер
    alert('Заказ успешно оформлен! Номер: 12345');
    // Очистить корзину
    localStorage.removeItem('cart');
    // Перенаправить на главную
    window.location.href = 'index.php';
}

// Инициализация корзины при загрузке страницы
let cart;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        cart = new ShoppingCart();
    });
} else {
    cart = new ShoppingCart();
}