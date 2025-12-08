// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Элементы интерфейса
    const buttonAuth = document.querySelector('.button-auth');
    const buttonOut = document.querySelector('.button-out');
    const buttonCart = document.querySelector('.button-cart');
    const userName = document.querySelector('.user-name');
    const modalAuth = document.querySelector('.modal-auth');
    const closeAuth = document.querySelector('.close-auth');
    const logInForm = document.getElementById('logInForm');
    const loginInput = document.getElementById('login');
    const passwordInput = document.getElementById('password');
    
    // Проверяем, существует ли кнопка выхода (может быть не на всех страницах)
    if (!buttonOut) {
        console.warn('Кнопка выхода не найдена');
    }
    
    // Проверяем, существует ли кнопка корзины
    if (!buttonCart) {
        console.warn('Кнопка корзины не найдена');
    }
    
    // Проверяем авторизацию при загрузке страницы
    const currentUser = localStorage.getItem('userName');
    
    // Функция для обновления интерфейса в зависимости от статуса авторизации
    function updateAuthUI() {
        const userName = localStorage.getItem('userName');
        
        if (userName) {
            // Пользователь авторизован
            if (buttonAuth) buttonAuth.style.display = 'none';
            if (buttonOut) buttonOut.style.display = 'flex';
            if (document.querySelector('.user-name')) {
                document.querySelector('.user-name').textContent = userName;
                document.querySelector('.user-name').style.display = 'block';
            }
        } else {
            // Пользователь не авторизован
            if (buttonAuth) buttonAuth.style.display = 'flex';
            if (buttonOut) buttonOut.style.display = 'none';
            if (document.querySelector('.user-name')) {
                document.querySelector('.user-name').style.display = 'none';
                document.querySelector('.user-name').textContent = '';
            }
        }
    }
    
    // Инициализация интерфейса при загрузке
    updateAuthUI();
    
    // Открытие модального окна авторизации
    buttonAuth.addEventListener('click', function(e) {
        e.preventDefault();
        modalAuth.classList.add('is-open');
        loginInput.focus();
    });
    
    // Закрытие модального окна авторизации
    closeAuth.addEventListener('click', function() {
        modalAuth.classList.remove('is-open');
        clearInputStyles();
    });
    
    // Закрытие модального окна при клике вне его
    modalAuth.addEventListener('click', function(e) {
        if (e.target === modalAuth) {
            modalAuth.classList.remove('is-open');
            clearInputStyles();
        }
    });
    
    // Функция для очистки стилей ошибок
    function clearInputStyles() {
        loginInput.style.borderColor = '';
        loginInput.style.boxShadow = '';
        // Очищаем сообщение об ошибке, если оно есть
        const existingError = document.querySelector('.login-error');
        if (existingError) {
            existingError.remove();
        }
    }
    
    // Функция для показа ошибки
    function showError(input, message) {
        clearInputStyles();
        
        // Устанавливаем красную рамку
        input.style.borderColor = '#ff3333';
        input.style.boxShadow = '0 0 5px rgba(255, 51, 51, 0.3)';
        
        // Создаем сообщение об ошибке
        const errorDiv = document.createElement('div');
        errorDiv.className = 'login-error';
        errorDiv.style.color = '#ff3333';
        errorDiv.style.fontSize = '14px';
        errorDiv.style.marginTop = '5px';
        errorDiv.style.marginLeft = '5px';
        errorDiv.textContent = message;
        
        // Вставляем сообщение после input
        input.parentNode.appendChild(errorDiv);
        
        // Фокусируемся на поле с ошибкой
        input.focus();
    }
    
    // Обработка формы авторизации
    logInForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const login = loginInput.value.trim();
        const password = passwordInput.value.trim();
        
        // Очищаем предыдущие стили ошибок
        clearInputStyles();
        
        // Проверяем, введен ли логин
        if (!login) {
            showError(loginInput, 'Будь ласка, введіть логін для авторизації');
            return;
        }
        
        // Проверяем, введен ли пароль (опционально, если требуется)
        if (!password) {
            showError(passwordInput, 'Будь ласка, введіть пароль');
            return;
        }
        
        // Сохраняем данные пользователя (в реальном приложении здесь был бы запрос к серверу)
        localStorage.setItem('userName', login);
        
        // Очищаем поля формы
        loginInput.value = '';
        passwordInput.value = '';
        
        // Закрываем модальное окно
        modalAuth.classList.remove('is-open');
        
        // Обновляем интерфейс
        updateAuthUI();
        
        // Показываем уведомление об успешной авторизации
        showSuccessNotification(`Вітаємо, ${login}! Ви успішно авторизувалися.`);
    });
    
    // Функция для показа уведомления об успешной авторизации
    function showSuccessNotification(message) {
        // Создаем элемент уведомления
        const notification = document.createElement('div');
        notification.className = 'auth-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #4CAF50;
            color: white;
            padding: 15px 25px;
            border-radius: 4px;
            z-index: 1000;
            font-size: 16px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            animation: fadeInOut 3s ease-in-out;
        `;
        
        // Добавляем стили для анимации
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInOut {
                0% { opacity: 0; transform: translateY(-20px); }
                15% { opacity: 1; transform: translateY(0); }
                85% { opacity: 1; transform: translateY(0); }
                100% { opacity: 0; transform: translateY(-20px); }
            }
        `;
        document.head.appendChild(style);
        
        // Добавляем уведомление на страницу
        document.body.appendChild(notification);
        
        // Удаляем уведомление через 3 секунды
        setTimeout(() => {
            notification.remove();
            style.remove();
        }, 3000);
    }
    
    // Обработка выхода из системы
    if (buttonOut) {
        buttonOut.addEventListener('click', function() {
            // Удаляем данные пользователя из localStorage
            localStorage.removeItem('userName');
            
            // Обновляем интерфейс
            updateAuthUI();
            
            // Показываем уведомление о выходе
            showLogoutNotification('Ви вийшли з системи');
        });
    }
    
    // Функция для показа уведомления о выходе
    function showLogoutNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'logout-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #1890ff;
            color: white;
            padding: 15px 25px;
            border-radius: 4px;
            z-index: 1000;
            font-size: 16px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            animation: fadeInOut 3s ease-in-out;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
    
    // Добавляем стили для ошибок в CSS
    const style = document.createElement('style');
    style.textContent = `
        .login-error {
            color: #ff3333;
            font-size: 14px;
            margin-top: 5px;
            margin-left: 5px;
            animation: fadeIn 0.3s ease-in-out;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        /* Стили для выделения поля с ошибкой */
        input.error {
            border-color: #ff3333 !important;
            box-shadow: 0 0 5px rgba(255, 51, 51, 0.3) !important;
        }
    `;
    document.head.appendChild(style);
    
    // Добавляем функциональность для корзины (если она есть на странице)
    if (document.getElementById('cart-button')) {
        const cartButton = document.getElementById('cart-button');
        const modalCart = document.querySelector('.modal-cart');
        const closeCart = modalCart.querySelector('.close');
        
        // Открытие корзины
        cartButton.addEventListener('click', function() {
            modalCart.classList.add('is-open');
        });
        
        // Закрытие корзины
        closeCart.addEventListener('click', function() {
            modalCart.classList.remove('is-open');
        });
        
        // Закрытие корзины при клике вне ее
        modalCart.addEventListener('click', function(e) {
            if (e.target === modalCart) {
                modalCart.classList.remove('is-open');
            }
        });
    }
    
    // Добавляем функциональность для кнопок в корзине (если она есть на странице)
    const clearCartButton = document.querySelector('.clear-cart');
    if (clearCartButton) {
        clearCartButton.addEventListener('click', function() {
            const modalCart = document.querySelector('.modal-cart');
            modalCart.classList.remove('is-open');
        });
    }
    
    // Функция для кнопок добавления в корзину на странице ресторана
    const addToCartButtons = document.querySelectorAll('.button-add-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Получаем информацию о товаре
            const card = this.closest('.card');
            const productName = card.querySelector('.card-title').textContent;
            const productPrice = card.querySelector('.card-price-bold').textContent;
            
            // В реальном приложении здесь была бы логика добавления в корзину
            console.log(`Добавлено в корзину: ${productName} за ${productPrice}`);
            
            // Показываем уведомление
            showCartNotification(`"${productName}" додано до кошика!`);
        });
    });
    
    // Функция для показа уведомления о добавлении в корзину
    function showCartNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #1890ff;
            color: white;
            padding: 15px 25px;
            border-radius: 4px;
            z-index: 1000;
            font-size: 16px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            animation: fadeInOut 3s ease-in-out;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
});