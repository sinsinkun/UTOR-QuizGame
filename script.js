// initialize variables
const quizList = [
    {question:'What is 1+1', a:'2', b:'4', c:'6', d:'8', ans:'a'},
    {question:'What is 1+2', a:'6', b:'3', c:'5', d:'10', ans:'b'},
    {question:'What is 1+3', a:'9', b:'b', c:'q', d:'4', ans:'d'},
    {question:'What is 1+4', a:'7', b:'apples', c:'5', d:'20', ans:'c'},
    {question:'What is 1+5', a:'2', b:'0', c:'99', d:'6', ans:'d'},
    {question:'What is 1+6', a:'11', b:'7', c:'22', d:'5', ans:'b'}
]
let score = 0;
let timeInSec = 90;
let thisQ, interval;
let highScore = localStorage.highScore ? localStorage.highScore : 0;
document.querySelector('#highScore').innerHTML = highScore;


// add event listeners
document.querySelector('#startBtn').addEventListener('click', startBtn);
document.querySelector('#btn1').addEventListener('click', function() {readAns('a')});
document.querySelector('#btn2').addEventListener('click', function() {readAns('b')});
document.querySelector('#btn3').addEventListener('click', function() {readAns('c')});
document.querySelector('#btn4').addEventListener('click', function() {readAns('d')});
document.querySelector('#clearHS').addEventListener('click', clearHS);

function startBtn() {
    // if stopping quiz
    if (document.querySelector('#startBtn').innerHTML === 'Stop') endGame();
    // if starting quiz
    else {
        document.querySelector('#startBtn').innerHTML = 'Stop';
        document.querySelector('#score').innerHTML = '0';
        score = 0;
        quiz = quizList.slice();
        startTimer();
        nextQuestion();
    }
}

function nextQuestion() {
    let randNum;
    // check if questions are left
    if (quiz.length > 0) randNum = Math.floor(Math.random() * (quiz.length-1));
    else endGame();
    // populate UI with quiz answers
    thisQ = quiz[randNum];
    quiz.splice(randNum,1);
    document.querySelector('#question').innerHTML = thisQ.question;
    document.querySelector('#btn1').innerHTML = thisQ.a;
    document.querySelector('#btn2').innerHTML = thisQ.b;
    document.querySelector('#btn3').innerHTML = thisQ.c;
    document.querySelector('#btn4').innerHTML = thisQ.d;
}

function startTimer() {
    document.querySelector('#time').innerHTML = timeInSec;
    interval = setInterval(() => {
        // tick the timer every second, until 0
        timeInSec--;
        if (timeInSec > -1) document.querySelector('#time').innerHTML = timeInSec;
        else endGame();
    },1000);
}

function readAns(btn) {
    console.log('pressed button: ' + btn);
    if (btn === thisQ.ans) {
        score++;
        document.querySelector('#score').innerHTML = score;
    }
    else timeInSec -= 10;
    nextQuestion();
}

function endGame() {
    // save highscore
    if (score > highScore) {
        highScore = score;
        localStorage.highScore = score;
        document.querySelector('#highScore').innerHTML = score;
    }
    // Congratulations if time > 0 && quiz.length < 1
    if (timeInSec > -1 && quiz.length < 1) document.querySelector('#question').innerHTML = 'You finished!';
    else document.querySelector('#question').innerHTML = 'Better luck next time...';
    // Reset buttons
    document.querySelector('#btn1').innerHTML = '1';
    document.querySelector('#btn2').innerHTML = '2';
    document.querySelector('#btn3').innerHTML = '3';
    document.querySelector('#btn4').innerHTML = '4';
    // reset stats
    clearInterval(interval);
    document.querySelector('#startBtn').innerHTML = 'Start';
    document.querySelector('#time').innerHTML = '0';
    timeInSec = 90;
}

function clearHS() {
    highScore = 0;
    localStorage.removeItem(highScore);
    document.querySelector('#highScore').innerHTML = '0';
}