const cloudCanvas = document.getElementById('cloudCanvas');
const cloudCtx = cloudCanvas.getContext('2d');

const cloudImage = new Image();
cloudImage.src = 'img/5_background/layers/4_clouds/1.png'; 

let cloudX = cloudCanvas.width;

cloudImage.onload = () => {
    setInterval(() => {
        cloudCtx.clearRect(0, 0, cloudCanvas.width, cloudCanvas.height);
        cloudCtx.drawImage(cloudImage, cloudX, 0, 300, 150);
        cloudX -= 0.5;
        if (cloudX + 300 < 0) {
            cloudX = cloudCanvas.width;
        }
    }, 20);
};