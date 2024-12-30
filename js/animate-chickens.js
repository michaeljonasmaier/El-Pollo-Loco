const chickenCanvas = document.getElementById('chickenCanvas');
const chickenCtx = chickenCanvas.getContext('2d');

let chickenImages = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
];
let currentChickenImage = 0;

let chickenX = cloudCanvas.width;

let loadedImages = chickenImages.map(src => {
    let img = new Image();
    img.src = src;
    return img;
});

Promise.all(loadedImages.map(img => new Promise(resolve => img.onload = resolve))).then(() => {
    setInterval(() => {
        chickenCtx.clearRect(0, 0, chickenCanvas.width, chickenCanvas.height);
        drawChicken();
        currentChickenImage++;
       
    }, 100);
});

function drawChicken() {
    let i = currentChickenImage % loadedImages.length;
    chickenCtx.drawImage(loadedImages[i], chickenX, 350, 100, 100);
    chickenX -= 5;
    if (chickenX + 120 < 0) {
        chickenX = chickenCanvas.width;
    }
}
