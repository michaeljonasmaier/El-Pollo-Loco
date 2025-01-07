class CollectableObject extends DrawableObject {
    x;
    y = 80;
    width;
    height;
    offsetX = 0;

    constructor(path, x, y, width, height) {
        super().loadImage(path);
        this.x =  x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}