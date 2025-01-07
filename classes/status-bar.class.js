class StatusBar extends DrawableObject {
    IMAGES = [];
    percentage = 100;

    constructor(typeIndex, type, x, y, percentage) {
        super();
        this.getImagePaths(typeIndex, type)
        this.loadImages(this.IMAGES);
        this.x = x;
        this.y = y;
        this.width = 200;
        this.height = 60;
        this.percentage = percentage
        this.setPercentage(percentage);
    }

    /**
     * sets the img of the status bar depending on percentage
     * @param {integer} percentage - status of bar
     */
    setPercentage(percentage) {
        this.percentage = percentage; //=> 0...5
        let imagePath = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[imagePath];
    }

    /**
     * combines percentage and status image
     * @returns number between 0 and 5 (image src)
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }

    /**
     * get image paths of different bars
     * @param {integer} typeIndex - which bar
     * @param {integer} type - which type
     */
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