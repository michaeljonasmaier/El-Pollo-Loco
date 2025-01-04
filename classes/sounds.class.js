class Sounds {
    soundOn = true;
    win_sound = new Audio('./audio/win.mp3');
    lose_sound = new Audio('./audio/lose.mp3');

    playSoundIfAllowed(sound){
        if(this.soundOn){
            sound.play();
        }
    }

    stopSound(sound){
        sound.pause();
    }
}