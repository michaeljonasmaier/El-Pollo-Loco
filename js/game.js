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

/**
 * creates world, starts gameLoop and music
 */
function init() {
    initLevel();
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
    pauseScreen = document.getElementById("pausescreen");
    startBackgroundMusic();
    gameLoop();
}

/**
 * starts background music
 */
function startBackgroundMusic() {
    sounds.playSoundIfAllowed(world.backgroundMusic, world.allSounds);
}

/**
 * checks if paused
 */
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

/**
 * navigates to endscreen
 * @param {integer} score - characters score
 * @param {boolean} won - true or false if character won
 * @param {Array} bestScores - highscore list, sorted scores
 */
function gameEnd(score, won, bestScores) {
    showEndscreen(score, won, bestScores);
}

/**
 * plays music depending if character won
 * @param {boolean} won - true or false if character won
 */
function playFinalMusic(won) {
    if (won) {
        sounds.playSoundIfAllowed(sounds.win_sound, world.allSounds);
    } else {
        sounds.playSoundIfAllowed(sounds.lose_sound, world.allSounds);
    }
}

/**
 * closes pause screen
 */
function backToGame() {
    pauseScreen.close();
    isPaused = false;
}

/**
 * pauses all sounds
 */
function pauseSounds() {
    if (world.allSounds.length > 0) {
        world.allSounds.forEach(sound => {
            sound.pause();
        });
        world.allSounds = [];
    }
}

/**
 * restarts background music after pausing
 */
function playBackgroundMusic() {
    if (!sounds.isPlaying(world.backgroundMusic) && !world.gameover) {
        sounds.playSoundIfAllowed(world.backgroundMusic, world.allSounds);
    }
}

/**
 * displays the start menu
 */
function showMenu() {
    let endDialog = document.getElementById("endscreen");
    endDialog.style.display = "none";
    pauseScreen.close();
    isPaused = false;
    let startDialog = document.getElementById("startscreen");
    startDialog.style.display = "block";
}

/**
 * clears all intervals in window
 */
function clearAllIntervals() {
    for (let i = 0; i < 9999; i++) {
        window.clearInterval(i);
    }
}

/**
 * checks if mute button clicked
 * @param {boolean} playSound - true if sound should be played
 */
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

/**
 * handles bottle collection on mobile. You only can collect it if your next to the bottle
 */
function collectBottleMobile() {
    if (isTouch()) {
        letterB.style.display = "block";
        letterB.addEventListener('touchstart', function () {
            keyboard.B = true;
            world.collectBottleOnGround();
        });
    }
}

/**
 * sets the highscore list
 * @param {boolean} won 
 */
function createHighscore(won) {
    world.finalScore = world.getFinalScore(won);
    world.bestScoreList = world.highscore.getBestScoreList();
    world.highscore.safeToLocalStorage();
}

/**
  * prepares the end screen, waits a second after game end, plays the music and clears the intervals
  * @param {boolean} won 
  */
function prepareGameEnd(won) {
    let counter = 0;
    world.gameover = true;
    let outro = setInterval(() => {
        if (counter == 1) {
            createHighscore(won)
            gameEnd(world.finalScore, world.character.won, world.bestScoreList);
            world.stopAllSounds();
            playFinalMusic(won);
            clearInterval(outro);
        } else {
            if (won) {
                world.killAllEnemies();
            }
        }
        counter++
    }, 1000);
}

/**
 * handles Keydowns 
 */
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

/**
 * handles keyups
 */
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

/**
 * handles touch events
 */
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



