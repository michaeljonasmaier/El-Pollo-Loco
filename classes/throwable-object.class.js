class ThrowableObject extends MovableObject {
    IMAGES_FLYING = [
        "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png"
    ]

    IMAGES_SPLASHING = [
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
    ]

    IMAGE_SPLASHED = "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png";
    IMAGE_ONGROUND = "img/6_salsa_bottle/1_salsa_bottle_on_ground_press_b_key.png";
    damageDone = false;
    distance;
    isCollectable = false;

    constructor(x, y) {
        super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
        this.loadImages(this.IMAGES_FLYING);
        this.loadImages(this.IMAGES_SPLASHING);
        this.x = x;
        this.y = y;
        this.height = 70;
        this.width = 60;
        this.speedY = 20;
        this.distance = 16 + Math.random()*8;
        this.applyGravity();
        this.throw();

        this.animate();
    }

    animate() {
        setInterval(() => {
            if (!this.isAboveGround()) {
                this.img.src = this.IMAGE_ONGROUND;
                this.isCollectable = true;
            } else {
                if(this.needsGravity){
                    this.throw();
                    this.playFlyAnimation();
                }      
            }
        }, 50)
    }

    throw() {
        this.x += this.distance;
    }

    playFlyAnimation() {
        this.playAnimation(this.IMAGES_FLYING);
    }

    splash(toArr, index) {
        this.currentImage = 0;
        let splashIntervall = setInterval(() => {
            if(!((this.currentImage % this.IMAGES_SPLASHING.length) == this.IMAGES_SPLASHING.length-1)){
                this.playAnimation(this.IMAGES_SPLASHING);
            } else {
                toArr.splice(index, 1)
                clearInterval(splashIntervall)
            }
            
        }, 100);
    }
}