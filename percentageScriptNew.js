let correct = 0;
let incorrect = 0;
let flag = 0;

function hs(){
    if(localStorage.getItem('highScoreP')!=null && localStorage.getItem('highTimeP') != null)
    { document.getElementById('hs').innerHTML = 'High Score: ' + localStorage.getItem('highScoreP') + ' correct in ' + outputTime(localStorage.getItem('highTimeP'));}
    else {document.getElementById('hs').innerHTML = 'High Score: ';}
}
  
hs();

async function pgame() {
    document.getElementById("summary").innerHTML= ""; 
    flag = 0;
    resetStopwatch();
    startStopwatch();
    var inputContainer = document.getElementById("input-container");
    inputContainer.innerHTML = "";
    correct = 0;
    incorrect = 0;

    for (let i = 1; i < 11; i++) {
        let p = Math.floor(Math.random() * 101);
        let n = Math.floor(Math.random() * 1001);


        let correctAnswer = ((p * n) / 100).toFixed(2); 
        let userInput = await retrieveInput(i,p,n,correctAnswer);
    }   
}

function retrieveInput(i,p,n,c) {
    return new Promise(resolve => {
        var inputContainer = document.getElementById("input-container");
        var newContainer = document.createElement("div");

        var questionNumber = document.createElement("h2");
        questionNumber.innerHTML = "Question " + i;
        
        var question = document.createElement("h5");
        question.innerHTML = "What is " + p + "% of " + n;

        var correctionPrompt = document.createElement("h5");
        var counts = document.createElement("h5");
        
        var answer = document.createElement("h5");

        var inputElement = document.createElement("input");
        let elementId = "user-input" + i;
        inputElement.type = "text";
        inputElement.placeholder = "Enter your answer...";
        inputElement.id = elementId;

        inputElement.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                // Simulate a click on the submit button
                submitButton.click();
            }
        });

        var submitButton = document.createElement("button");
        submitButton.type = "button";
        submitButton.textContent = "Submit";
        submitButton.className = "button-3";
        submitButton.onclick = function () {

            if(flag % 2 == 0){
                submitButton.onclick = "";
                
                var userInput = document.getElementById(elementId).value;
                
                if(userInput == "") {userInput = 0};
                
                
                
                if (determineCounts(c,userInput)){
                    if(c!=userInput){
                        answer.innerHTML = "You answered " + userInput + ", the correct answer is " + c + ".";
                    }
                    correctionPrompt.innerHTML = "You answered correctly!";
                    correctionPrompt.style.color = "green";
                    correct++;
                } else {
                    answer.innerHTML = "You answered " + userInput + ", the correct answer is " + c + ".";
                    correctionPrompt.innerHTML = "That was incorrect!";
                    correctionPrompt.style.color = "red";
                    incorrect++;
                }
                counts.innerHTML = "Correct: " + correct + " Incorrect: " + incorrect;

                resolve(userInput);
                if(i==10){
                    stopStopwatch();
                    flag = -1;
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    if((correct >= localStorage.getItem('highScoreP') || (localStorage.getItem('highScoreP') == null))){
                        old_score = localStorage.getItem('highScoreP')
                        localStorage.setItem('highScoreP' , correct);
                        new_score = localStorage.getItem('highScoreP')

                        old_time = localStorage.getItem('highTimeP');
                        new_time = elapsedPausedTime;
                        if((new_time < old_time && old_score == new_score) || new_score > old_score || old_time == null) {
                            localStorage.setItem('highTimeP' , elapsedPausedTime);
                        }
                        new_time = localStorage.getItem('highTimeP');


                        document.getElementById('hs').innerHTML = 'High Score: ' + new_score + ' correct in ' + outputTime(new_time);

                    }
                    document.getElementById("summary").innerHTML = "You got " + correct + " correct and " + incorrect + " incorrect.";
                    document.getElementById("summary").style.alignContent = "center";
                }

            }

        };
        
        newContainer.appendChild(questionNumber);
        newContainer.appendChild(question);
        newContainer.appendChild(inputElement);
        newContainer.appendChild(submitButton);
        newContainer.appendChild(answer);
        newContainer.appendChild(correctionPrompt);
        newContainer.appendChild(counts);

        inputContainer.appendChild(newContainer);
    });

    function determineCounts(correct,input) {
        input = Number(input);
        return correct >= (input - 2.5) && correct <= (input + 2.5) ? true: false;
    }
}

function pause(){
    if(flag != (-1)){
        if(flag%2==0)
        {
            stopStopwatch();
            document.getElementById("pause").innerHTML = "Start";
        }
        else{
            startStopwatch();
            document.getElementById("pause").innerHTML = "Pause";
        }
        flag++;
    }
}



//timer related scripts here

var startTime; // to keep track of the start time
var stopwatchInterval; // to keep track of the interval
var elapsedPausedTime = 0; // to keep track of the elapsed time while stopped

function startStopwatch() {
  if (!stopwatchInterval) {
    startTime = new Date().getTime() - elapsedPausedTime; // get the starting time by subtracting the elapsed paused time from the current time
    stopwatchInterval = setInterval(updateStopwatch, 1000); // update every second
  }
}

function stopStopwatch() {
  clearInterval(stopwatchInterval); // stop the interval
  elapsedPausedTime = new Date().getTime() - startTime; // calculate elapsed paused time
  stopwatchInterval = null; // reset the interval variable
}

function resetStopwatch() {
  stopStopwatch(); 
  elapsedPausedTime = 0; 
  document.getElementById("stopwatch").innerHTML = "00:00:00"; 
}

function updateStopwatch() {
  var currentTime = new Date().getTime(); 
  var elapsedTime = currentTime - startTime; 
  var seconds = Math.floor(elapsedTime / 1000) % 60; 
  var minutes = Math.floor(elapsedTime / 1000 / 60) % 60; 
  var hours = Math.floor(elapsedTime / 1000 / 60 / 60); 
  var displayTime = pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);
  document.getElementById("stopwatch").innerHTML = displayTime; 
}

function outputTime(time){
        let seconds = Math.floor(time / 1000) % 60; 
        let minutes = Math.floor(time / 1000 / 60) % 60; 
        let hours = Math.floor(time / 1000 / 60 / 60);
        let  DT = pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);
        return DT;
    }
function compareTimes() {
    if (elapsedPausedTime < localStorage.getItem('highTimeP')){
        return true;
    } else{
        return false;
    }
  }
  
function pad(number) {
  return (number < 10 ? "0" : "") + number;
}