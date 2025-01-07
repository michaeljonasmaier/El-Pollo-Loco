class Character extends MovableObject {

    height = 180;
    y = 250;
    speed = 4;
    numberBottles = 5;
    numberCoins = 0;
    won = false;
    offsetY = 100;
    isFalling = false;
    inactiveTime = 0;
    animationDone = false;
    movesBackwards= false;
    offsetX = 0;
    IMAGES_IDLE = [
        "img/2_character_pepe/1_idle/idle/I-1.png",
        "img/2_character_pepe/1_idle/idle/I-2.png",
        "img/2_character_pepe/1_idle/idle/I-3.png",
        "img/2_character_pepe/1_idle/idle/I-4.png",
        "img/2_character_pepe/1_idle/idle/I-5.png",
        "img/2_character_pepe/1_idle/idle/I-6.png",
        "img/2_character_pepe/1_idle/idle/I-7.png",
        "img/2_character_pepe/1_idle/idle/I-8.png",
        "img/2_character_pepe/1_idle/idle/I-9.png",
        "img/2_character_pepe/1_idle/idle/I-10.png"
    ];

    IMAGES_LONG_IDLE = [
        "img/2_character_pepe/1_idle/long_idle/I-11.png",
        "img/2_character_pepe/1_idle/long_idle/I-12.png",
        "img/2_character_pepe/1_idle/long_idle/I-13.png",
        "img/2_character_pepe/1_idle/long_idle/I-14.png",
        "img/2_character_pepe/1_idle/long_idle/I-15.png",
        "img/2_character_pepe/1_idle/long_idle/I-16.png",
        "img/2_character_pepe/1_idle/long_idle/I-17.png",
        "img/2_character_pepe/1_idle/long_idle/I-18.png",
        "img/2_character_pepe/1_idle/long_idle/I-19.png",
        "img/2_character_pepe/1_idle/long_idle/I-20.png"
    ];

    IMAGES_WALKING = [
        "img/2_character_pepe/2_walk/W-21.png",
        "img/2_character_pepe/2_walk/W-22.png",
        "img/2_character_pepe/2_walk/W-23.png",
        "img/2_character_pepe/2_walk/W-24.png",
        "img/2_character_pepe/2_walk/W-25.png",
        "img/2_character_pepe/2_walk/W-26.png"
    ];

    IMAGES_JUMPING = [
        "img/2_character_pepe/3_jump/J-31.png",
        "img/2_character_pepe/3_jump/J-32.png",
        "img/2_character_pepe/3_jump/J-33.png",
        "img/2_character_pepe/3_jump/J-34.png",
        "img/2_character_pepe/3_jump/J-35.png",
        "img/2_character_pepe/3_jump/J-36.png",
        "img/2_character_pepe/3_jump/J-37.png",
        "img/2_character_pepe/3_jump/J-38.png",
        "img/2_character_pepe/3_jump/J-39.png"
    ];

    IMAGES_DEAD = [
        "img/2_character_pepe/5_dead/D-51.png",
        "img/2_character_pepe/5_dead/D-52.png",
        "img/2_character_pepe/5_dead/D-53.png",
        "img/2_character_pepe/5_dead/D-54.png",
        "img/2_character_pepe/5_dead/D-55.png",
        "img/2_character_pepe/5_dead/D-56.png",
        "img/2_character_pepe/5_dead/D-57.png"
    ];

    IMAGES_HURT = [
        "img/2_character_pepe/4_hurt/H-41.png",
        "img/2_character_pepe/4_hurt/H-42.png",
        "img/2_character_pepe/4_hurt/H-43.png",
    ];

    world;
    walking_sound = new Audio('./audio/running.mp3');
    jumping_sound = new Audio('./audio/jump.mp3');
    hurting_sound = new Audio('./audio/hurt.mp3');
    throwing_sound = new Audio('./audio/throw.mp3');
    collecting_sound = new Audio('./audio/collect.mp3');
    collecting_bottle_sound = new Audio('./audio/collect_bottle.mp3');
    screaming_sound = new Audio('./audio/scream.mp3');


    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.animate();
        this.applyGravity();
    }

    /**
     * Starts all animation and check functions
     */
    animate() {
        this.checkIfMoving();
        this.playJumpingAnimation();
        this.playHurtAnimation();
        this.playWalkAnimation();
        this.playIdleAnimation();
    }

    /**
     * stops all sounds from character
     */
    stopAllCharacterSounds(){
        this.sounds.stopSound(this.walking_sound);
    }

    /**
     * Checks 60 times a second, stops sounds, checks moving, jumping. If character doesnt do anything, it sets inactive to 0
     */
    checkIfMoving() {
        setInterval(() => {
            if (!isPaused) {
                this.stopAllCharacterSounds();
                this.checkIfMovingRight();
                this.checkIfMovingLeft();
                this.checkIfJumping();
                this.world.camera_x = -this.x + 100;
            } else {
                this.inactiveTime = 0;
            }
        }, 1000 / 60);
    }

    /**
     * checks if moving right on keyboard press, plays sound and sets inactive time
     */
    checkIfMovingRight() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.otherDirection = false;
            this.sounds.playSoundIfAllowed(this.walking_sound, this.world.allSounds);
            this.movesBackwards = false;
            this.inactiveTime = 0;
        }
    }

    /**
     * checks if moving left on keyboard press, plays sound and sets inactive time
     */
    checkIfMovingLeft() {
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            this.otherDirection = true;
            this.sounds.playSoundIfAllowed(this.walking_sound, this.world.allSounds);
            this.movesBackwards = true;
            this.inactiveTime = 0;
        }
    }

    /**
     * checks if jumping right on keyboard press, plays sound and sets inactive time
     */
    checkIfJumping() {
        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.jump();
            this.sounds.playSoundIfAllowed(this.jumping_sound, this.world.allSounds);
            this.inactiveTime = 0;
        }
    }

    /**
     * plays jumping animation
     */
    playJumpingAnimation() {
        setInterval(() => {
            if (this.isAboveGround() && !this.isDead()) {
                this.playAnimation(this.IMAGES_JUMPING);
            }
        }, 100);
    }

    /**
     * plays dead animation, makes character fall off the canvas
     */
    playDeadAnimation() {
        this.needsGravity = false;
        this.currentImage = 0;
            let deadIntervall = setInterval(() => {
                this.fall()
                this.sounds.playSoundIfAllowed(this.screaming_sound, this.world.allSounds)
                this.playAnimation(this.IMAGES_DEAD);    
            }, 100);
    }

    /**
     * plays hurt animation
     */
    playHurtAnimation() {
        setInterval(() => {
            if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
                this.sounds.playSoundIfAllowed(this.hurting_sound, this.world.allSounds);
            }
        }, 100);
    }

    /**
     * plays walk animation
     */
    playWalkAnimation() {
        setInterval(() => {
            if ((this.world.keyboard.RIGHT || this.world.keyboard.LEFT) && !this.isAboveGround() && !this.isDead() && !this.isHurt()) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 50);
    }

    /**
     * plays idle animation if not moving, switches to long idle if inactive time reaches a specific time
     */
    playIdleAnimation() {
        setInterval(() => {
            if (!this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.isAboveGround() && !this.isDead() && !this.isHurt()) {
                this.inactiveTime++;
                if (this.inactiveTime > 70) {
                    this.playAnimation(this.IMAGES_LONG_IDLE);
                } else {
                    this.playAnimation(this.IMAGES_IDLE);
                }
            }
        }, 150);
    }
}