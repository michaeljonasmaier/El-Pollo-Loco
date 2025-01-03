class CollectableObject extends DrawableObject {
    x;
    y = 80;
    width;
    height;

    constructor(path, x, y, width, height) {
        super().loadImage(path);
        this.x =  x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}