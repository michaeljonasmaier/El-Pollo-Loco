class StatusBar extends DrawableObject {
    IMAGES = [];
    percentage = 100;

    constructor(typeIndex, type, x, y) {
        super();
        this.getImagePaths(typeIndex, type)
        this.loadImages(this.IMAGES);
        this.x = x;
        this.y = y;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

    setPercentage(percentage) {
        this.percentage = percentage; //=> 0...5
        let imagePath = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[imagePath];
    }

    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }

    getImagePaths(typeIndex, type) {
        this.IMAGES = [
            `img/7_statusbars/1_statusbar/${typeIndex}_statusbar_${type}/blue/0.png`,
            `img/7_statusbars/1_statusbar/${typeIndex}_statusbar_${type}/blue/20.png`,
            `img/7_statusbars/1_statusbar/${typeIndex}_statusbar_${type}/blue/40.png`,
            `img/7_statusbars/1_statusbar/${typeIndex}_statusbar_${type}/blue/60.png`,
            `img/7_statusbars/1_statusbar/${typeIndex}_statusbar_${type}/blue/80.png`,
            `img/7_statusbars/1_statusbar/${typeIndex}_statusbar_${type}/blue/100.png`
        ];
    }

}