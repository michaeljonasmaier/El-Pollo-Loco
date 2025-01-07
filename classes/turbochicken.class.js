class Turbochicken extends Chicken {

    IMAGES_WALKING = [
        "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
        "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
        "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png"
    ];
    IMAGE_DEAD = "img/3_enemies_chicken/chicken_normal/2_dead/dead.png";
    
    constructor(x, y, height, left) {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/2_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImage(this.IMAGE_DEAD);
        this.x = x;
        this.y = y;
        this.speed = 0.6 + Math.random()*4;
        this.height = height;
        this.width = height; 
        this.checkChickenDirection(left);
    }

    /**
     * checks, if chicken should move left or right
     * @param {boolean} left - shoult the chicken move left 
     */
    checkChickenDirection(left){
        if(left){
            this.runLeft();
        } else {
            this.otherDirection = true;
            this.runRight();
        }
    }

    /**
     * makes the chicken move left
     */
    runLeft(){
        setInterval(() => {
            if (!this.dead && !isPaused) {
                this.moveLeft();
            }
        }, 50);
    }

    /**
     * makes the chicken move right
     */
    runRight(){
        setInterval(() => {
            if (!this.dead && !isPaused) {
                this.moveRight();
            }
        }, 50);
    }
}