const cloudCanvas = document.getElementById('cloudCanvas');
const cloudCtx = cloudCanvas.getContext('2d');

const cloudImage = new Image();
cloudImage.src = 'img/5_background/layers/4_clouds/1.png';

let cloudX = cloudCanvas.width;

let counter = 0;

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

function drawChicken(){ 
        let chickenImage = new Image();
        let i = currentChickenImage % chickenImages.length;
        
        chickenImage.src = chickenImages[i];
        cloudCtx.drawImage(chickenImage, chickenX, 350, 80, 40);
        chickenX -= 0.8;   
}
