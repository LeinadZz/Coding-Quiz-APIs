const username = document.querySelector('#username');
const saveHighScore = document.querySelector('#saveScore');
const finalScore = document.querySelector('#finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');
const error = document.querySelector('#error');
const highScores = JSON.parse(localStorage.getItem('highScores')) || []
const MAX_HIGH_SCORE = 5;

finalScore.innerText = mostRecentScore

username.addEventListener('keyup', function() {
    saveHighScore.disabled = !username.value
})

function saveScore(event) {
    event.preventDefualt()

    const initials = username.value.toUpperCase();

    if (inputIsValid(initials)) {
        const score = mostRecentScore.value;
        const highScoreEntry = getNewHighScoreEntry(initials, score);
        saveHighScoreEntry(highScoreEntry);
        window.location.assign("./highscores.html");
    }
}

function getNewHighScoreEntry(initials, score) {
    const entry = {
        initials: initials.value,
        score: score,
    }
    return entry;
}

function inputIsValid(initials) {
    let errorMessage = "";
    if(initials === "") {
        errorMessage.innerText = "You have to enter your initials !"
        console.log(errorMessage);
        displayFormError(errorMessage);
        return false;
    } else if (initials.match(/[^a-z]/ig)) {
        errorMessage = "Initials can only include letters, sorry !"
        displayFormError(errorMessage);
        return false;
    } else {
        return true;
    }
}

function displayFormError(errorMessage) {
    error.textContent = errorMessage;
    if (!username.classList.contains('error')) {
        username.classList.add('error');
    }
}

//Saves score

function saveHighScoreEntry(highScoreEntry) {

    const currentScore = getScoreList();

    placeScore(highScoreEntry,currentScore);
    localStorage.setItem('highscoreEntry', JSON.stringify(currentScore));
}

//gets score out of local storage

function getScoreList() {

    const currentScore = localStorage.getItem('scoreList');

    if (currentScore) {
        return JSON.parse(currentScore)
    } else {
        return [];
    }
}

function placeScore(newEntry, scoreList) {
    const newScoreIndex = getNewScoreIndex(newEntry, scoreList);
    scoreList.splice(newScoreIndex, 0, newEntry);
}
//Should place highscore into leaderboard

function getNewScoreIndex(newEntry, scoreList) {
    if(scoreList.length > 0) {
        for (let i = 0; i < scoreList.length; i++) {
            if(scoreList[i].score <= newEntry.score) {
                return i;
            }
        }
    }
    return scoreList.length;
}