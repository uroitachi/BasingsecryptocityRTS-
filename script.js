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
for (let x = 0; x < mapSize; x++) {
    for (let y = 0; y < mapSize; y++) {
        L.canvas().drawTile = function (ctx, tilePoint, size) {
            ctx.fillStyle = "green";
            ctx.fillRect(0, 0, size.x, size.y);
            ctx.strokeStyle = "rgba(0, 0, 0, 0.1)";
            ctx.strokeRect(0, 0, size.x, size.y);
        };
    }
}

// Установка размера карты
const mapBounds = [
    [0, 0],
    [mapSize * tileSize, mapSize * tileSize]
];
const mapLayer = L.imageOverlay("", mapBounds).addTo(map);

// Центрирование карты
map.fitBounds(mapBounds);

// Обработка кликов на карте
map.on("click", function (e) {
    const x = Math.floor(e.latlng.lat / tileSize);
    const y = Math.floor(e.latlng.lng / tileSize);

    // Отображение меню выбора действия
    const action = prompt("Выберите действие:\n1. Построить\n2. Исследовать");
    if (action === "1") {
        alert(`Вы выбрали построить на тайле: (${x}, ${y})`);
    } else if (action === "2") {
        alert(`Вы выбрали исследовать тайл: (${x}, ${y})`);
    }
});
