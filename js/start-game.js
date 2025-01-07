/**
 * hides all dialogs and menus, sets touch controls and starts init function
 */
function startGame(){
    let startDialog = document.getElementById("startscreen");
    let endDialog = document.getElementById("endscreen");
    let pauseDialog = document.getElementById("pausescreen");
    startDialog.style.display = "none";
    endDialog.style.display = "none";
    pauseDialog.close();
    isPaused = false;
    setTouchControl();
    clearAllIntervals();
    init();
}

