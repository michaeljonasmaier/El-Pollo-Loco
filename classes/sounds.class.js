class Sounds {
    win_sound = new Audio('./audio/win.mp3');
    lose_sound = new Audio('./audio/lose.mp3');

    playSoundIfAllowed(sound){
        if(soundOn){
            sound.play();
        }
    }

    stopSound(sound){
        sound.pause();
    }
}