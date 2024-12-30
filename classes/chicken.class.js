class Chicken extends MovableObject {
    y = 370;
    height = 60;
    width = 60;
    dead = false;
    IMAGES_WALKING = [
        "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
        "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
        "img/3_enemies_chicken/chicken_small/1_walk/3_w.png"
    ];
    IMAGE_DEAD = "img/3_enemies_chicken/chicken_small/2_dead/dead.png";


    constructor(x, y, speedFactor, height) {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImage(this.IMAGE_DEAD);
        this.x = x;
        this.y = y;
        this.speed = 0.3 + Math.random() * speedFactor;
        this.height = height;
        this.width = height; //Damit alle Hühner unterschiedlich schnell laufen, wird der speed randomisiert
        this.animate();
    }

    animate() {

        setInterval(() => {
            if (!this.dead && !isPaused) {
                this.moveLeft();
            }
        }, 1000 / 60);

        setInterval(() => {
            if (this.dead) {
                this.img.src = this.IMAGE_DEAD;
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 150);

    }

}