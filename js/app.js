//
// global variables
//
let qwerty = document.getElementById("qwerty");
let phrase = document.getElementById("phrase");
let missed = 0;
let scoreboard = document.querySelector("#scoreboard ol");
let overlay = document.getElementById("overlay");
let title = document.querySelector("#overlay .title");
let startButton = document.querySelector(".btn__reset");
let list = document.querySelector("#phrase ul");

//
// declarations of Array
//
let phrases = [
  "a pair of pajamas",
  "six little ducks",
  "spaghetti marinara",
  "my dad is stronger",
  "a dime a dozen",
];

//
// Hide overlay and reset the game
//
startButton.addEventListener("click", start);

function start(e) {
  overlay.style.display = "none";
  resetGame();
}

function resetGame(e) {
  clearGame(phrases);
}

//
// Random phrase function
//
const getRandomPhraseAsArray = (phrases) => {
  let randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
  return Array.from(randomPhrase);
};

// 
// Add li item to display letter 
//

const addPhraseToDisplay = (phrase, ul) => {
  for (const char of phrase) {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(char));
    ul === undefined ? list.appendChild(li) : ul.appendChild(li);
    if (char >= "a" && char <= "z") {
      li.classList.add("letter");
    } else {
      li.classList.add("space");
    }
  }
};

const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);

//
// Search for the matching letters 
//

const checkLetter = (button) => {
  const storeAllLI = document.querySelectorAll("#phrase ul li");
  let match = null;
  for (let i = 0; i < storeAllLI.length; i++) {
    const li = storeAllLI[i];
    if (button.innerText === li.innerText) {
      li.classList.add("show");
      li.style.transition = "all 0.7s ease";
      match = button.innerText;
    }
  }
  return match;
};

// 
// Count the wins and losses
//

qwerty.addEventListener("click", (event) => {
  if (event.target.tagName == "BUTTON") {
    event.target.className = "chosen";
    let letterFound = checkLetter(event.target);
    if (letterFound === null) {
      missed++;
      event.target.disabled = true;
      scoreboard.removeChild(scoreboard.firstElementChild);
      let lostHeartLi = document.createElement("li");
      let lostHeartImg = document.createElement("img");
      lostHeartImg.src = "images/lostHeart.png ";
      lostHeartImg.className = "imgTries";
      lostHeartLi.appendChild(lostHeartImg);
      scoreboard.appendChild(lostHeartLi);
    }
  }
  checkWin();
});

// 
// Check the win/loss counter
// 

function checkWin() {
  let letter = document.querySelectorAll(".letter");
  let show = document.querySelectorAll(".show");
  if (letter.length == show.length) {
    overlay.className = "win";
    title.textContent = "Congrats You Win!";
    startButton.textContent = "Play another game?";
    overlay.style.display = "flex";
  }
  if (missed === 5) {
    overlay.className = "lose";
    title.textContent = "You Lose!";
    startButton.textContent = "Play another game?";
    overlay.style.display = "flex";
  }
}

// 
// rest function
//

function resetPhrase(arr) {
  phrase.removeChild(phrase.firstElementChild);
  let ul = document.createElement("ul");
  ul.classList.add("reset_list");
  phrase.appendChild(ul);
  addPhraseToDisplay(arr, ul);
}

//
// reset scoreboard and keyboard
//

function resetScoreboard() {
  for (let i = 0; i < 5; i++) {
    scoreboard.removeChild(scoreboard.firstElementChild);
    let liveHeartLi = document.createElement("li");
    let liveHeartImg = document.createElement("img");
    liveHeartImg.src = "images/liveHeart.png";
    liveHeartImg.className = "imgTries";
    scoreboard.appendChild(liveHeartLi);
    liveHeartLi.appendChild(liveHeartImg);
  }
}


function resetQWERTY() {
  let qwerty = document.querySelectorAll("#qwerty button");
  for (let i = 0; i < qwerty.length; i++) {
    qwerty[i].disabled = false;
    qwerty[i].classList.remove("chosen");
  }
}

//
// clear the game
// 

function clearGame(arr) {
  let phrases = getRandomPhraseAsArray(arr);
  resetPhrase(phrases);
  resetScoreboard();
  resetQWERTY();
  missed = 0;
  overlay.style.display = "none";
}