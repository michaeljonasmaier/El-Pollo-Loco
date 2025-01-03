let canvas;
let world;
let keyboard = new Keyboard();
let gameover = false;
let time;
let isPaused = false;
let pauseScreen;

function init() {
    initLevel();
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
    pauseScreen = document.getElementById("pausescreen");
    gameLoop();
}

function gameLoop() {
    if (!isPaused) {
        world.draw();
    } else {
        pauseScreen.showModal();
    }
    animationFrame = requestAnimationFrame(gameLoop);
}

function gameEnd(score, won, bestScores) {
    showEndscreen(score, won, bestScores);
}

function backToGame() {
    pauseScreen.close();
    isPaused = false;
}

function showMenu() {
    clearAllIntervals();
    pauseScreen.close();
    isPaused = false;
    let startDialog = document.getElementById("startscreen");
    startDialog.style.display = "block";
}

function clearAllIntervals() {
    for (let i = 0; i < 9999; i++) {
        window.clearInterval(i);
    }
}

window.addEventListener('keydown', (event) => {
    if (event.key == "ArrowRight") {
        keyboard.RIGHT = true;
    }

    if (event.key == "ArrowLeft") {
        keyboard.LEFT = true;
    }

    if (event.key == "ArrowUp") {
        keyboard.UP = true;
    }

    if (event.key == "ArrowDown") {
        keyboard.DOWN = true;
    }

    if (event.code == "Space") {
        keyboard.SPACE = true;
    }

    if (event.code == "KeyB") {
        keyboard.B = true;
        world.collectBottleOnGround();
    }

    if (event.code == "KeyD" && !keyboard.D) {
        keyboard.D = true;
        world.throwObject();
    }

    if (event.code == "Escape") {
        if (isPaused) {
            isPaused = false;
        } else {
            isPaused = true;
        }
    }


})

window.addEventListener('keyup', (event) => {
    if (event.key == "ArrowRight") {
        keyboard.RIGHT = false;
    }

    if (event.key == "ArrowLeft") {
        keyboard.LEFT = false;
    }

    if (event.key == "ArrowUp") {
        keyboard.UP = false;
    }

    if (event.key == "ArrowDown") {
        keyboard.DOWN = false;
    }

    if (event.code == "Space") {
        keyboard.SPACE = false;
    }

    if (event.code == "KeyD") {
        keyboard.D = false;
    }

    if (event.code == "KeyB") {
        keyboard.B = false;
    }
})
