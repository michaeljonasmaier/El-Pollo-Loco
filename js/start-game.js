function startGame(){
    let startDialog = document.getElementById("startscreen");
    let endDialog = document.getElementById("endscreen");
    let pauseDialog = document.getElementById("pausescreen");
    startDialog.close();
    endDialog.close();
    pauseDialog.close();
    isPaused = false;
    init();
}
