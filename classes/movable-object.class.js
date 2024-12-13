class MovableObject {
    x = 120;
    y = 280;
    img;
    height = 150;
    width = 100;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    moveRight() {

    }

    moveLeft(){
        setInterval(()=>{
            this.x -= this.speed;
        }, 1000/60);
    }

    playAnimation(images){
          //Walk Animation
          let i = this.currentImage % images.length // Modulo ist der Rest also: i = 0/6 => Rest 0, 1/6 => Rest 1, ... also 0,1,2,3,4,5, 0,1,2,3,...
          let path = images[i];
          this.img = this.imageCache[path];
          this.currentImage++;
    }
}