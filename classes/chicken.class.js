class Chicken extends MovableObject{
    y = 370;
    height = 60;
    width = 60;
    dead = false;
    IMAGES_WALKING = [
        "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
        "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
        "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png"
    ];

    IMAGE_DEAD = "img/3_enemies_chicken/chicken_normal/2_dead/dead.png";
 

    constructor(){
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImage(this.IMAGE_DEAD);
        this. x = 200 + Math.random() * 500; //Math.random() generiert eine zufällige Zahl zwischen 0 und 1 
        this.speed = 0.15 + Math.random() * 0.25; //Damit alle Hühner unterschiedlich schnell laufen, wird der speed randomisiert
        this.animate();
    }

    animate() {
        setInterval(() => {
            if(!this.dead){
                this.moveLeft();
            }
        }, 1000 / 60);
        
        setInterval(() => {
            if (this.dead){
                this.img.src = this.IMAGE_DEAD;
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }         
        }, 150);
    }


}