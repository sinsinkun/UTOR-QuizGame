// initialize variables
const quizList = [
    { question: 'What is 1+1?', a: '2', b: '4', c: 'a', d: '11', ans: 'a' },
    { question: 'What is love?', a: 'baby', b: 'dont', c: 'hurt', d: 'me', ans: 'c' },
    { question: 'When is Christmas?', a: 'When September ends', b: 'July', c: 'Everyday', d: 'December', ans: 'd' },
    { question: 'Say apple?', a: 'nod', b: 'apples', c: 'jump', d: 'glados', ans: 'c' },
    { question: 'Slow clap module?', a: 'Potato powered', b: '\*clap clap\*', c: 'Makes lemons', d: 'Makes grenades', ans: 'a' },
    { question: 'What is \"2\"+\"2\"?', a: '11', b: '22', c: '4', d: '5', ans: 'b' },
    { question: 'What is the airspeed of an unladen swallow?', a: '24 miles/hr', b: 'African or European', c: 'Mach 2', d: '10 L/min', ans: 'b' },
    { question: 'What is the study of wombo?', a: 'You wombo', b: 'I wombo', c: 'He/She/We wombo', d: 'Wombology', ans: 'd' },
    { question: 'Who lives in a pineapple under the sea?', a: 'Patrick Star', b: 'Spongebob Squarepants', c: 'Sandy Cheeks', d: 'Mr. Krabs', ans: 'b' },
    { question: 'Nyan-', a: '-cat', b: '-bread', c: '-ners', d: '-rlathotep', ans: 'a' }
]
const maxHighScore = 20;
let score = 0;
let timeInSec = 90;
let thisQ, interval;
// pull out old highscores
let highScore = localStorage.highScore ? JSON.parse(localStorage.highScore) : [];
if (highScore.length > 0) {
    document.querySelector('#hsTable').innerHTML = '';
    for (let i = 0; i < highScore.length; i++) {
        document.querySelector('#hsTable').innerHTML +=
            `<tr>
            <td>${highScore[i].name}</td>
            <td>${highScore[i].score}</td>
        </tr>`;
    }
}

// add event listeners
document.querySelector('#startBtn').addEventListener('click', startBtn);
document.querySelector('#btn1').addEventListener('click', function () { readAns('a') });
document.querySelector('#btn2').addEventListener('click', function () { readAns('b') });
document.querySelector('#btn3').addEventListener('click', function () { readAns('c') });
document.querySelector('#btn4').addEventListener('click', function () { readAns('d') });
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
        // populate UI with quiz answers
        thisQ = quiz[randNum];
        quiz.splice(randNum, 1);
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
    }, 1000);
}

function readAns(btn) {
    if (btn === thisQ.ans) {
        score++;
        document.querySelector('#score').innerHTML = score;
        nextQuestion();
    }
    else {
        timeInSec -= 10;
        if (timeInSec < 0) endGame();
        else {
            document.querySelector('#time').innerHTML = timeInSec;
            document.querySelector('#time').style.color = 'red';
            document.querySelector('#time').style.fontWeight = '900';
            setTimeout(() => {
                document.querySelector('#time').style.color = '';
                document.querySelector('#time').style.fontWeight = '';
            }, 500);
            nextQuestion();
        }
    }
}

function endGame() {
    // stop timer
    clearInterval(interval);
    // Congratulations if time > 0 && quiz.length < 1
    if (timeInSec > -1 && quiz.length < 1) document.querySelector('#question').innerHTML = `You finished! You got ${score}/${quizList.length}.`;
    else document.querySelector('#question').innerHTML = `Out of Time... You got ${score}/${quizList.length}.`;
    // Hide buttons
    document.querySelector('#btn1').classList.add('invisible');
    document.querySelector('#btn2').classList.add('invisible');
    document.querySelector('#btn3').classList.add('invisible');
    document.querySelector('#btn4').classList.add('invisible');
    // save highscore
    saveHS();
    // reset stats
    document.querySelector('#startBtn').innerHTML = 'Start';
    document.querySelector('#time').innerHTML = '0';
    timeInSec = 90;
}

function saveHS() {
    let nm = window.prompt("Please enter initials", "");
    if (nm.length > 3) {
        alert("The initials must be 3 letters or less");
        saveHS();
    }
    else if (nm.length === 0) nm = '-';
    else if (highScore.length > 0) {
        // save new score to highScore list
        console.log('attempting to save highscore');
        let curLength = highScore.length;
        for (let i = 0; i < curLength; i++) {
            console.log('checking current scores');
            if (score > highScore[i].score) {
                highScore.splice(i, 0, { name: nm, score: score });
                break;
            }
            else if (i === highScore.length-1) highScore.push({ name: nm, score: score });
        }
        // if too many scores, remove the lowest score
        if (highScore.length > maxHighScore) highScore.pop();
        // save to local storage
        console.log('before saving to local');
        localStorage.highScore = JSON.stringify(highScore);
        console.log('saved to local');
        // display highscores
        document.querySelector('#hsTable').innerHTML = '';
        for (let i=0; i < highScore.length; i++) {
            document.querySelector('#hsTable').innerHTML +=
            `<tr>
                <td>${highScore[i].name}</td>
                <td>${highScore[i].score}</td>
            </tr>`;
        }
    }
    else {
        highScore.push({ name: nm, score: score });
        localStorage.highScore = JSON.stringify(highScore);
        document.querySelector('#hsTable').innerHTML =
            `<tr>
                <td>${highScore[0].name}</td>
                <td>${highScore[0].score}</td>
            </tr>`;
    }
}

function clearHS() {
    highScore = [];
    localStorage.removeItem('highScore');
    document.querySelector('#hsTable').innerHTML =
        `<tr>
        <td>-</td>
        <td>-</td>
    </tr>`;
}