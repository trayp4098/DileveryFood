const restaurantsData = [
    {
        id: 1,
        name: "Піца плюс",
        image: "img/pizza-plus/preview.jpg",
        deliveryTime: "50 хвилин",
        rating: 4.5,
        minPrice: "200 ₴",
        category: "Піца",
        link: "restaurant.html?id=1",
        description: "Ресторан 'Піца Плюс' — це справжня італійська піца з тонкою скоринкою та найсвіжішими інгредієнтами.",
        color: "linear-gradient(135deg, #ff6b6b, #ff8e53)",
        tags: ["🍕 Найкраща піца в місті", "🚚 Швидка доставка", "🔥 Прямо з печі"],
        menu: [
            {
                id: 101,
                name: "Піца Везувій",
                image: "img/pizza-plus/pizza-vesuvius.jpg",
                description: "Соус томатний, сир «Моцарелла», шинка, пепероні, перець «Халапінє», соус «Табаско», томати.",
                price: "545 ₴",
                category: "Піца",
                popular: true
            },
            {
                id: 102,
                name: "Піца BBQ",
                image: "img/pizza-plus/pizza-girls.jpg",
                description: "Соус томатний, пісне тісто, нежирний сир, кукурудза, цибуля, маслини, гриби, помідори, болгарський перець",
                price: "150 ₴",
                category: "Піца",
                popular: true
            },
            {
                id: 103,
                name: "Піца Оле-Оле",
                image: "img/pizza-plus/pizza-oleole.jpg",
                description: "Соус томатний, сир «Моцарелла», чері, маслини, зелень, майонез",
                price: "440 ₴",
                category: "Піца",
                popular: false
            },
            {
                id: 104,
                name: "Піца Гавайська",
                image: "img/pizza-plus/pizza-hawaiian.jpg",
                description: "Соус томатний, сир «Моцарелла», шинка, ананаси",
                price: "340 ₴",
                category: "Піца",
                popular: true
            }
        ]
    },
    {
        id: 2,
        name: "Танукі",
        image: "img/tanuki/preview.jpg",
        deliveryTime: "60 хвилин",
        rating: 4.5,
        minPrice: "1 200 ₴",
        category: "Суші, роли",
        link: "restaurant.html?id=2",
        description: "Ресторан 'Танукі' — це справжня японська кухня. Ми готуємо суші та роли з найсвіжіших морепродуктів.",
        color: "linear-gradient(135deg, #36D1DC, #5B86E5)",
        tags: ["🍣 Найсвіжіші морепродукти", "🎌 Справжня японська кухня", "🚚 Швидка доставка"],
        menu: [
            {
                id: 201,
                name: "Сет Танукі",
                image: "img/tanuki/tanuki.jpg",
                description: "8 штук: роли Філадельфія, Каліфорнія, з лососем, з тунцем, з вугрем",
                price: "850 ₴",
                category: "Сети",
                popular: true,
                pieces: 8
            },
            {
                id: 202,
                name: "Роли Філадельфія",
                image: "img/tanuki/smoke.jpg",
                description: "8 штук: лосось, сир Філадельфія, огірок, авокадо",
                price: "320 ₴",
                category: "Роли",
                popular: true,
                pieces: 8
            },
            {
                id: 203,
                name: "Суші Нісуаз",
                image: "img/tanuki/nisuaz.jpg",
                description: "6 штук: свіжий лосось, рис, норі",
                price: "220 ₴",
                category: "Суші",
                popular: true,
                pieces: 6
            },
            {
                id: 204,
                name: "Суші Блек Дракон",
                image: "img/tanuki/black.jpg",
                description: "6 штук: вугор, соус унагі, кунжут, рис",
                price: "350 ₴",
                category: "Суші",
                popular: true,
                pieces: 6
            },
            {
                id: 205,
                name: "Роли Ажі",
                image: "img/tanuki/azhi.jpg",
                description: "8 штук: норі, сир Філадельфія, огірок, авокадо",
                price: "320 ₴",
                category: "Роли",
                popular: true,
                pieces: 8
            },
            {
                id: 206,
                name: "Роли Спрінг Фреш",
                image: "img/tanuki/fresh.jpg",
                description: "8 штук: лосось, сир Філадельфія, огірок, авокадо",
                price: "320 ₴",
                category: "Роли",
                popular: true,
                pieces: 8
            },
        ]
    },
    {
        id: 3,
        name: "FoodBand",
        image: "img/food-band/preview.jpg",
        deliveryTime: "40 хвилин",
        rating: 4.5,
        minPrice: "150 ₴",
        category: "Піца",
        link: "restaurant.html?id=3",
        description: "FoodBand — ресторан з європейською кухнею та широким вибором страв.",
        color: "linear-gradient(135deg, #4CAF50, #8BC34A)",
        tags: ["🍽️ Європейська кухня", "🚚 Швидка доставка", "💰 Доступні ціни"],
        menu: [
            {
                id: 301,
                name: "Піца Маргарита",
                image: "img/food-band/margarita.jpg",
                description: "Класична піца з томатним соусом, моцарелою та базиліком",
                price: "180 ₴",
                category: "Піца",
                popular: true
            },
            {
                id: 302,
                name: "Піца Пепероні",
                image: "img/food-band/pepperoni.jpg",
                description: "Піца з салямі пепероні та сиром моцарела",
                price: "220 ₴",
                category: "Піца",
                popular: true
            },
            {
                id: 303,
                name: "Піца М'ясна",
                image: "img/food-band/meet.jpg",
                description: "Піца з томатним соусом, моцарелою, ковбасою, беконом та шинкою",
                price: "250 ₴",
                category: "Піца",
                popular: true
            },
            {
                id: 304,
                name: "Піца Норвезька",
                image: "img/food-band/norwegian.jpg",
                description: "Піца з томатним соусом, моцарелою, лососем та каперсами",
                price: "280 ₴",
                category: "Піца",
                popular: true
            },
            {
                id: 305,
                name: "Піца Том Ям",
                image: "img/food-band/tom-yam.jpg",
                description: "Піца з соусом том ям, моцарелою, креветками та овочами",
                price: "270 ₴",
                category: "Піца",
                popular: true
            },
            {
                id: 306,
                name: "Піца Сім Сирів",
                image: "img/food-band/seven-cheeses.jpg",
                description: "Піца з томатним соусом та сімома різними видами сиру",
                price: "300 ₴",
                category: "Піца",
                popular: true
            }
        ]
    },
    {
        id: 4,
        name: "Ikigai",
        image: "img/palki-skalki/preview.jpg",
        deliveryTime: "55 хвилин",
        rating: 4.5,
        minPrice: "250 ₴",
        category: "Піца",
        link: "restaurant.html?id=4",
        description: "Ikigai — сучасний ресторан з авторською кухнею.",
        color: "linear-gradient(135deg, #9C27B0, #E91E63)",
        tags: ["🎨 Авторська кухня", "🌟 Сучасний дизайн", "🚚 Швидка доставка"],
        menu: [
            {
                id: 401,
                name: "Буріто",
                image: "img/palki-skalki/burrito.jpg",
                description: "Мексиканське буріто з куркою, овочами та соусом",
                price: "220 ₴",
                category: "Мексиканська кухня",
                popular: true
            },
            {
                id: 402,
                name: "Чізбургер",
                image: "img/palki-skalki/cheeseburger.jpg",
                description: "Класичний чізбургер з яловичиною, сиром та овочами",
                price: "180 ₴",
                category: "Бургери",
                popular: true
            },
            {
                id: 403,
                name: "Комбо-обід",
                image: "img/palki-skalki/combo.jpg",
                description: "Комплексний обід з першою та другою стравою",
                price: "320 ₴",
                category: "Комбо",
                popular: true
            },
            {
                id: 404,
                name: "Ф'южн піца",
                image: "img/palki-skalki/fusion.jpg",
                description: "Авторська піца з поєднанням європейських та азійських інгредієнтів",
                price: "380 ₴",
                category: "Піца",
                popular: true
            },
            {
                id: 405,
                name: "Піца Римська",
                image: "img/palki-skalki/rome.jpg",
                description: "Піца з томатним соусом, моцарелою, артишоками та прошутто",
                price: "360 ₴",
                category: "Піца",
                popular: true
            },
            {
                id: 406,
                name: "Удон з овочами",
                image: "img/palki-skalki/udon.jpg",
                description: "Японська локшина удон з овочами та соєвим соусом",
                price: "240 ₴",
                category: "Азійська кухня",
                popular: true
            },
            
        ]
    },
    {
        id: 5,
        name: "Пузата хата",
        image: "img/gusi-lebedi/preview.jpg",
        deliveryTime: "75 хвилин",
        rating: 4.5,
        minPrice: "300 ₴",
        category: "Українські страви",
        link: "restaurant.html?id=5",
        description: "Ресторан української кухні 'Пузата хата' — смак традицій та гостинності.",
        color: "linear-gradient(135deg, #FF9800, #FF5722)",
        tags: ["🇺🇦 Українська кухня", "🥘 Традиційні страви", "🚚 Швидка доставка"],
        menu: [
            {
                id: 501,
                name: "Телятина під соусом",
                image: "img/gusi-lebedi/calf-sauce.jpg",
                description: "Ніжна телятина під вершковим соусом з грибами",
                price: "280 ₴",
                category: "Другі страви",
                popular: true
            },
            {
                id: 502,
                name: "Курча табака",
                image: "img/gusi-lebedi/chick.jpg",
                description: "Курча, смажене під пресом з грузинськими спеціями",
                price: "240 ₴",
                category: "Другі страви",
                popular: true
            },
            {
                id: 503,
                name: "Курячий суп",
                image: "img/gusi-lebedi/chicken-soup.jpg",
                description: "Ароматний курячий суп з локшиною та зеленню",
                price: "120 ₴",
                category: "Перші страви",
                popular: true
            },
            {
                id: 504,
                name: "Пельмені",
                image: "img/gusi-lebedi/dumplings.jpg",
                description: "Домашні пельмені з м'ясом та сметаною",
                price: "160 ₴",
                category: "Другі страви",
                popular: true
            },
            {
                id: 505,
                name: "Вуха",
                image: "img/gusi-lebedi/ear.jpg",
                description: "Українські вуха з рибою та овочами",
                price: "140 ₴",
                category: "Перші страви",
                popular: true
            },
            {
                id: 506,
                name: "Свиняча відбивна",
                image: "img/gusi-lebedi/pig-chop.jpg",
                description: "Соковита свиняча відбивна з картоплею",
                price: "220 ₴",
                category: "Другі страви",
                popular: true
            },
            {
                id: 507,
                name: "Плов",
                image: "img/gusi-lebedi/plov.jpg",
                description: "Східний плов з бараниною та спеціями",
                price: "200 ₴",
                category: "Другі страви",
                popular: true
            },
            {
                id: 508,
                name: "Судак",
                image: "img/gusi-lebedi/zander.jpg",
                description: "Судак, запечений з овочами та лимоном",
                price: "260 ₴",
                category: "Рибні страви",
                popular: true
            },
            {
                id: 509,
                name: "Кальмар гриль",
                image: "img/gusi-lebedi/squid.jpg",
                description: "Кальмар на грилі з оливковою олією та часником",
                price: "280 ₴",
                category: "Рибні страви",
                popular: true
            }
        ]
    },
    {
        id: 6,
        name: "PizzaBurger",
        image: "img/pizza-burger/preview.jpg",
        deliveryTime: "45 хвилин",
        rating: 4.5,
        minPrice: "700 ₴",
        category: "Піца",
        link: "restaurant.html?id=6",
        description: "PizzaBurger — унікальне поєднання піци та бургерів.",
        color: "linear-gradient(135deg, #795548, #3E2723)",
        tags: ["🍕 Піца та бургери", "🍔 Унікальні страви", "🚚 Швидка доставка"],
        menu: [
            {
                id: 601,
                name: "Піца Цезар",
                image: "img/pizza-burger/pizza-caesar.jpg",
                description: "Піца з куркою, айсбергом, соусом Цезар та пармезаном",
                price: "380 ₴",
                category: "Піца",
                popular: true
            },
            {
                id: 602,
                name: "Піца Шеф",
                image: "img/pizza-burger/pizza-chef.jpg",
                description: "Фірмова піца шеф-кухаря з авторськими інгредієнтами",
                price: "420 ₴",
                category: "Піца",
                popular: false
            },
            {
                id: 603,
                name: "Піца Дача",
                image: "img/pizza-burger/pizza-dacha.jpg",
                description: "Піца з грибами, ковбасою та свіжими овочами",
                price: "350 ₴",
                category: "Піца",
                popular: true
            },
            {
                id: 604,
                name: "М'ясна піца",
                image: "img/pizza-burger/pizza-meat.jpg",
                description: "Піца з різними видами м'яса: бекон, салямі, шинка",
                price: "400 ₴",
                category: "Піца",
                popular: false
            },
            {
                id: 605,
                name: "Піца Пепероні",
                image: "img/pizza-burger/pizza-pepperoni.jpg",
                description: "Класична піца з салямі пепероні та моцарелою",
                price: "370 ₴",
                category: "Піца",
                popular: true
            },
            {
                id: 606,
                name: "Піца Селянська",
                image: "img/pizza-burger/pizza-village.jpg",
                description: "Піца з картоплею, беконом, цибулею та сметаною",
                price: "340 ₴",
                category: "Піца",
                popular: false
            }
        ]
    }
];

// Экспортируем функции для работы с данными
window.restaurantsData = restaurantsData;

// Функция для получения ресторана по ID
window.getRestaurantById = function(id) {
    return restaurantsData.find(restaurant => restaurant.id === parseInt(id));
};

// Функция для получения всех ресторанов
window.getAllRestaurants = function() {
    return restaurantsData;
};

// Функция для поиска ресторанов
window.searchRestaurants = function(query) {
    const lowerQuery = query.toLowerCase();
    return restaurantsData.filter(restaurant => 
        restaurant.name.toLowerCase().includes(lowerQuery) ||
        restaurant.category.toLowerCase().includes(lowerQuery) ||
        restaurant.description.toLowerCase().includes(lowerQuery)
    );
};