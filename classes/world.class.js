class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    healthBar = new StatusBar("1_statusbar", 2, "health", 30, 0, 100);
    bottleBar = new StatusBar("1_statusbar", 3, "bottle", 30, 50, this.character.numberBottles * 10);
    endbossBar = new StatusBar("2_statusbar_endboss", 4, "endboss", 500, 50, 100);
    throwableObjects = [];
    highscore = new Highscore();
    sounds = new Sounds();
    backgroundMusic = new Audio("audio/background_music.mp3");
    allSounds = [];
    finalScore;
    bestScoreList;
    gameover = false;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.ctx.font = '20px Arial'; // Schriftart und Größe
        this.ctx.fillStyle = '#89f7fe';
        this.backgroundMusic.volume = 0.5;
        this.setWorld();
        this.draw();
        this.startTimer();
        this.run();
    }

    /**
     * sets characters world
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * adds all objects to canvas
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.heigth);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addCharacterToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.level.endboss);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.cactuses);
        this.ctx.translate(-this.camera_x, 0);

        //-------------Space for fixed Objects-------------------
        this.addToMap(this.healthBar);
        this.addToMap(this.bottleBar);
        if (this.isEndbossVisible()) {
            this.addToMap(this.endbossBar);
        }
        this.displayCoinNumber();
        this.displayTime();

        this.ctx.translate(this.camera_x, 0);
        this.ctx.translate(-this.camera_x, 0);

        //draw gets called in game.js
    }

    /**
     * draws array
     * @param {object array} objects 
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * draws movable objects and flips image if needed
     * @param {MovableObject} mo 
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            mo.flipImage(this.ctx);
        }
        mo.draw(this.ctx); //mo.drawFrame(this.ctx);
        if (mo.otherDirection) {
            mo.flipImageBack(this.ctx);
        }
    }

    /**
     * draws character 
     * @param {MovableObject} mo 
     */
    addCharacterToMap(mo) {
        if (mo.otherDirection) {
            mo.flipImage(this.ctx);
        }
        mo.drawCharacter(this.ctx); //mo.drawFrame(this.ctx);
        if (mo.otherDirection) {
            mo.flipImageBack(this.ctx);
        }
    }

    /**
     * checks collisions, visibility of objects and the game status 
     */
    run() {
        setInterval(() => {
            if (!isPaused) {
                this.checkCollisions();
                this.checkIfChickenIsVisible();
                checkProgression(this.character.x, this.level.enemies);
                if (this.character.isDead()) {
                    this.character.playDeadAnimation();
                    this.prepareGameEnd(this.character.won);
                }
            }
        }, 100)
    }

    /**
     * creates a throwable object 
     */
    throwObject() {
        if (this.character.numberBottles > 0) {
            let bottle = new ThrowableObject(this.character.x + 60, this.character.y + 20, this.character.movesBackwards);
            this.sounds.playSoundIfAllowed(this.character.throwing_sound, this.allSounds);
            this.throwableObjects.push(bottle);
            this.level.bottlesOnGround.push(bottle);
            this.character.numberBottles--;
            this.character.inactiveTime = 0;
            this.bottleBar.setPercentage(this.character.numberBottles * 10);
        }
    }

    /**
     * checks all kinds of collisions
     */
    checkCollisions() {
        this.checkEnemyCollision();
        this.checkBottleCollision();
        this.checkCoinCollision();
        this.checkCactusCollision();
        this.checkThrowableObjectCollision();
        this.checkBottleOnGroundCollision();
        if (this.character.isColliding(this.level.endboss)) {
            this.character.hit();
            this.healthBar.setPercentage(this.character.energy);
        }
    }

    /**
     * checks collisions of throwable objects and endboss
     */
    checkThrowableObjectCollision() {
        this.throwableObjects.forEach((to, index) => {
            if (this.level.endboss.isColliding(to)) {
                if (!to.damageDone) {
                    this.checkEndbossEnergy();
                    to.damageDone = true;
                    this.checkIfBottleOnGround(to);
                    to.splash(this.throwableObjects, index);
                    this.sounds.playSoundIfAllowed(this.level.endboss.enboss_angry_sound, this.allSounds);
                }
            }
            this.checkThrowableObjectCollisionOnEnemy(to, index);
        })
    }

    /**
     *  checks collisions of throwable objects and enemy
     * @param {throwObject} to 
     * @param {integer} index 
     */
    checkThrowableObjectCollisionOnEnemy(to, index) {
        this.level.enemies.forEach((enemy) => {
            if (enemy.isColliding(to) && !enemy.dead && to.isAboveGround()) {
                enemy.dead = true;
                this.sounds.stopSound(enemy.chicken_sound);
                to.needsGravity = false;
                this.checkIfBottleOnGround(to);
                to.splash(this.throwableObjects, index);
            }
        });
    }

    /**
     * checks if turbochickens need to be spawn
     */
    checkEndbossEnergy() {
        this.level.endboss.energy--;
        this.updateEndbossBar();
        this.updateEndbossAnimation();
        if (this.level.endboss.energy == 3) {
            spawnTurbochickens(this.level.enemies);
        }
    }

    /**
     * checks collision of character with enemies and handles it
     */
    checkEnemyCollision() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !enemy.dead) {
                if (this.character.isAboveGround() && this.character.speedY < 0) {
                    enemy.dead = true;
                    this.sounds.stopSound(enemy.chicken_sound);
                    this.sounds.playSoundIfAllowed(enemy.dead_sound, this.allSounds);
                } else {
                    if (!this.character.isHurt()) {
                        this.character.hit();
                        this.healthBar.setPercentage(this.character.energy);
                    }
                }
            }
        })
    }

    /**
     * checks if character is collecting a bottle
     */
    checkBottleCollision() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.level.bottles.splice(index, 1);
                if (this.character.numberBottles < 10) {
                    this.character.numberBottles++;
                    this.sounds.playSoundIfAllowed(this.character.collecting_bottle_sound, this.allSounds);
                    this.updateBottleBar();
                }
            }
        })
    }

    /**
     * checks if character is nearby a bottle on the ground
     */
    checkBottleOnGroundCollision() {
        this.level.bottlesOnGround.forEach((bottle, index) => {
            if (this.character.isColliding(bottle) && bottle.isCollectable) {
                collectBottleMobile();
            }
        })
    }

    /**
     * handles collection of bottle
     */
    collectBottleOnGround() {
        this.level.bottlesOnGround.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.character.numberBottles++;
                this.sounds.playSoundIfAllowed(this.character.collecting_bottle_sound, this.allSounds);
                this.throwableObjects.splice(index, 1);
                this.level.bottlesOnGround.splice(index, 1);
                this.updateBottleBar();
            }
        })
    }

    /**
     * checks if throwable object hits the ground
     * @param {throwObject} to 
     */
    checkIfBottleOnGround(to) {
        this.level.bottlesOnGround.forEach((bottleOnGround, index) => {
            if (bottleOnGround == to) {
                this.level.bottlesOnGround.splice(index, 1);
            }
        });
    }

    /**
     * checks if character is collecting a coin
     */
    checkCoinCollision() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.character.numberCoins++;
                this.sounds.playSoundIfAllowed(this.character.collecting_sound, this.allSounds);
                this.level.coins.splice(index, 1);
                this.highscore.plusScore();
            }
        })
    }

    /**
     * checks if character hits a catus
     */
    checkCactusCollision() {
        this.level.cactuses.forEach((cactus, index) => {
            if (this.character.isColliding(cactus) && !cactus.damageDone) {
                this.character.hit();
                cactus.damageDone = true;
                this.level.cactuses[index].applyGravity();
                this.healthBar.setPercentage(this.character.energy);
            }
        })
    }

    /**
     * checks if chicken is visible an plays sound 
     */
    checkIfChickenIsVisible() {
        this.level.enemies.forEach(enemy => {
            if (!enemy.dead && enemy.x < (this.character.x + 600) && enemy.x > (this.character.x - enemy.width - 120)) {
                this.sounds.playSoundIfAllowed(enemy.chicken_sound, this.allSounds);
            } else {
                this.sounds.stopSound(enemy.chicken_sound);
            }
        });
    }

    /**
     * checks if endboss is visible in canvas
     * @returns if endboss is visible in canvas
     */
    isEndbossVisible() {
        if (this.level.endboss.x < (this.character.x + 600) && this.level.endboss.x > (this.character.x - this.level.endboss.width - 120)) {
            return true
        } else {
            return false
        }
    }

    /**
     * updates the status of the bottle bar
     */
    updateBottleBar() {
        if (this.character.numberBottles <= 10) {
            this.bottleBar.setPercentage(this.character.numberBottles * 10);
        }
    }

    /**
     * updates the status of the coin bar
     */
    updateCoinBar() {
        if (this.character.numberBottles <= 10) {
            this.coinBar.setPercentage(this.character.numberCoins * 10);
        }
    }

    /**
     * updates the status of the endboss energy bar
     */
    updateEndbossBar() {
        this.endbossBar.setPercentage(this.level.endboss.energy * 20);
    }

    /**
     * updates the endboss animation depending of its energy
     */
    updateEndbossAnimation() {
        if (this.level.endboss.energy == 4) {
            this.level.endboss.animationStyle = "walk";
        } else if (this.level.endboss.energy == 3) {
            this.level.endboss.animationStyle = "attack";
        } else if (this.level.endboss.energy == 2) {
            this.level.endboss.animationStyle = "hurt";
        } else if (this.level.endboss.energy == 1) {
            this.level.endboss.animationStyle = "hurt";
        } else if (this.level.endboss.energy == 0) {
            this.level.endboss.animationStyle = "dead";
            this.character.won = true;
            this.prepareGameEnd(this.character.won);
        }
    }

    /**
     * creates a timer 
     */
    startTimer() {
        setInterval(() => {
            if (!isPaused) {
                this.highscore.time++
            }
        }, 1000);
    }

    /**
     * stops all sounds 
     */
    stopAllSounds() {
        this.allSounds.forEach(sound => {
            sound.pause();
        });
    }

    /**
     * creates the final score
     * @param {boolean} won 
     * @returns the final score
     */
    getFinalScore(won) {
        return this.highscore.calculateTotalScore(this.character.energy, won);
    }

    /**
     * prepares the end screen, waits a second after game end, plays the music and clears the intervals
     * @param {boolean} won 
     */
    prepareGameEnd(won) {
        let counter = 0;
        this.gameover = true;
        let outro = setInterval(() => {
            if (counter == 1) {
                this.createHighscore(won)
                gameEnd(this.finalScore, this.character.won, this.bestScoreList);
                this.stopAllSounds();
                playFinalMusic(won);
                clearInterval(outro);
            } else {
                if (won) {
                    this.killAllEnemies();
                }
            }
            counter++
        }, 1000);
    }

    /**
     * kills all enemies in canvas
     */
    killAllEnemies() {
        this.level.enemies.forEach(enemy => {
            enemy.dead = true;
        });
    }

    /**
     * sets the highscore list
     * @param {boolean} won 
     */
    createHighscore(won) {
        this.finalScore = this.getFinalScore(won);
        this.bestScoreList = this.highscore.getBestScoreList();
        this.highscore.safeToLocalStorage();
    }

    /**
    * displays the coin number in the canvas
    */
    displayCoinNumber() {
        let text = this.highscore.score;
        let textWidth = this.ctx.measureText(text).width;
        let textHeight = 30;
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(this.canvas.width - 95, 27, textWidth + 50, textHeight);
        this.ctx.fillStyle = '#6f86d6';
        this.ctx.fillText(text, this.canvas.width - 50, 50);
        let img = new Image();
        img.src = 'img/8_coin/coin_1.png';
        this.ctx.drawImage(img, this.canvas.width - 90, 27, 25, 25);
    }

    /**
     * displays the time in the canvas
     */
    displayTime() {
        let textHeight = 30;
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(this.canvas.width - 220, 27, 100, textHeight);
        this.ctx.fillStyle = '#6f86d6';
        this.ctx.fillText("Time: " + this.highscore.time, this.canvas.width - 210, 50);
    }

}