    /**
    * displays the coin number in the canvas
    */
    function displayCoinNumber(ctx, canvas, highscore) {
        let text = highscore.score;
        let textWidth = ctx.measureText(text).width;
        let textHeight = 30;
        ctx.fillStyle = 'white';
        ctx.fillRect(canvas.width - 95, 27, textWidth + 50, textHeight);
        ctx.fillStyle = '#6f86d6';
        ctx.fillText(text, canvas.width - 50, 50);
        let img = new Image();
        img.src = 'img/8_coin/coin_1.png';
        ctx.drawImage(img, canvas.width - 90, 27, 25, 25);
    }

    /**
     * displays the time in the canvas
     */
    function displayTime(ctx, canvas, highscore) {
        let textHeight = 30;
        ctx.fillStyle = 'white';
        ctx.fillRect(canvas.width - 220, 27, 100, textHeight);
        ctx.fillStyle = '#6f86d6';
        ctx.fillText("Time: " + highscore.time, canvas.width - 210, 50);
    }