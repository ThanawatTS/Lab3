var btn1,
    btn2,
    btn3,
    btn4,
    question,
    currentQuestion,
    ourRequest,
    ourData,
    numberOfQuestions,
    randomQuestion,
    gameStart = false,
    gameOver = false,
    score,
    time = 0,
    running = 0,
    runningOut = 0,
    timeOut = 300; 

window.onload = function(){
    btn1 = document.getElementById('Abtn1');
    btn2 = document.getElementById('Abtn2');
    btn3 = document.getElementById('Abtn3');
    btn4 = document.getElementById('Abtn4');
    question = document.getElementById('question');
    currentQuestion = 0;
    fetchData();
}

function fetchData(){
    ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', 'https://api.myjson.com/bins/1g1ou9');
    ourRequest.onload = function(){
    console.log(ourRequest.responseText);
    ourData = JSON.parse(ourRequest.responseText);
    };
    ourRequest.send();
}

function startGame(numberOfQuestion){
    gameStart = true;
    gameOver = false;
    numberOfQuestions = numberOfQuestion;
    currentQuestion = 0;
    score = 0;
    document.getElementById('score').innerHTML = 'Score : 0/' + numberOfQuestions;
    document.getElementById('result').innerHTML = 'Game started';
    document.getElementById('totaltime').innerHTML ="" ;
    document.getElementById('averagetime').innerHTML = "";
    resetClock();
    startStopClock();
    nextQuestion();
    resetOut();
    startOut();
}

function renderCurrentQuestion(){
    document.getElementById('questionNumber').innerHTML  = 'Question : ' +parseInt(currentQuestion+1) +'/'+ numberOfQuestions;
}

function nextQuestion(){
    if ( currentQuestion >= numberOfQuestions ){
        gameOver = true;
        startStopClock();
        stopOut();
        updateTime();
        document.getElementById('result').innerHTML = 'Game over';
        document.getElementById('timer').innerHTML = '30.0';
    } 
    else {
        resetOut();
        startOut();
        renderCurrentQuestion();
    while ( true ){
        var x = randomNumber();
        if ( x == randomQuestion ){
    }
    else{
    randomQuestion = x;
    break;
    }
    }
    console.log(randomQuestion);
    renderQuestion(randomQuestion);
    }
}

function randomNumber(){
    return Math.floor(Math.random() * ourData.Questions.length);
}

function renderQuestion(i){
    question.innerHTML = ourData.Questions[i].question;
    btn1.innerHTML = ourData.Questions[i].choice[0];
    btn2.innerHTML = ourData.Questions[i].choice[1];
    btn3.innerHTML = ourData.Questions[i].choice[2];
    btn4.innerHTML = ourData.Questions[i].choice[3];
}

function answer(i) {

    if ( !gameOver && gameStart){

    if ( i == 99 ){
    
    }
    else if ( ourData.Questions[randomQuestion].choice[i-1] == ourData.Questions[randomQuestion].answer){
        document.getElementById('result').innerHTML = 'Correct';
        document.getElementById('score').innerHTML = 'Score : ' + (score += 1) + '/' + numberOfQuestions ;
    }
    else{
        console.log('incorrect');
        document.getElementById('result').innerHTML = 'Wrong';
    }
    currentQuestion += 1;
    nextQuestion();
    }
   else{

    }
}

function startStopClock(){
    if ( running == 0 ) {
        running = 1;
        console.log(running);
        increment();
    }
    else {
        running = 0;
    }
}

function resetClock(){
    running = 0;
    time = 0;
}

function increment(){
    if ( running == 1 ){
        setTimeout(function(){
            time++;
            console.log(time);
            increment();
        },100);
    }
}

function updateTime(){
    var mins = Math.floor(time/10/60);
    var secs = Math.floor(time/10);
    var tenths = time % 10;
    document.getElementById('totaltime').innerHTML ='Total time : ' + mins + ' : ' + secs + ' : ' + tenths ;
    document.getElementById('averagetime').innerHTML = 'Average time per question '  + (time/10/numberOfQuestions).toFixed(3) + ' seconds';
}

function startOut(){
    if ( runningOut == 0 ){
        runningOut = 1;
        Outdeduction();
    }
    else{
        runningOut = 0;
    }
    }

function stopOut(){
    if ( runningOut == 1 ){
        runningOut = 0;
    }
}

function resetOut(){
    runningOut = 0;
    timeOut = 300;
}

function Outdeduction(){
    if ( runningOut == 1 ){
        setTimeout(function(){
        timeOut--;
        if (timeOut <= 0 ){
        answer(99);
        }
        var mins = Math.floor(timeOut/10/60);
        var secs = Math.floor(timeOut/10);
        var tenths = timeOut % 10;
        document.getElementById('timer').innerHTML = secs + " : " + tenths;
        Outdeduction();
        },100);
    }
}
