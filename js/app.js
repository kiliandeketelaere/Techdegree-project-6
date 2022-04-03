
// // List of all variables

// const qwerty = document.querySelector('#qwerty')
// const phrase = document.querySelector('#phrase')
// const startButton = document.querySelector('.btn__reset')
// const startOverlay = document.querySelector('#overlay');
// const missed = 0;


// // event listeners

// startButton.addEventListener('click', (event) => {
//         startOverlay.style.display = 'none';
//     }
// );


// // random phrases

// phrases = [
// 'Akuna mattata',
// 'the lion sleeps tonight',
// 'everybody dies but not everyone lives',
// 'out of fear of death, we do not commmit suicide',
// 'a man who stand for everything, will fall for anything'
// ]


// let randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
// let characters = randomPhrase.split('');

// console.log(characters);

// for (i=0; i < randomPhrase.length; i++) {

//     if (characters[i] == ' ') {
//         const list = document.querySelector('ul');
//         list.insertAdjacentHTML(
//             'afterbegin', 
//             `<li class="space"></li>`);
//     } else {
//         const list = document.querySelector('ul');
//         list.insertAdjacentHTML(
//             'afterbegin', 
//             `<li class="letter"></li>`);
//     }
// }



// // checkLetter 
// const buttons = document.querySelectorAll('#qwerty button');
// const letter = document.getElementsByClassName('letter');




// // event listeners 




// buttons.forEach(button => {
//     button.addEventListener('click', () => {
//         button.disabled = true;
//         button.insertAdjacentHTML('afterbegin', '<button class="chosen"></button>');

//         for (i=0; i<characters.length; i++) {

//             if (characters[i] == button.value) {
//                 list.insertAdjacentHTML( 'afterbegin', `<li class="show"></li>`);
//             } else {

//             }


//         }
// });
// });





// Global variables
const overlay = document.getElementById("overlay");
const overlayTitle = overlay.querySelector(".title");
const overlayButton = overlay.querySelector(".btn__reset");
const qwerty = document.getElementById("qwerty");
const phrase = document.getElementById("phrase");
const scoreboard = document.getElementById("scoreboard");
const hearts = scoreboard.querySelectorAll(".tries");
const phrases = ["A pair of pajamas", "Six little ducks", "Spaghetti marinara", "My dad is stronger", "A dime a dozen"];
let currentPhraseNumber = "";
let missed = 0;

//Functions
function getRandomNumber(maxValue) {
    const number = Math.floor(Math.random() * maxValue) + 1;
    return number;
}

function splitPhrase(phrase) {
    const phraseLetters = phrase.split('');
    return phraseLetters;
}

function getRandomPhraseAsArray(arr) {
    const arrayMaxIndex = arr.length - 1;
    let phraseNumber = getRandomNumber(arrayMaxIndex);
    if ( phraseNumber === currentPhraseNumber ) {
        if ( currentPhraseNumber < arrayMaxIndex ) {
            phraseNumber++;
        } else {
            phraseNumber = 0;
        }
    }
    currentPhraseNumber = phraseNumber;
    const phrase = phrases[phraseNumber];
    const arrayOfLetters = splitPhrase(phrase);
    return arrayOfLetters;
}

function addPhraseToDisplay(arr) {
    const ul = phrase.querySelector('ul');
    arr.forEach( char => {
        const li = document.createElement('li');
        li.textContent = char.toUpperCase();
        if ( li.textContent === " " ) {
            li.className = "space";
        } else {
            li.className = "letter";    
        }
        ul.appendChild(li);
    });
}

function checkQwertyLetter(clickedButton) {
    const letters = phrase.querySelectorAll(".letter");
    let letterReturn = null;
    letters.forEach( letter => {
        let letterText = letter.textContent.toLowerCase();
        if ( letterText === clickedButton ) {
            letter.classList.add("show");
            letterReturn = letterText;
        }
    });
    return letterReturn;
}

function chooseQwertyLetter(qwertyLetter) {
    qwertyLetter.classList.add("chosen");
    qwertyLetter.disabled = true;
    return qwertyLetter.textContent;
}

// :'(
function subtractHeart() {
    const numberOfHearts = hearts.length;
    let hiddenHeartCounter = 0;
    hearts.forEach( heart => {
        if ( heart.style.visibility === "hidden" ) {
            hiddenHeartCounter++;
        }
    });
    const numberOfVisibleHearts = numberOfHearts - hiddenHeartCounter;
    const lastVisibleHeartIndex = numberOfVisibleHearts - 1;
    hearts[lastVisibleHeartIndex].style.visibility = "hidden";
}

function showOverlay(className, msg) {
    overlay.className = className;
    overlayTitle.textContent = msg;
    overlayButton.textContent = "Reset game";
    setTimeout(() => {
        overlay.style.display = 'flex';
    }, 400);
}

function checkWin() {
    const lettersInPhrase = phrase.querySelectorAll(".letter").length;
    const revealedLetters = phrase.querySelectorAll(".show").length;  
    if ( lettersInPhrase === revealedLetters ) {
        showOverlay("win", "Congratulations! You win.");
    } else if ( missed >= 5 ) {
        showOverlay("lose", "Sorry, you lost. Better luck next time!")
    }
}

function resetGame() {
    clearPhrase();
    resetQwerty();
    replenishHearts();
    missed = 0;
    runGame();
}

function clearPhrase() {
    const ul = phrase.querySelector("ul");
    const letters = phrase.querySelectorAll("li");
    letters.forEach(letter => {
        ul.removeChild(letter);
    });
}

function resetQwerty() {
    const buttons = qwerty.querySelectorAll("button");
    buttons.forEach( button => {
        button.className = "";
        button.disabled = false;
    });
}

function replenishHearts() {
    hearts.forEach( heart => {
        heart.style.visibility = 'visible';
    });
}

function runGame() {
    const newPhrase = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(newPhrase);
}

// Event listeners
overlay.addEventListener( "click", (e) => {
    const target = e.target;
    if  ( target.tagName === "A" ) {
        buttonText = target.textContent.toLowerCase();
        if ( buttonText === "start game") {
            runGame();
        }
        if ( buttonText === "reset game") {
            resetGame();
        }
        overlay.style.display = "none"
    }
});

qwerty.addEventListener("click", (e) => {
    const target = e.target;
    if ( target.tagName === "BUTTON" ) {
        let buttonText = chooseQwertyLetter(target);
        let buttonMatch = checkQwertyLetter(buttonText);
        if ( buttonMatch === null ) {
            subtractHeart();
            missed++;
        }
        checkWin();
    }
});

