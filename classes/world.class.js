class World {

    character = new Character();
    level = level1;

    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    healthBar = new StatusBar(2, "health", 30, 0, 100);
    coinBar = new StatusBar(1, "coin", 30, 50, this.character.numberCoins * 10);
    bottleBar = new StatusBar(3, "bottle", 30, 100, this.character.numberBottles * 10);
    throwableObjects = [];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.setWorld();
        this.draw();
        this.run();
    }


    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.heigth);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0);
        //-------------Space for fixed Objects-------------------
        this.addToMap(this.healthBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.level.endboss);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.cactuses);

        this.ctx.translate(-this.camera_x, 0);

        //draw wird so oft aufgerufen, wie es die Grafikkarte hergibt
        let self = this; //this funktioniert in der kommenden Methode nicht mehr, daher wird es hier in eine Variable gespeichert
        requestAnimationFrame(function () {
            self.draw();
        });


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

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            
        }, 100)
    }

    checkThrowObjects() {
        if (this.keyboard.D && this.character.numberBottles > 0) {
            let bottle = new ThrowableObject(this.character.x + 60, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.character.numberBottles--;
            this.bottleBar.setPercentage(this.character.numberBottles * 10);
        }
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            this.checkEnemyCollision(enemy);
        })

        this.level.bottles.forEach((bottle, index) => {
            this.checkBottleCollision(bottle, index)
        })

        this.level.coins.forEach((coin, index) => {
            this.checkCoinCollision(coin, index);
        })

        this.level.cactuses.forEach((cactus, index) => {
            this.checkCactusCollision(cactus, index);
        })

        this.throwableObjects.forEach((to, index) => {
            if (this.level.endboss.isColliding(to)) {
                this.level.endboss.energy--;
                this.throwableObjects.splice(index, 1);
                this.updateEndbossAnimation();
            }
        })

        if(this.character.isColliding(this.level.endboss)){
            this.character.hit();
            this.healthBar.setPercentage(this.character.energy);
        }

    }

    checkEnemyCollision(enemy){
        if (this.character.isColliding(enemy) && !enemy.dead) {
            if(this.character.isAboveGround()){
                enemy.dead = true;
            } else {
                this.character.hit();
                this.healthBar.setPercentage(this.character.energy);
            }      
        }
    }

    checkBottleCollision(bottle, index){
        if (this.character.isColliding(bottle)) {
            this.level.bottles.splice(index, 1);
            if (this.character.numberBottles < 10) {
                this.character.numberBottles++;
                this.updateBottleBar();
            }
        }
    }

    checkCoinCollision(coin, index){
        if (this.character.isColliding(coin)) {
            this.character.numberCoins++;
            this.level.coins.splice(index, 1);
            this.updateCoinBar();
        }
    }

    checkCactusCollision(cactus, index){
        if (this.character.isColliding(cactus)) {
            this.character.hit();
            this.level.cactuses[index].applyGravity();
            this.healthBar.setPercentage(this.character.energy);
        }
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
        }
    }
}