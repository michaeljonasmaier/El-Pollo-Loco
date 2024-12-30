class World {

    character = new Character();
    level = level1;

    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    healthBar = new StatusBar(2, "health", 30, 0, 100);
    coinBar = new StatusBar(1, "coin", 30, 50, this.character.numberCoins * 10);
    bottleBar = new StatusBar(3, "bottle", 30, 50, this.character.numberBottles * 10);
    throwableObjects = [];
    highscore = new Highscore();


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.ctx.font = '20px Arial'; // Schriftart und Größe
        this.ctx.fillStyle = '#89f7fe';

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
        //this.addToMap(this.coinBar);
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
            this.checkCollisions();
            this.checkThrowObjects();
            checkProgression(this.character.x, this.level.enemies);
            if (this.character.isDead()) {
                this.prepareGameEnd(this.character.won);
            }

        }, 100)
    }

   

    checkThrowObjects() {
        if (this.keyboard.D && this.character.numberBottles > 0) {
            let bottle = new ThrowableObject(this.character.x + 60, this.character.y + 20);
            this.throwableObjects.push(bottle);
            this.character.numberBottles--;
            this.bottleBar.setPercentage(this.character.numberBottles * 10);
        }
    }

    checkCollisions() {
        this.checkEnemyCollision();
        this.checkBottleCollision();
        this.checkCoinCollision();
        this.checkCactusCollision();
        this.checkThrowableObjectCollision();

        if (this.character.isColliding(this.level.endboss)) {
            this.character.hit();
            this.healthBar.setPercentage(this.character.energy);
        }

    }

    checkThrowableObjectCollision(){
        this.throwableObjects.forEach((to, index) => {
            if (this.level.endboss.isColliding(to)) {
                this.checkEndbossEnergy();
                to.splash(this.throwableObjects, index);       
            }
            this.level.enemies.forEach((enemy) => {
                if(enemy.isColliding(to) && !enemy.dead && to.isAboveGround()){
                    enemy.dead = true;
                    to.needsGravity = false;
                    to.splash(this.throwableObjects, index);
                }
            });
        })
    }

    checkEndbossEnergy(){
        this.level.endboss.energy--;
        this.updateEndbossAnimation();
        if(this.level.endboss.energy == 3){
            spawnTurbochickens(this.level.enemies);
        }
    }

    checkEnemyCollision() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !enemy.dead) {
                if (this.character.isAboveGround()) {
                    enemy.dead = true;
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
                    this.updateBottleBar();
                }
            }
        })
    }

    checkCoinCollision() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.character.numberCoins++;
                this.level.coins.splice(index, 1);
                this.highscore.plusScore();
                this.updateCoinBar();
            }
        })
    }

    checkCactusCollision() {
        this.level.cactuses.forEach((cactus, index) => {
            if (this.character.isColliding(cactus)) {
                this.character.hit();
                this.level.cactuses[index].applyGravity();
                this.healthBar.setPercentage(this.character.energy);
            }
        })
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
            if(!isPaused){
                this.highscore.time++
            }     
        }, 1000);
    }

    getFinalScore(won) {
        return this.highscore.calculateTotalScore(this.character.energy, won);
    }

    prepareGameEnd(won){
        let finalScore = this.getFinalScore(won);
        let bestScoreList = this.highscore.getBestScoreList();
        this.highscore.safeToLocalStorage();
        gameEnd(finalScore, this.character.won, bestScoreList);
    }
}