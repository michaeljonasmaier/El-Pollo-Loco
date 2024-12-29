class Highscore{
    score = 0;
    time = 0;
    totalScore = 0;

    plusScore(){
        this.score++;
    }

    calculateTotalScore(energy){
        return this.totalScore = 1000 - (this.time*20) + (this.score*50) + (energy*10);
    }

}