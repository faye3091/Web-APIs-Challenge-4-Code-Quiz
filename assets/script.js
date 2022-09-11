let viewBtn = document.querySelector("#view-scores");
let timerEl = document.querySelector("#countdown");
const startBtn = document.querySelector("#start-quiz");
let questionsEl = document.querySelector("#questions");
let quizEl = document.querySelector("#quizes");
const resultEl = document.querySelector("#result");
const middleEl = document.querySelector(".middle");
//Numbers of questions they have answered
let questionCount = 0;

//answer buttons
const ansBtn = document.querySelectorAll("button.ansBtn");
const ans1 = document.querySelector("#answer1");
const ans2 = document.querySelector("#answer2");
const ans3 = document.querySelector("#answer3");
const ans4 = document.querySelector("#answer4");

let scoreEl = document.querySelector("#score");
const finalEl = document.querySelector("#final");
let initialsInput = document.querySelector("#initials");

const highScoresEl = document.querySelector("#highscores");
let scoreListEl = document.querySelector("#score-list");
//aray of scores
let scoreList = [];

const submitScrBtn = document.querySelector("#submit-score");
const goBackBtn = document.querySelector("#goback");
const clearScrBtn = document.querySelector("#clearscores");

//Questions with the correct answer
const questions = [
  {
    //question 0
    question: "Commonly used data types do NOT include:",
    answers: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    correctAnswer: "2",
  },
  {
    // question 1
    question:
      "The condition in an if / else statement is enclosed within ____.",
    answers: [
      "1. quotes",
      "2. curly brackets",
      "3. parentheses",
      "4. square brackets",
    ],
    correctAnswer: "1",
  },
  {
    // question 2
    question: "Arrays in Javascript can be used to store ____.",
    answers: [
      "1. numbers and strings",
      "2. other arrays",
      "3. booleans",
      "4. all of the above",
    ],
    correctAnswer: "3",
  },
  {
    // question 3
    question:
      "String values must be enclosed within ____ when being assigned to variables.",
    answers: ["1. commmas", "2. curly brackets", "3. quotes", "4. parentheses"],
    correctAnswer: "2",
  },
  {
    // question 4
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    answers: [
      "1. Javascript",
      "2. terminal/bash",
      "3. for loops",
      "4. console.log",
    ],
    correctAnswer: "3",
  },
];

//functions

//Timer that counts down from 75 seconds
let timeLeft = 75;
function timer() {
  // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
  let timeInterval = setInterval(function () {
    timerEl.textContent = "Time: " + timeLeft + "s";
    timeLeft--;
    //either the timeLeft is 0 or the user is at the end of the questions, then it will show the score automatically
    if (timeLeft === 0 || questionCount === questions.length) {
      //use clearInterval() to stop the timer
      clearInterval(timeInterval);
      questionsEl.style.display = "none";
      finalEl.style.display = "block";
      scoreEl.textContent = timeLeft;
    }
  }, 1000);
  timeLeft = 75;
}

//start quiz with timer and show the questions one by one
function startQuiz() {
  middleEl.style.display = "none";
  questionsEl.style.display = "block";
  questionCount = 0;
  timer();
  setQuestion(questionCount);
}

//This is to set question; takes in a count and displays the next question/answers
function setQuestion(id) {
  if (id < questions.length) {
    quizEl.textContent = questions[id].question;
    ans1.textContent = questions[id].answers[0];
    ans2.textContent = questions[id].answers[1];
    ans3.textContent = questions[id].answers[2];
    ans4.textContent = questions[id].answers[3];
  }
}

//This is to check answer and then move on to the next question
function checkAnswer(event) {
  event.preventDefault();
  // show div for result and append message
  resultEl.style.display = "block";
  let p = document.createElement("p");
  resultEl.appendChild(p);
  //show the result for 1.5 seconds
  setTimeout(function () {
    p.style.display = "none";
  }, 1500);

  //checks the answers of the user
  if (questions[questionCount].correctAnswer === event.target.value) {
    p.textContent = "Correct!";
  } else if (questions[questionCount].correctAnswer !== event.target.value) {
    //if the answer is wrong it will also deduct 10 seconds in the time
    timeLeft = timeLeft - 10;
    p.textContent = "Wrong!";
  }

  //increments the questions index
  if (questionCount < questions.length) {
    questionCount++;
  }
  //call setQuestions for the next question
  setQuestion(questionCount);
}

//adds scores
function addScore(event) {
  event.preventDefault();
  finalEl.style.display = "none";
  highScoresEl.style.display = "block";

  let init = initialsInput.value.toUpperCase();
  scoreList.push({ initials: init, score: timeLeft });

  //sort scores in order
  scoreList = scoreList.sort((a, b) => {
    if (a.score < b.score) {
      return 1;
    } else {
      return -1;
    }
  });

  scoreListEl.innerHTML = "";
  for (let i = 0; i < scoreList.length; i++) {
    let li = document.createElement("li");
    li.textContent = `${scoreList[i].initials}: ${scoreList[i].score}`;
    scoreListEl.append(li);
  }

  //add to local storage
  storeScores();
  displayScores();
}

function storeScores() {
  localStorage.setItem("scoreList", JSON.stringify(scoreList));
}

function displayScores() {
  //Get the stored scores from localStorage
  //Parsing the JSON string to an object
  let storedScoreList = JSON.parse(localStorage.getItem("scoreList"));

  //If scores were retrieved from localStorage, update the scoreList array to it
  if (storedScoreList !== null) {
    scoreList = storedScoreList;
  }
}

//clear scores
function clearScores() {
  localStorage.clear();
  scoreListEl.innerHTML = "";
}

//Event Listeners
//Start timer and display questions one by one when click star quiz button
startBtn.addEventListener("click", startQuiz);

//check for the answer loop
ansBtn.forEach((item) => {
  item.addEventListener("click", checkAnswer);
});

// Add score
submitScrBtn.addEventListener("click", addScore);

//Go back button
goBackBtn.addEventListener("click", function () {
  highScoresEl.style.display = "none";
  middleEl.style.display = "block";
  timeLeft = 75;
  timerEl.textContent = "Time: " + timeLeft + "s";
});

//clear the scores
clearScrBtn.addEventListener("click", clearScores);

//if High Scores button is clicked then it hides the middleEl then shows the highScores
viewBtn.addEventListener("click", function () {
  if (highScoresEl.style.display === "none") {
    highScoresEl.style.display = "block";
    middleEl.style.display = "none";
  } else if (highScoresEl.style.display === "block") {
    highScoresEl.style.display = "none";
    middleEl.style.display = "block";
  } else {
    return alert("No scores to show!");
  }
});
