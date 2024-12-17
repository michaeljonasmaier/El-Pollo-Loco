class CollectableObject extends DrawableObject {
    x;
    y = 80;
    width;
    height;

    constructor(path, x, width, height) {
        super().loadImage(path);
        this.x =  x;
        this.y = 80;
        this.width = width;
        this.height = height;
    }
}