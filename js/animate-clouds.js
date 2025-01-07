let cloudCanvas = document.getElementById('cloudCanvas');
let cloudCtx = cloudCanvas.getContext('2d');

let cloudImage = new Image();
cloudImage.src = 'img/5_background/layers/4_clouds/1.png';

let cloudX = cloudCanvas.width;
let counter = 0;

/**
 * animates clouds after loading the image
 */
cloudImage.onload = () => {
    setInterval(() => {
        cloudCtx.clearRect(0, 0, cloudCanvas.width, cloudCanvas.height);
        cloudCtx.drawImage(cloudImage, cloudX, 0, 400, 250);
        cloudX -= 0.5;
        if (cloudX + 400 < 0) {
            cloudX = cloudCanvas.width;
        }
    }, 20);
};

