class DrawableObject{
    img;
    imageCache = {};
    currentImage = 0;
    height = 150;
    width = 100;
    x = 120;
    y = 280;

    /**
     * loads image and sets source
     * @param {stringtring} path - path of image
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * loads images of an array and sets imageCache
     * @param {string} arr - paths of the images
     */
    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
    
    /**
     * draws image on canvas
     * @param {canvas} ctx - canvas
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        
    }

    /**
     * draws character on canvas using just a part of the actual image (cropped)
     * @param {canvas} ctx - canvas
     */
    drawCharacter(ctx) {
        ctx.drawImage(this.img, 0, 450, this.img.width, this.img.height-450, this.x, this.y, this.width, this.height);     
    }

    /**
     * draws frame around an element
     * @param {canvas} ctx - canvas
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken) {
            ctx.beginPath();
            ctx.lineWidth = "3";
            ctx.strokeStyle = "blue";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }
}