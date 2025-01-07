class Highscore{
    score = 0;
    time = 0;
    totalScore = 0;
    bestScores = [0,0,0];

    constructor(){
        this.getFromLocalStorage();
    }

    /**
     * adds point to score
     */
    plusScore(){
        this.score++;
    }

    /**
     * calculates total score if character won based on characters energy, time and his score
     * @param {int} energy - characters energy
     * @param {int} won - has character won the game?
     * @returns 
     */
    calculateTotalScore(energy, won){
        if(won){
            return this.totalScore = 1000 - (this.time*20) + (this.score*50) + (energy*10);
        } else {
            return 0;
        }
    }

    /**
     * pushes this score to highscore list and sort the list
     * @returns highscore list
     */
    getBestScoreList(){
        this.bestScores.push(this.totalScore);
        return this.bestScores.sort((a, b) => b - a);
    }

    /**
     * safes highscore list to local storag
     */
    safeToLocalStorage() {
        localStorage.setItem("bestScores", JSON.stringify(this.bestScores));
    }

    /**
     * gets highscore list from local storage
     */
    getFromLocalStorage() {
        let bestScoresArr = JSON.parse(localStorage.getItem("bestScores"));
        if (bestScoresArr != null) {
            this.bestScores = bestScoresArr;
        }
    }
}