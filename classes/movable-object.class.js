class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2;
    energy = 100;
    lastHit = 0;
    needsGravity = true;
    sounds = new Sounds();

    /**
     * adds 30 to speedY and makes object jump
     */
    jump() {
        this.speedY = 30;
    }

    /**
     * adds speed to objects x and makes it move right
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * subtracts speed to objects x and makes it move left
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * subtracts more speed to objects x and makes it move left faster
     */
    moveLeftFast() {
        this.x -= this.speed*2;
    }

    /**
     * adds 30 to objects y and makes it fall
     */
    fall(){
        this.y += 30;
    }

    /**
     * plays an objects animation by setting its img source based on the array and adds the currentImage 
     * @param {string} images - animation images
     */
    playAnimation(images) {
        let i = this.currentImage % images.length // Modulo ist der Rest also: i = 0/6 => Rest 0, 1/6 => Rest 1, ... also 0,1,2,3,4,5, 0,1,2,3,...
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * makes objects fall when above ground and hold it on ground level when standing or walking
     */
    applyGravity() {
        setInterval(() => {
            if (this.needsGravity && (this.isAboveGround() || this.speedY > 0)) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25)
    }

    /**
     * checks if object is above ground (different ys for different objects)
     * @returns if object is above ground
     */
    isAboveGround() {
        if (this instanceof Endboss || this instanceof Cactus) {
            return true;
        } else if (this instanceof ThrowableObject){
            return this.y < 370;
        } else {
            return this.y < 250;
        }
    }

    /**
     * flips image when moving to other direction
     * @param {canvas} ctx - canvas
     */
    flipImage(ctx) {
        ctx.save();
        ctx.translate(this.width, 0);
        ctx.scale(-1, 1);
        this.x = this.x * -1;
    }

    /**
     * flips image back
     * @param {canvas} ctx - canvas
     */
    flipImageBack(ctx) {
        this.x = this.x * -1;
        ctx.restore();
    }

    /**
     * checks if current object is colliding with other movable object
     * @param {object} mo - other movable object
     * @returns if objects are colliding
     */
    isColliding(mo) {
        return (this.x + this.width) >= (mo.x + mo.offsetX) && this.x <= (mo.x + mo.width - mo.offsetX) &&
            (this.y + this.height) >= mo.y &&
            (this.y) <= (mo.y + mo.height); 
    }

    /**
     * subtracts energy of current object and sets last hit variable
     */
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

    /**
     * checks if energy is 0
     * @returns if energy is 0
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * checks if last hit was less than a second ago
     * @returns if time is below 1
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000 
        if (timePassed < 1) {
            return true;
        }
    }
}