const question = document.querySelector('#question');
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const choices = Array.from(document.querySelectorAll('.choice-text'));

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'How do you write an IF statement',
        choice1: 'if i == 5 then',
        choice2: 'if i = 5 then',
        choice3: 'if (i == 5)',
        choice4: 'if i == 5',
        answer: 3, 
    },
    {
        question: 'How does a FOR loop start',
        choice1: 'for (i = 0; i <= 5; i++)',
        choice2: 'for (i = 0; i <= 5)',
        choice3: 'for (i <= 5; i++;)',
        choice4: 'for i = 1 to 5',
        answer: 1, 
    },
    {
        question: 'What is the correct way to write an array',
        choice1: 'var colors = ("red", "green", "blue") ',
        choice2: 'var colors = ["red", "green", "blue"] ',
        choice3: 'var colors = "red", "green", "blue" ',
        choice4: 'var colors = {"red", "green", "blue"} ',
        answer: 2, 
    },
    {
        question: 'What element is used to store multiple values in a single variable',
        choice1: 'strings',
        choice2: 'functions',
        choice3: 'variables',
        choice4: 'arrays',
        answer: 4, 
    }
]

var SCORE_POINTS = 100
const TIME_REMAINING = 0;
const MAX_QUESTIONS = 4;

function startGame() {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion;
}

function getNewQuestion() {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('./end.html')
    }

    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1);

    acceptingAnswers = true;
}

choices.forEach(choice => {
    choice.addEventListener('click', function (e) {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            SCORE_POINTS++;
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(function () {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()