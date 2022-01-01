const username = document.getElementById("username");
const saveBtn = document.getElementById("saveBtn");
const mostRecentScore = localStorage.getItem("mostRecentScore");
const finalScore = document.getElementById("final-score");
const HIGHSCORE = JSON.parse(localStorage.getItem("HIGHSCORES")) || [];

const MaxNumHighScore = 5;
finalScore.innerText = mostRecentScore || 0;

username.addEventListener("keyup", () => {
  saveBtn.disabled = !username.value.trim();
});

saveScore = (e) => {
  e.preventDefault();

  const score = {
    score: parseInt(mostRecentScore),
    username: username.value,
  };
  HIGHSCORE.push(score);

  HIGHSCORE.sort((a, b) => b.score - a.score);
  HIGHSCORE.splice(MaxNumHighScore);
  localStorage.setItem("HIGHSCORES", JSON.stringify(HIGHSCORE));

  username.value = "";
  setTimeout(() => {
    return window.location.assign("index.html");
  }, 1000);
};
