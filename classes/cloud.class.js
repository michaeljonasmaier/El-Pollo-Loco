class Cloud extends MovableObject {
    x;
    y = 20;
    width = 500;
    height = 250;
    speedY = 10;
    speed = 0.5;

    constructor(imagePath, offset) {
        super().loadImage(imagePath);
        this.x = Math.random() * 500 + offset;
        this.animate();
    }

    animate() {
        setInterval(() => {
            if(!isPaused){
                this.moveLeft();
            }    
        }, 100);
        
    }

   
}