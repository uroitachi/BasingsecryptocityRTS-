// Размер карты
const mapSize = 100;

// Создание карты
const map = L.map("map", {
    crs: L.CRS.Simple, // Простая система координат
    minZoom: 1,
    maxZoom: 5,
    zoomSnap: 0.1 // Плавное масштабирование
});

// Размер одного тайла
const tileSize = 50;

// Создание сетки тайлов
function createTile(x, y, type) {
    return L.canvas().drawTile = function (ctx, tilePoint, size) {
        ctx.fillStyle = "green"; // Зелёный фон для всех тайлов
        ctx.fillRect(0, 0, size.x, size.y);
        ctx.strokeStyle = "rgba(0, 0, 0, 0.1)";
        ctx.strokeRect(0, 0, size.x, size.y);

        // Добавление изображений или текста в зависимости от типа тайла
        if (type === "forest") {
            ctx.fillStyle = "brown"; // Лес
            ctx.fillRect(size.x / 2 - 10, size.y / 2 - 10, 20, 20);
        } else if (type === "enemy_structure") {
            ctx.fillStyle = "red"; // Здание противника
            ctx.fillRect(size.x / 2 - 10, size.y / 2 - 10, 20, 20);
        } else if (type === "monster") {
            ctx.fillStyle = "orange"; // Монстр
            ctx.fillRect(size.x / 2 - 10, size.y / 2 - 10, 20, 20);
        } else if (type === "empty") {
            ctx.fillStyle = "gray"; // Пустая клетка
            ctx.fillRect(size.x / 2 - 10, size.y / 2 - 10, 20, 20);
        }
    };
}

// Установка размера карты
const mapBounds = [
    [0, 0],
    [mapSize * tileSize, mapSize * tileSize]
];

// Создание слоя карты
const mapLayer = L.imageOverlay("", mapBounds).addTo(map);

// Центрирование карты
map.fitBounds(mapBounds);

// Добавление тайлов
for (let x = 0; x < mapSize; x++) {
    for (let y = 0; y < mapSize; y++) {
        const type = getRandomType(); // Генерация случайного типа тайла
        createTile(x, y, type)(null, null, tileSize);
    }
}

// Генерация случайного типа тайла
function getRandomType() {
    const types = ["empty", "forest", "enemy_structure", "monster"];
    return types[Math.floor(Math.random() * types.length)];
}

// Обработка кликов на карте
map.on("click", function (e) {
    const x = Math.floor(e.latlng.lat / tileSize);
    const y = Math.floor(e.latlng.lng / tileSize);
    const type = getTileType(x, y);

    switch (type) {
        case "empty":
            showBuildMenu(x, y);
            break;
        case "forest":
            showResourceHarvestMenu(x, y);
            break;
        case "enemy_structure":
            showAttackMenu(x, y);
            break;
        case "monster":
            showMonsterAttackMenu(x, y);
            break;
    }
});

// Получение типа тайла
function getTileType(x, y) {
    // Здесь можно хранить типы тайлов в массиве или использовать сервер для получения данных
    return getRandomType(); // Для примера используем случайный тип
}

// Отображение меню выбора постройки
function showBuildMenu(x, y) {
    alert(`Вы выбрали построить на тайле: (${x}, ${y})`);
    const action = prompt("Выберите действие:\n1. Построить главное здание\n2. Построить защитное сооружение\n3. Построить фабрику");
    if (action === "1") {
        alert(`Вы построили главное здание на тайле: (${x}, ${y})`);
    } else if (action === "2") {
        alert(`Вы построили защитное сооружение на тайле: (${x}, ${y})`);
    } else if (action === "3") {
        alert(`Вы построили фабрику на тайле: (${x}, ${y})`);
    }
}

// Отображение меню сбора ресурсов
function showResourceHarvestMenu(x, y) {
    alert(`Вы выбрали собрать ресурсы на тайле: (${x}, ${y})`);
    const action = prompt("Выберите действие:\n1. Собрать древесину\n2. Собрать камень");
    if (action === "1") {
        alert(`Вы собрали древесину на тайле: (${x}, ${y})`);
    } else if (action === "2") {
        alert(`Вы собрали камень на тайле: (${x}, ${y})`);
    }
}

// Отображение меню атаки противника
function showAttackMenu(x, y) {
    alert(`Вы выбрали атаковать здание противника на тайле: (${x}, ${y})`);
    const action = prompt("Выберите действие:\n1. Атаковать с войсками\n2. Атаковать с авиацией");
    if (action === "1") {
        alert(`Вы атаковали здание противника с войсками на тайле: (${x}, ${y})`);
    } else if (action === "2") {
        alert(`Вы атаковали здание противника с авиацией на тайле: (${x}, ${y})`);
    }
}

// Отображение меню атаки монстра
function showMonsterAttackMenu(x, y) {
    alert(`Вы выбрали атаковать монстра на тайле: (${x}, ${y})`);
    const action = prompt("Выберите действие:\n1. Атаковать с войсками\n2. Атаковать с магией");
    if (action === "1") {
        alert(`Вы атаковали монстра с войсками на тайле: (${x}, ${y})`);
    } else if (action === "2") {
        alert(`Вы атаковали монстра с магией на тайле: (${x}, ${y})`);
    }
}
