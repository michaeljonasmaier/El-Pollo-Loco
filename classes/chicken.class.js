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
    dead_sound = new Audio('audio/chicken_die.mp3');
    chicken_sound = new Audio();
    chicken_sound_arr = ["audio/chicken1.mp3", "audio/chicken2.mp3"]

    constructor(x, y, speedFactor, height) {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImage(this.IMAGE_DEAD);
        this.x = x;
        this.y = y;
        this.speed = 0.3 + Math.random() * speedFactor;
        this.height = height;
        this.width = height;
        this.chicken_sound.src = this.randomizeAudioSource();
        this.chicken_sound.volume = 0.7;
        this.dead_sound.volume = 0.6;
        this.animate();
    }

    /**
     * starts animating
     */
    animate() {
        this.handleMove();
        this.handleDeath()
    }

    /**
     * checks if dead or paused, otherwise moveleft
     */
    handleMove(){
        setInterval(() => {
            if (!this.dead && !isPaused && !(this instanceof Turbochicken)) {
                this.moveLeft();
            }
        }, 1000 / 60);
    }

    /**
     * checks if chicken is dead, plays animation an changes to dead img
     */
    handleDeath() {
        setInterval(() => {
            if (this.dead) {
                this.img.src = this.IMAGE_DEAD;
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 150);
    }

    /**
     * randomizes the chicken audio source from array
     */
    randomizeAudioSource() {
        let randomIndex = Math.floor(Math.random() * this.chicken_sound_arr.length);
        return this.chicken_sound_arr[randomIndex];
    }


}