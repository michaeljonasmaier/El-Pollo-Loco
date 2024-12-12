class Character extends MovableObject {

    height = 280;
    y = 155;
    IMAGES_WALKING = [
        "img/2_character_pepe/2_walk/W-21.png",
        "img/2_character_pepe/2_walk/W-22.png",
        "img/2_character_pepe/2_walk/W-23.png",
        "img/2_character_pepe/2_walk/W-24.png",
        "img/2_character_pepe/2_walk/W-25.png",
        "img/2_character_pepe/2_walk/W-26.png"
    ];
    world;

    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_WALKING);

        this.animate();
    }

    jump() {

    }

    animate() {
        setInterval(() => {
            if(this.world.keyboard.RIGHT){
                let i = this.currentImage % this.IMAGES_WALKING.length // Modulo ist der Rest also: i = 0/6 => Rest 0, 1/6 => Rest 1, ... also 0,1,2,3,4,5, 0,1,2,3,...
                let path = this.IMAGES_WALKING[i];
                this.img = this.imageCache[path];
                this.currentImage++;
            }
            
        }, 100);

    }
}