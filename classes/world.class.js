class World {

    character = new Character();
    level = level1;

    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    healthBar = new StatusBar(2, "health", 30, 0, 100);
    bottleBar = new StatusBar(3, "bottle", 30, 50, this.character.numberBottles * 10);
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


    setWorld() {
        this.character.world = this;
    }

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
        this.displayCoinNumber();
        this.displayTime();

        this.ctx.translate(this.camera_x, 0);
        this.ctx.translate(-this.camera_x, 0);

        //draw gets called in game.js
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            mo.flipImage(this.ctx);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            mo.flipImageBack(this.ctx);
        }
    }

    addCharacterToMap(mo) {
        if (mo.otherDirection) {
            mo.flipImage(this.ctx);
        }
        mo.drawCharacter(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            mo.flipImageBack(this.ctx);
        }
    }

    run() {
        setInterval(() => {
            if(!isPaused){
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

    throwObject() {
        if (this.character.numberBottles > 0) {
            let bottle = new ThrowableObject(this.character.x + 60, this.character.y + 20);
            this.sounds.playSoundIfAllowed(this.character.throwing_sound, this.allSounds);
            this.throwableObjects.push(bottle);
            this.level.bottlesOnGround.push(bottle);
            this.character.numberBottles--;
            this.character.inactiveTime = 0;
            this.bottleBar.setPercentage(this.character.numberBottles * 10);
        }
    }

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
            this.level.enemies.forEach((enemy) => {
                if (enemy.isColliding(to) && !enemy.dead && to.isAboveGround()) {
                    enemy.dead = true;
                    this.sounds.stopSound(enemy.chicken_sound);
                    to.needsGravity = false;
                    this.checkIfBottleOnGround(to);
                    to.splash(this.throwableObjects, index);
                }
            });
        })
    }

    checkEndbossEnergy() {
        this.level.endboss.energy--;
        this.updateEndbossAnimation();
        if (this.level.endboss.energy == 3) {
            spawnTurbochickens(this.level.enemies);
        }
    }

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

    checkBottleOnGroundCollision() {
        this.level.bottlesOnGround.forEach((bottle, index) => {
            if (this.character.isColliding(bottle) && bottle.isCollectable) {
                collectBottleMobile();
            }
        })
    }

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

    checkIfBottleOnGround(to) {
        this.level.bottlesOnGround.forEach((bottleOnGround, index) => {
            if (bottleOnGround == to) {
                this.level.bottlesOnGround.splice(index, 1);
            }
        });
    }

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

    checkCactusCollision() {
        this.level.cactuses.forEach((cactus, index) => {
            if (this.character.isColliding(cactus)) { // && !cactus.damageDone
                this.character.hit();
                cactus.damageDone = true;
                this.level.cactuses[index].applyGravity();
                this.healthBar.setPercentage(this.character.energy);
            }
        })
    }

    checkIfChickenIsVisible() {
        this.level.enemies.forEach(enemy => {
            if (!enemy.dead && enemy.x < (this.character.x + 600) && enemy.x > (this.character.x - enemy.width - 120)){
                this.sounds.playSoundIfAllowed(enemy.chicken_sound, this.allSounds);
            } else {
                this.sounds.stopSound(enemy.chicken_sound);
            }
       });
    }

    updateBottleBar() {
        if (this.character.numberBottles <= 10) {
            this.bottleBar.setPercentage(this.character.numberBottles * 10);
        }
    }

    updateCoinBar() {
        if (this.character.numberBottles <= 10) {
            this.coinBar.setPercentage(this.character.numberCoins * 10);
        }
    }

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

    displayTime() {
        let textHeight = 30;
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(this.canvas.width - 220, 27, 100, textHeight);
        this.ctx.fillStyle = '#6f86d6';
        this.ctx.fillText("Time: " + this.highscore.time, this.canvas.width - 210, 50);
    }

    startTimer() {
        setInterval(() => {
            if (!isPaused) {
                this.highscore.time++
            }
        }, 1000);
    }

    stopAllSounds(){
        this.allSounds.forEach(sound => {
            sound.pause();
        });
    }

    getFinalScore(won) {
        return this.highscore.calculateTotalScore(this.character.energy, won);
    }

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

    killAllEnemies() {
        this.level.enemies.forEach(enemy => {
            enemy.dead = true;
        });
    }

    createHighscore(won){
        this.finalScore = this.getFinalScore(won);
        this.bestScoreList = this.highscore.getBestScoreList();
        this.highscore.safeToLocalStorage();
    }

}