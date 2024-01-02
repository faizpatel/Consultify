let correct = 0;
let incorrect = 0;
let flag = 0;

async function pgame() {
    flag = 0;
    resetStopwatch();
    startStopwatch();
    var inputContainer = document.getElementById("input-container");
    inputContainer.innerHTML = "";
    correct = 0;
    incorrect = 0;

    for (let i = 1; i < 11; i++) {
        let p = Math.floor(Math.random() * 13);
        let n = Math.floor(Math.random() * 13);

        let correctAnswer = (p * n).toFixed(0); 
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
        question.innerHTML = "What is " + p + " x " + n;

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
            submitButton.onclick = "";
            
            var userInput = document.getElementById(elementId).value;
            
            answer.innerHTML = "You answered " + userInput + ", the correct answer is " + c + ".";
            
            if (determineCounts(c,userInput)){
                correctionPrompt.innerHTML = "You answered correctly!";
                correct++;
            } else {
                correctionPrompt.innerHTML = "That was incorrect!";
                incorrect++;
            }
            counts.innerHTML = "Correct: " + correct + " Incorrect: " + incorrect;

            resolve(userInput);
            if(i==10){
                stopStopwatch();
                flag = -1;
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
        return correct == input ? true: false;
    }
}

function pause(){
    if(flag != (-1)){
        if(flag%2==0)
        {
            stopStopwatch();
        }
        else{
            startStopwatch();
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
  stopStopwatch(); // stop the interval
  elapsedPausedTime = 0; // reset the elapsed paused time variable
  document.getElementById("stopwatch").innerHTML = "00:00:00"; // reset the display
}

function updateStopwatch() {
  var currentTime = new Date().getTime(); // get current time in milliseconds
  var elapsedTime = currentTime - startTime; // calculate elapsed time in milliseconds
  var seconds = Math.floor(elapsedTime / 1000) % 60; // calculate seconds
  var minutes = Math.floor(elapsedTime / 1000 / 60) % 60; // calculate minutes
  var hours = Math.floor(elapsedTime / 1000 / 60 / 60); // calculate hours
  var displayTime = pad(hours) + ":" + pad(minutes) + ":" + pad(seconds); // format display time
  document.getElementById("stopwatch").innerHTML = displayTime; // update the display
}

function pad(number) {
  // add a leading zero if the number is less than 10
  return (number < 10 ? "0" : "") + number;
}