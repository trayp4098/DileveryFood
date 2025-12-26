// restaurant-loader.js - загрузка и отображение данных ресторана

document.addEventListener('DOMContentLoaded', function() {
    // Проверка авторизации
    const isLoggedIn = !!localStorage.getItem('userName');
    
    if (!isLoggedIn) {
        localStorage.setItem('returnTo', window.location.href);
        alert('Будь ласка, авторизуйтеся для перегляду меню ресторану');
        window.location.href = 'index.html';
        return;
    }
    
    // Получаем ID ресторана из URL
    const urlParams = new URLSearchParams(window.location.search);
    const restaurantId = urlParams.get('id');
    
    if (!restaurantId) {
        showErrorMessage('Ресторан не знайдений');
        return;
    }
    
    // Ждем загрузки данных ресторанов
    if (typeof getRestaurantById === 'function') {
        loadRestaurantData(restaurantId);
    } else {
        // Если данные еще не загружены, ждем
        setTimeout(() => {
            if (typeof getRestaurantById === 'function') {
                loadRestaurantData(restaurantId);
            } else {
                showErrorMessage('Помилка завантаження даних');
            }
        }, 1000);
    }
});

// Функция загрузки данных ресторана
function loadRestaurantData(restaurantId) {
    const restaurant = getRestaurantById(parseInt(restaurantId));
    
    if (!restaurant) {
        showErrorMessage('Ресторан не знайдений');
        return;
    }
    
    // Обновляем заголовок страницы
    document.title = `${restaurant.name} — Delivery Food`;
    
    // Отображаем данные ресторана
    renderRestaurantHeader(restaurant);
    renderRestaurantMenu(restaurant.menu);
    
    // Обновляем навигацию
    updateBreadcrumb(restaurant.name);
}

// Функция отображения заголовка ресторана
function renderRestaurantHeader(restaurant) {
    const headerContainer = document.getElementById('restaurant-header-container');
    
    if (!headerContainer) return;
    
    // Создаем стили для этого ресторана
    const style = document.createElement('style');
    style.textContent = `
        .restaurant-header-${restaurant.id} {
            background: ${restaurant.color} url(${restaurant.image}) no-repeat center;
            background-size: cover;
        }
        
        .restaurant-header-${restaurant.id}::before {
            background: ${restaurant.color.replace('gradient', 'gradient').replace('135deg,', '135deg,')};
        }
    `;
    document.head.appendChild(style);
    
    // Создаем HTML заголовка
    headerContainer.innerHTML = `
        <div class="back-button" onclick="window.history.back()">
            ← Назад до ресторанів
        </div>
        <section class="restaurant-header restaurant-header-${restaurant.id}">
            <div class="restaurant-header-content">
                <h2 class="section-title restaurant-title" style="color: white; margin-bottom: 15px; font-size: 42px;">
                    ${restaurant.name}
                </h2>
                <div class="card-info" style="color: white; margin-bottom: 20px;">
                    <div class="rating" style="color: #ffc107; font-size: 20px;">
                        ${restaurant.rating} ★
                    </div>
                    <div class="price" style="font-size: 18px;">Від ${restaurant.minPrice}</div>
                    <div class="category" style="font-size: 18px;">${restaurant.category}</div>
                    <div class="delivery-time" style="font-size: 18px; margin-top: 5px;">⏰ ${restaurant.deliveryTime}</div>
                </div>
                
                <div style="margin-bottom: 20px;">
                    ${restaurant.tags.map(tag => 
                        `<span class="restaurant-tag">${tag}</span>`
                    ).join('')}
                </div>
                
                <p class="restaurant-description" style="color: white; margin-top: 20px; font-size: 18px; line-height: 1.6;">
                    ${restaurant.description}
                </p>
            </div>
        </section>
    `;
}

