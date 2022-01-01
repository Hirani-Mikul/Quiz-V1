const Listing = document.getElementById("listing");


const HIGHSCORES = JSON.parse(localStorage.getItem("HIGHSCORES")) || [];

Listing.innerHTML = HIGHSCORES.map(element => {
  return(`<li><span>${element.username}</span><span>${element.score}</span></li>`);
}).join("");
