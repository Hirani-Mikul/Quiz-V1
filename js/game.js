// import { Questions } from "./Question.js";
const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBar = document.getElementById("progressBarFull");

let currentQuestion = {};
let questionCounter = 0;
let score = 0;
let availableQuestion = [];
let acceptAnswer = false;
var correctChoice;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestion = [...Questions];
  getQuestion();
};

getQuestion = () => {
  if (availableQuestion.length === 0 || questionCounter >= Questions.length) {
    localStorage.setItem("mostRecentScore", score);
    return window.location.assign("result.html");
  }
  questionCounter++;

  questionCounterText.innerText = `Question: ${questionCounter}/${Questions.length}`;
  progressBar.style.width = `${(questionCounter / Questions.length) * 100}%`;

  var questionIndex = Math.floor(Math.random() * availableQuestion.length);
  currentQuestion = availableQuestion[questionIndex];
  question.textContent = questionCounter + ": " + currentQuestion.Question;

  choices.forEach((choice, i) => {
    choice.textContent = currentQuestion.options[i];
  });
  availableQuestion.splice(questionIndex, 1);
  acceptAnswer = true;

  correctChoice = choices.filter((choice) => {
    const correctAnswer = currentQuestion.answer;
    return choice.dataset.number == correctAnswer;
  });
};

choices.forEach((choice, index) => {
  choice.addEventListener("click", (e) => {
    if (!acceptAnswer) return;
    acceptAnswer = false;
    const selectedOption = e.target;
    const selectedAnswer = selectedOption.dataset["number"];
    const output =
      selectedAnswer == currentQuestion.answer ? "correct" : "wrong";

    if (output === "correct") {
      updateScore();
    } else {
      correctChoice[0].parentElement.classList.add("show-correct");
    }
    selectedOption.parentElement.classList.add(output);
    setTimeout(() => {
      correctChoice[0].parentElement.classList.remove("show-correct");
      selectedOption.parentElement.classList.remove(output);
      getQuestion();
    }, 1000);
  });
});

updateScore = () => {
  score += 10;
  scoreText.innerText = score;
};

startGame();

// document.querySelectorAll(`.choice-text[data-number = "2"]`)[0].innerText;
// const corretAnswer = document.querySelectorAll(
//   `.choice-text[data-number = "2"]`
// );
