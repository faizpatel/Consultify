let correct = 0;
let incorrect = 0;

async function pgame() {
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