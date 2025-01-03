class Cactus extends MovableObject{
    x;
    y;
    height = 50;
    width = 50;
    speedY = 10;
    acceleration = 1;

    constructor(x, y){
        super().loadImage("img/10_cactus/Cactus.png");
        this.x = x;
        this.y = y;
    }
}