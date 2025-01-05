let canvas;
let world;
let keyboard = new Keyboard();
let gameover = false;
let time;
let isPaused = false;
let pauseScreen;
let sounds = new Sounds();
let soundOn = true;


let leftArrow = document.getElementById("arrow_left");
let rightArrow = document.getElementById("arrow_right");
let jump = document.getElementById("arrow_up");
let bottle = document.getElementById("bottle");
let letterB = document.getElementById("letter_b");

function init() {
    initLevel();
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
    pauseScreen = document.getElementById("pausescreen");
    startBackgroundMusic();
    gameLoop();
}

function startBackgroundMusic(){
    sounds.playSoundIfAllowed(world.backgroundMusic, world.allSounds);
}

function gameLoop() {
    if (!isPaused) {
        world.draw();
        playBackgroundMusic();
    } else {
        pauseScreen.showModal();
        pauseSounds();
    }
    animationFrame = requestAnimationFrame(gameLoop);
}

function gameEnd(score, won, bestScores) {
    showEndscreen(score, won, bestScores);
}

function playFinalMusic(won) {
    if (won) {
        sounds.playSoundIfAllowed(sounds.win_sound);
    } else {
        sounds.playSoundIfAllowed(sounds.lose_sound);
    }
}

function backToGame() {
    pauseScreen.close();
    isPaused = false;
}

function pauseSounds() {
    if (world.allSounds.length > 0) {
        world.allSounds.forEach(sound => {
            sound.pause();
        });
        world.allSounds = [];
    }
}

function playBackgroundMusic(){
    if(!sounds.isPlaying(world.backgroundMusic)){
        sounds.playSoundIfAllowed(world.backgroundMusic, world.allSounds);
    }
}

function showMenu() {
    let endDialog = document.getElementById("endscreen");
    endDialog.style.display = "none";
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

function toggleSound(playSound) {
    let soundIcon = document.getElementById("sound_icon");
    let soundIconMute = document.getElementById("sound_icon_mute");
    if (playSound) {
        soundOn = true;
        soundIcon.classList.remove("d-none");
        soundIconMute.classList.add("d-none");
    } else {
        soundOn = false;
        world.stopAllSounds();
        soundIcon.classList.add("d-none");
        soundIconMute.classList.remove("d-none");
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

leftArrow.addEventListener('touchstart', function () {
    keyboard.LEFT = true;
});

rightArrow.addEventListener('touchstart', function () {
    keyboard.RIGHT = true;
});

jump.addEventListener('touchstart', function () {
    keyboard.SPACE = true;
});

bottle.addEventListener('touchstart', function () {
    if (!keyboard.D) {
        keyboard.D = true;
        world.throwObject();
    }
});

leftArrow.addEventListener('touchend', function () {
    keyboard.LEFT = false;
});

rightArrow.addEventListener('touchend', function () {
    keyboard.RIGHT = false;
});

jump.addEventListener('touchend', function () {
    keyboard.SPACE = false;
});

bottle.addEventListener('touchend', function () {
    keyboard.D = false;
});

letterB.addEventListener('touchend', function () {
    keyboard.B = false;
    letterB.style.display = "none";
});

function collectBottleMobile() {
    if (isTouch()) {
        letterB.style.display = "block";
        letterB.addEventListener('touchstart', function () {
            keyboard.B = true;
            world.collectBottleOnGround();
        });
    }
}

