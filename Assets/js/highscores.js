const highScoresList = document.querySelector('#highScoresList')
const highScores = JSON.parse(localStorage.getItem('highscoreEntry')) || []

function displayScore() {
    localStorage.getItem('highscoreEntry');
    score = highScores;
    highScoresList.innerHTML += `<li class="high-score">${score.name} - ${score.score}</li>`;
    console.log(score);
}
displayScore();

