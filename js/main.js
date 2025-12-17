document.addEventListener('DOMContentLoaded', function() {
    // Элементы интерфейса
    const buttonAuth = document.querySelector('.button-auth');
    const buttonOut = document.querySelector('.button-out');
    const buttonCart = document.querySelector('.button-cart');
    const userName = document.querySelector('.user-name');
    const modalAuth = document.querySelector('.modal-auth');
    const modalCart = document.querySelector('.modal-cart');
    const closeAuth = document.querySelector('.close-auth');
    const closeCart = modalCart ? modalCart.querySelector('.close') : null;
    const logInForm = document.getElementById('logInForm');
    const loginInput = document.getElementById('login');
    const passwordInput = document.getElementById('password');
    
    // Переменные для управления анимациями
    let shakeTimeout;
    
    // Функция для управления скроллом страницы
    function toggleBodyScroll(disable) {
        if (disable) {
            const scrollY = window.scrollY || document.documentElement.scrollTop;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';
            document.body.style.overflow = 'hidden';
            document.body.dataset.scrollY = scrollY;
            document.body.classList.add('modal-open');
        } else {
            const scrollY = parseInt(document.body.dataset.scrollY || '0', 10);
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            document.body.style.overflow = '';
            document.body.classList.remove('modal-open');
            window.scrollTo(0, scrollY);
            delete document.body.dataset.scrollY;
        }
    }
    
    // Функция для очистки стилей ошибок
    function clearInputStyles() {
        if (loginInput) {
            loginInput.classList.remove('error', 'error-shake');
            loginInput.style.borderColor = '';
            loginInput.style.boxShadow = '';
        }
        
        if (passwordInput) {
            passwordInput.classList.remove('error', 'error-shake');
            passwordInput.style.borderColor = '';
            passwordInput.style.boxShadow = '';
        }
        
        // Очищаем все сообщения об ошибках
        const existingErrors = document.querySelectorAll('.login-error');
        existingErrors.forEach(error => error.remove());
        
        // Очищаем таймаут тряски
        if (shakeTimeout) {
            clearTimeout(shakeTimeout);
        }
    }
    
    // Функция для добавления эффекта тряски
    function addShakeEffect(input) {
        input.classList.add('error-shake');
        
        // Убираем класс тряски после завершения анимации
        shakeTimeout = setTimeout(() => {
            input.classList.remove('error-shake');
        }, 600);
    }
    
    // Функция для показа ошибки для конкретного поля
    function showError(input, message) {
        // Добавляем класс error для красной рамки
        input.classList.add('error');
        
        // Добавляем эффект тряски
        addShakeEffect(input);
        
        // Удаляем предыдущее сообщение об ошибке для этого поля, если есть
        const existingError = input.parentNode.querySelector('.login-error');
        if (existingError) {
            existingError.remove();
        }
        
        // Создаем новое сообщение об ошибке
        const errorDiv = document.createElement('div');
        errorDiv.className = 'login-error';
        errorDiv.innerHTML = `<span class="error-icon">!</span> ${message}`;
        
        // Вставляем сообщение после input
        input.parentNode.appendChild(errorDiv);
    }
    
    // Функция для проверки всех полей и показа ошибок
    function validateForm(login, password) {
        let hasError = false;
        
        // Очищаем предыдущие стили ошибок
        clearInputStyles();
        
        // Проверяем логин
        if (!login) {
            showError(loginInput, 'Будь ласка, введіть логін');
            hasError = true;
        }
        
        // Проверяем пароль
        if (!password) {
            showError(passwordInput, 'Будь ласка, введіть пароль');
            hasError = true;
        }
        
        // Если есть ошибки, фокусируемся на первом поле с ошибкой
        if (hasError) {
            const firstErrorInput = document.querySelector('input.error');
            if (firstErrorInput) {
                firstErrorInput.focus();
            }
        }
        
        return hasError;
    }
    
    // Функция для показа уведомления
    function showNotification(message, type = 'success') {
        // Удаляем предыдущие уведомления
        const existingNotifications = document.querySelectorAll('.auth-notification, .logout-notification, .cart-notification');
        existingNotifications.forEach(notification => notification.remove());
        
        const notification = document.createElement('div');
        notification.className = type === 'success' ? 'auth-notification' : 
                                type === 'logout' ? 'logout-notification' : 
                                'cart-notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Добавляем иконку в зависимости от типа
        const icon = document.createElement('span');
        icon.className = 'notification-icon';
        
        if (type === 'success') {
            icon.textContent = '✓';
        } else if (type === 'logout') {
            icon.textContent = '←';
        } else {
            icon.textContent = '🛒';
        }
        
        notification.prepend(icon);
        
        // Автоматическое удаление уведомления через 3 секунды
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3000);
    }
    
    // Функция для обновления интерфейса авторизации
    function updateAuthUI() {
        const userName = localStorage.getItem('userName');
        const userNameElement = document.querySelector('.user-name');
        const buttonAuth = document.querySelector('.button-auth');
        const buttonOut = document.querySelector('.button-out');
        
        if (userName) {
            // Пользователь авторизован
            if (buttonAuth) buttonAuth.style.display = 'none';
            if (buttonOut) buttonOut.style.display = 'flex';
            if (userNameElement) {
                userNameElement.textContent = `Привіт, ${userName}!`;
                userNameElement.style.display = 'block';
            }
        } else {
            // Пользователь не авторизован
            if (buttonAuth) buttonAuth.style.display = 'flex';
            if (buttonOut) buttonOut.style.display = 'none';
            if (userNameElement) {
                userNameElement.style.display = 'none';
                userNameElement.textContent = '';
            }
        }
    }
    
    // Инициализация интерфейса при загрузке
    updateAuthUI();
    
    // ===== ОБРАБОТКА МОДАЛЬНОГО ОКНА АВТОРИЗАЦИИ =====
    
    // Открытие модального окна авторизации
    buttonAuth.addEventListener('click', function(e) {
        e.preventDefault();
        modalAuth.classList.add('is-open');
        
        // Отключаем скролл страницы
        toggleBodyScroll(true);
        
        // Очищаем стили ошибок и поля при каждом новом открытии
        clearInputStyles();
        if (loginInput) loginInput.value = '';
        if (passwordInput) passwordInput.value = '';
        
        // Фокусируемся на поле логина
        if (loginInput) loginInput.focus();
    });
    
    // Закрытие модального окна авторизации
    closeAuth.addEventListener('click', function() {
        modalAuth.classList.remove('is-open');
        clearInputStyles();
        toggleBodyScroll(false);
    });
    
    // Закрытие модального окна при клике вне его
    modalAuth.addEventListener('click', function(e) {
        if (e.target === modalAuth) {
            modalAuth.classList.remove('is-open');
            clearInputStyles();
            toggleBodyScroll(false);
        }
    });
    
    // Обработка формы авторизации
    logInForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const login = loginInput.value.trim();
        const password = passwordInput.value.trim();
        
        // Проверяем все поля
        const hasError = validateForm(login, password);
        
        // Если есть ошибки - прерываем
        if (hasError) {
            // Показываем общее сообщение об ошибке
            showNotification('Будь ласка, заповніть всі поля', 'cart');
            return;
        }
        
        // Сохраняем данные пользователя
        localStorage.setItem('userName', login);
        
        // Очищаем поля формы
        loginInput.value = '';
        passwordInput.value = '';
        
        // Закрываем модальное окно
        modalAuth.classList.remove('is-open');
        
        // Включаем скролл страницы
        toggleBodyScroll(false);
        
        // Обновляем интерфейс
        updateAuthUI();
        
        // Показываем уведомление
        showNotification(`Вітаємо, ${login}! Ви успішно авторизувалися.`, 'success');
    });
    
    // ===== ОБРАБОТКА МОДАЛЬНОГО ОКНА КОРЗИНЫ =====
    
    // Открытие корзины
    if (buttonCart) {
        buttonCart.addEventListener('click', function() {
            modalCart.classList.add('is-open');
            toggleBodyScroll(true);
        });
    }
    
    // Закрытие корзины
    if (closeCart) {
        closeCart.addEventListener('click', function() {
            modalCart.classList.remove('is-open');
            toggleBodyScroll(false);
        });
    }
    
    // Закрытие корзины при клике вне ее
    if (modalCart) {
        modalCart.addEventListener('click', function(e) {
            if (e.target === modalCart) {
                modalCart.classList.remove('is-open');
                toggleBodyScroll(false);
            }
        });
    }
    
    // ===== ОБРАБОТКА ВЫХОДА ИЗ СИСТЕМЫ =====
    
    if (buttonOut) {
        buttonOut.addEventListener('click', function() {
            // Удаляем данные пользователя
            localStorage.removeItem('userName');
            
            // Обновляем интерфейс
            updateAuthUI();
            
            // Показываем уведомление
            showNotification('Ви вийшли з системи', 'logout');
        });
    }
    
    // ===== ОБРАБОТКА КОРЗИНЫ =====
    
    // Очистка корзины
    const clearCartButton = document.querySelector('.clear-cart');
    if (clearCartButton) {
        clearCartButton.addEventListener('click', function() {
            modalCart.classList.remove('is-open');
            toggleBodyScroll(false);
            showNotification('Кошик очищено', 'cart');
        });
    }
    
    // Добавление товаров в корзину
    const addToCartButtons = document.querySelectorAll('.button-add-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Получаем информацию о товаре
            const card = this.closest('.card');
            const productName = card.querySelector('.card-title').textContent;
            const productPrice = card.querySelector('.card-price-bold').textContent;
            
            // Показываем уведомление
            showNotification(`"${productName}" додано до кошика!`, 'cart');
        });
    });
    
    // ===== ЗАКРЫТИЕ ПО ESC =====
    
    // Закрытие модальных окон по клавише ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (modalAuth.classList.contains('is-open')) {
                modalAuth.classList.remove('is-open');
                clearInputStyles();
                toggleBodyScroll(false);
            }
            if (modalCart && modalCart.classList.contains('is-open')) {
                modalCart.classList.remove('is-open');
                toggleBodyScroll(false);
            }
        }
    });
    
    // ===== ПРОВЕРКА В РЕАЛЬНОМ ВРЕМЕНИ =====
    
    // Убираем ошибку при вводе текста
    if (loginInput) {
        loginInput.addEventListener('input', function() {
            if (this.value.trim()) {
                this.classList.remove('error');
                const errorMsg = this.parentNode.querySelector('.login-error');
                if (errorMsg) errorMsg.remove();
            }
        });
    }
    
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            if (this.value.trim()) {
                this.classList.remove('error');
                const errorMsg = this.parentNode.querySelector('.login-error');
                if (errorMsg) errorMsg.remove();
            }
        });
    }
});