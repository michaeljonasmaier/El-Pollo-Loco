class Highscore{
    score = 0;
    time = 0;
    totalScore = 0;
    bestScores = [300, 400, 100, 20, 1000];

    constructor(){
        this.getFromLocalStorage();
    }


    plusScore(){
        this.score++;
    }

    calculateTotalScore(energy, won){
        if(won){
            return this.totalScore = 1000 - (this.time*20) + (this.score*50) + (energy*10);
        } else {
            return 0;
        }
    }

    getBestScoreList(){
        this.bestScores.push(this.totalScore);
        return this.bestScores.sort((a, b) => b - a);
    }

    safeToLocalStorage() {
        localStorage.setItem("bestScores", JSON.stringify(this.bestScores));
    }

    getFromLocalStorage() {
        let bestScoresArr = JSON.parse(localStorage.getItem("bestScores"));
    
        if (bestScoresArr != null) {
            this.bestScores = bestScoresArr;
        }
    }
}