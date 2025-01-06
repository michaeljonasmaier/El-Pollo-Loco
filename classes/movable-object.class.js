class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2;
    energy = 100;
    lastHit = 0;
    needsGravity = true;
    sounds = new Sounds();

    jump() {
        this.speedY = 30;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    moveLeftFast() {
        this.x -= this.speed*2;
    }

    fall(){
        this.y += 30;
    }

    playAnimation(images) {
        //Walk Animation
        let i = this.currentImage % images.length // Modulo ist der Rest also: i = 0/6 => Rest 0, 1/6 => Rest 1, ... also 0,1,2,3,4,5, 0,1,2,3,...
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    applyGravity() {
        setInterval(() => {
            if (this.needsGravity && (this.isAboveGround() || this.speedY > 0)) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25)
    }

    isAboveGround() {
        if (this instanceof Endboss || this instanceof Cactus) {
            return true;
        } else if (this instanceof ThrowableObject){
            return this.y < 370;
        } else {
            return this.y < 250;
        }
    }

    flipImage(ctx) {
        ctx.save();
        ctx.translate(this.width, 0);
        ctx.scale(-1, 1);
        this.x = this.x * -1;
    }

    flipImageBack(ctx) {
        this.x = this.x * -1;
        ctx.restore();
    }

    isColliding(mo) {
        return (this.x + this.width) >= mo.x && this.x <= (mo.x + mo.width) &&
            (this.y + this.height) >= mo.y &&
            (this.y) <= (mo.y + mo.height); 
    }

    hit() {
        if(!isPaused){
            this.energy -= 10;
            if (this.energy < 0) {
                this.energy = 0;
            } else {
                this.lastHit = new Date().getTime();
            }
        }
    }

    isDead() {
        return this.energy == 0;
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000 
        if (timePassed < 1) {
            return true;
        }
    }
}