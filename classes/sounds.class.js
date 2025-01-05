class Sounds {
    win_sound = new Audio('./audio/win.mp3');
    lose_sound = new Audio('./audio/lose.mp3');
    

    playSoundIfAllowed(sound, allSoundsArr){
        if(!allSoundsArr.includes(sound)){
            allSoundsArr.push(sound);
        }
       
        if(soundOn){
            sound.play();
        }
    }

    stopSound(sound){
        if(this.isPlaying(sound)){    
            sound.pause();
        } 
    }

    isPlaying(sound) {
        return !sound.paused && sound.currentTime > 0 && !sound.ended;
      }
   
}