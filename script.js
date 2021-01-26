// initialize variables
const quizList = [
    {question:'What is 1+1?', a:'2', b:'4', c:'a', d:'11', ans:'a'},
    {question:'What is love?', a:'baby', b:'dont', c:'hurt', d:'me', ans:'c'},
    {question:'When is Christmas?', a:'When September ends', b:'July', c:'Everyday', d:'December', ans:'d'},
    {question:'Say apple?', a:'nod', b:'apples', c:'jump', d:'glados', ans:'c'},
    {question:'Slow clap module?', a:'Potato powered', b:'\*clap clap\*', c:'Makes lemons', d:'Makes grenades', ans:'a'},
    {question:'What is \"2\"+\"2\"?', a:'11', b:'22', c:'4', d:'5', ans:'b'},
    {question:'What is the airspeed of an unladen swallow?', a:'24 miles/hr', b:'African or European', c:'Mach 2', d:'10 L/min', ans:'b'},
    {question:'What is the study of wombo?', a:'You wombo', b:'I wombo', c:'He/She/We wombo', d:'Wombology', ans:'d'},
    {question:'Who lives in a pineapple under the sea?', a:'Patrick Star', b:'Spongebob Squarepants', c:'Sandy Cheeks', d:'Mr. Krabs', ans:'b'},
    {question:'Nyan-', a:'-cat', b:'-bread', c:'-ners', d:'-rlathotep', ans:'a'}
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
        // show buttons & reset score
        document.querySelector('#btn1').classList.remove('invisible');
        document.querySelector('#btn2').classList.remove('invisible');
        document.querySelector('#btn3').classList.remove('invisible');
        document.querySelector('#btn4').classList.remove('invisible');
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
    if (quiz.length > 0) {
        randNum = Math.floor(Math.random() * quiz.length);
        console.log(randNum + '/' + quiz.length);
        // populate UI with quiz answers
        thisQ = quiz[randNum];
        quiz.splice(randNum,1);
        document.querySelector('#question').innerHTML = thisQ.question;
        document.querySelector('#btn1').innerHTML = thisQ.a;
        document.querySelector('#btn2').innerHTML = thisQ.b;
        document.querySelector('#btn3').innerHTML = thisQ.c;
        document.querySelector('#btn4').innerHTML = thisQ.d;
    }
    else endGame();
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
    if (btn === thisQ.ans) {
        score++;
        document.querySelector('#score').innerHTML = score;
    }
    else {
        timeInSec -= 10;
        document.querySelector('#time').innerHTML = timeInSec;
    }
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
    if (timeInSec > -1 && quiz.length < 1) document.querySelector('#question').innerHTML = `You got ${score}/${quizList.length}. Congratulations!`;
    else document.querySelector('#question').innerHTML = 'Out of Time...';
    // Hide buttons
    document.querySelector('#btn1').classList.add('invisible');
    document.querySelector('#btn2').classList.add('invisible');
    document.querySelector('#btn3').classList.add('invisible');
    document.querySelector('#btn4').classList.add('invisible');
    // reset stats
    clearInterval(interval);
    document.querySelector('#startBtn').innerHTML = 'Start';
    document.querySelector('#time').innerHTML = '0';
    timeInSec = 90;
}

function clearHS() {
    highScore = 0;
    localStorage.removeItem('highScore');
    document.querySelector('#highScore').innerHTML = '0';
}