// Функция отображения меню ресторана
function renderRestaurantMenu(menuItems) {
    const menuContainer = document.getElementById('restaurant-menu');
    const menuTitle = document.getElementById('menu-title');
    
    if (!menuContainer) return;
    
    if (!menuItems || menuItems.length === 0) {
        menuContainer.innerHTML = '<div class="error-message">Меню тимчасово недоступне</div>';
        return;
    }
    
    // Обновляем заголовок меню
    if (menuTitle) {
        menuTitle.textContent = `🍽️ Меню (${menuItems.length} страв)`;
    }
    
    // Создаем карточки меню
    menuContainer.innerHTML = menuItems.map(item => `
        <div class="card ${item.popular ? 'menu-item-popular' : 'menu-item-new'}">
            <img src="${item.image}" alt="${item.name}" class="card-image" />
            <div class="card-text">
                <div class="card-heading">
                    <h3 class="card-title card-title-reg">${item.name}</h3>
                    ${item.popular ? '<span class="card-tag tag" style="background: #ff6b6b;">Популярне</span>' : ''}
                    ${item.pieces ? `<span class="card-tag tag" style="background: #36D1DC;">${item.pieces} шт.</span>` : ''}
                </div>
                <div class="card-info">
                    <div class="ingredients">${item.description}</div>
                    <div style="margin-top: 10px; color: #1890ff; font-weight: bold;">${item.category}</div>
                </div>
                <div class="card-buttons">
                    <button class="button button-primary button-add-cart" 
                            data-id="${item.id}" 
                            data-name="${item.name}" 
                            data-price="${item.price}">
                        <span class="button-card-text">У кошик</span>
                        <span class="button-cart-svg"></span>
                    </button>
                    <strong class="card-price-bold">${item.price}</strong>
                </div>
            </div>
        </div>
    `).join('');
    
    // Добавляем обработчики для кнопок добавления в корзину
    document.querySelectorAll('.button-add-cart').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const itemId = this.getAttribute('data-id');
            const itemName = this.getAttribute('data-name');
            const itemPrice = this.getAttribute('data-price');
            
            // Добавляем товар в корзину
            addToCart(itemId, itemName, itemPrice);
            
            // Показываем уведомление
            showNotification(`"${itemName}" додано до кошика!`, 'cart');
        });
    });
}

// Функция добавления в корзину
function addToCart(itemId, itemName, itemPrice) {
    // Получаем текущую корзину из localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Проверяем, есть ли уже такой товар в корзине
    const existingItemIndex = cart.findIndex(item => item.id === itemId);
    
    if (existingItemIndex >= 0) {
        // Увеличиваем количество
        cart[existingItemIndex].quantity += 1;
    } else {
        // Добавляем новый товар
        cart.push({
            id: itemId,
            name: itemName,
            price: parseFloat(itemPrice.replace(' ₴', '').replace(' ', '')),
            quantity: 1
        });
    }
    
    // Сохраняем корзину
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Обновляем счетчик в корзине
    updateCartCounter();
}

// Функция обновления счетчика корзины
function updateCartCounter() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // Обновляем текст кнопки корзины
    const cartButton = document.querySelector('.button-cart .button-text');
    if (cartButton) {
        cartButton.textContent = `Кошик (${totalItems})`;
    }
}

// Функция показа уведомления
function showNotification(message, type = 'success') {
    const existingNotifications = document.querySelectorAll('.auth-notification, .logout-notification, .cart-notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = type === 'success' ? 'auth-notification' : 
                            type === 'logout' ? 'logout-notification' : 
                            'cart-notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    const icon = document.createElement('span');
    icon.className = 'notification-icon';
    icon.textContent = type === 'cart' ? '🛒' : '✓';
    notification.prepend(icon);
    
    setTimeout(() => {
        if (notification.parentNode) notification.remove();
    }, 3000);
}

// Функция отображения ошибки
function showErrorMessage(message) {
    const headerContainer = document.getElementById('restaurant-header-container');
    const menuContainer = document.getElementById('restaurant-menu');
    
    if (headerContainer) {
        headerContainer.innerHTML = `
            <div class="error-message">
                <h3>${message}</h3>
                <p><a href="index.html" style="color: #1890ff;">Повернутися до ресторанів</a></p>
            </div>
        `;
    }
    
    if (menuContainer) {
        menuContainer.innerHTML = '';
    }
}

// Функция обновления хлебных крошек
function updateBreadcrumb(restaurantName) {
    // Можно добавить навигационную цепочку
    const breadcrumb = document.createElement('div');
    breadcrumb.className = 'breadcrumb';
    breadcrumb.innerHTML = `
        <a href="index.html">Головна</a> › 
        <a href="index.html">Ресторани</a> › 
        <span>${restaurantName}</span>
    `;
    
    const headerContainer = document.getElementById('restaurant-header-container');
    if (headerContainer) {
        headerContainer.insertAdjacentElement('afterbegin', breadcrumb);
    }
}

// Инициализация корзины при загрузке
function initCart() {
    updateCartCounter();
}

// Инициализируем корзину
initCart();