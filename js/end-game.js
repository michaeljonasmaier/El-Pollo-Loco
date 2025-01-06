function showEndscreen(score, won, bestScores) {
    let dialog = document.getElementById("endscreen");
    hideTouchControl();
    clearAllIntervals();
    dialog.innerHTML += getEndscreenTemplate(score, won, bestScores);
    dialog.style.display = "block";
}

function getEndscreenTemplate(score, won, bestScores) {
    if (won) {
        return /*html*/`
            <img class="layer" src="img/5_background/layers/air.png" alt="">
            <canvas class="cloud-canvas" id="cloudCanvas" width="720" height="480"></canvas>
            <img class="layer" src="img/5_background/layers/3_third_layer/1.png" alt="">
            <img class="layer" src="img/5_background/layers/2_second_layer/1.png" alt="">
            <img class="layer" src="img/5_background/layers/1_first_layer/1.png" alt="">
            <img class="layer won" src="img/9_intro_outro_screens/win/won_1.png" alt="">
            <img class="pepe-gif outro" src="img/2_character_pepe/1_idle/long_idle/idle.gif" alt="">
            <span id="score"><b>Score:<br> ${score}</b></span>
            <span id="highscore">${getHighscoreList(bestScores)}</span>
            <canvas class="cloud-canvas" id="chickenCanvas" width="720" height="480"></canvas>       
            <button class="screen-btn start-btn" onclick="startGame()">Play again</button>
            <button class="screen-btn back-btn" onclick="showMenu()">Back to menu</button>`
    } else {
        return /*html*/`
        <img class="layer" src="img/5_background/layers/air.png" alt="">
        <canvas class="cloud-canvas" id="cloudCanvas" width="720" height="480"></canvas>
        <img class="layer" src="img/5_background/layers/3_third_layer/1.png" alt="">
        <img class="layer" src="img/5_background/layers/2_second_layer/1.png" alt="">
        <img class="layer" src="img/5_background/layers/1_first_layer/1.png" alt="">
        <img class="layer lost" src="img/9_intro_outro_screens/game_over/game over!.png" alt="">
        <img class="pepe-gif outro" src="img/2_character_pepe/1_idle/long_idle/idle.gif" alt="">
        <canvas class="cloud-canvas" id="chickenCanvas" width="720" height="480"></canvas>
        <button class="screen-btn start-btn" onclick="startGame()">Play again</button>
        <button class="screen-btn back-btn" onclick="showMenu()">Back to menu</button>`
    }
}

function getHighscoreList(bestScores) {
    let container = "<b>Highscores:</b><br>";
    for (let i = 1; i < 4; i++) {
        container += i + ".  " + bestScores[i-1] + "<br>"
    }
    return container;
}

