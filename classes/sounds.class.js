class Sounds {
    win_sound = new Audio('./audio/win.mp3');
    lose_sound = new Audio('./audio/lose.mp3');
    
    /**
     * plays a sound if its not already been played and puts it to allsounds array
     * @param {Audio} sound - Soundfile
     * @param {Audio} allSoundsArr - Array of all Soundfiles
     */
    playSoundIfAllowed(sound, allSoundsArr){
        if(!allSoundsArr.includes(sound)){
            allSoundsArr.push(sound);
        }   
        if(soundOn){
            sound.play();
        }
    }

    /**
     * pauses an Audio if its currently playing
     * @param {Audio} sound - Soundfile
     */
    stopSound(sound){
        if(this.isPlaying(sound)){    
            sound.pause();
        } 
    }

    /**
     * checks if Audio is currently playing
     * @param {Audio} sound - Soundfile
     * @returns if Audio is currently playing
     */
    isPlaying(sound) {
        return !sound.paused && sound.currentTime > 0 && !sound.ended;
      } 
}