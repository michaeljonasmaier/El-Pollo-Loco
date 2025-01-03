function startGame(){
    let startDialog = document.getElementById("startscreen");
    let endDialog = document.getElementById("endscreen");
    let pauseDialog = document.getElementById("pausescreen");
    startDialog.style.display = "none";
    endDialog.style.display = "none";
    pauseDialog.close();
    isPaused = false;
    clearAllIntervals();
    init();
}
