// Главный файл для инициализации приложения
class DeliveryFoodApp {
    constructor() {
        this.init();
    }
    
    init() {
        // Ждем загрузки DOM
        document.addEventListener('DOMContentLoaded', () => {
            // Инициализируем основные модули
            this.initRestaurants();
            this.initAuth();
            this.initCart();
            
            // Показываем версию приложения
            console.log('Delivery Food App v1.0.0');
        });
    }
    
    initRestaurants() {
        // Инициализация модуля ресторанов
        if (document.querySelector('.cards-restaurants')) {
            console.log('Restaurants module initialized');
        }
    }
    
    initAuth() {
        // Инициализация модуля авторизации
        if (document.querySelector('.button-auth')) {
            console.log('Auth module initialized');
        }
    }
    
    initCart() {
        // Инициализация модуля корзины
        if (document.querySelector('.button-cart')) {
            console.log('Cart module initialized');
        }
    }
}

// Создаем экземпляр приложения
new DeliveryFoodApp();