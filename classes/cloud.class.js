class Cloud extends MovableObject {
    x = Math.random() * 500;
    y = 20;
    width = 500;
    height = 250;

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');


    }
}