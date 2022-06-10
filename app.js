const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const phraseUL = document.querySelector('#phrase ul')
const startButton = document.querySelector(`.btn__reset`);
const overlay = document.querySelector('.start');
const heartContainer = document.querySelector('#scoreboard ol');
let missed = 0;
const phrases = [
    "Survivor",
    "The X Files",
    "American Horror Story",
    "Stranger Things",
    "Drag Race",
    "Family Guy",
    "The Simpsons",
    "Breaking Bad",
    "The Sopranos",
    "The Golden Girls"    
];


// return a random phrase from an array
const getRandomPhraseAsArray = arr => {
    const numberOfPhrases = phrases.length;
    const randomArrayIndex = Math.floor(Math.random()*numberOfPhrases);
    const chosenPhrase = arr[randomArrayIndex];
    const chosenPhraseAsArray = chosenPhrase.split(``);
    return chosenPhraseAsArray;
}

// sleep function, taken from https://www.sitepoint.com/delay-sleep-pause-wait/
function sleep(ms) {
    return new Promise(
      resolve => setTimeout(resolve, ms)
    );
  }

// adds the lttters of a string to the display
async function addPhraseToDisplay(arr) {
    disableKeyboard();
    for (let i = 0; i < arr.length; i++) {
        await sleep(150);
        const li = document.createElement('li');
        const letter = arr[i];
        li.textContent = letter;
        phraseUL.appendChild(li);
        if (letter != ' ') {
            li.className = 'letter';
        }
        else {
            li.className = 'space';
        }
    }
    enableKeyboard();
}

// disables keyboard while phrase is loaded
const disableKeyboard = () => {
    const keyRows = document.getElementsByClassName('keyrow');
    for (let i = 0; i < keyRows.length; i++) {
        let keyboardKeys = keyRows[i].children;
        for (let y = 0; y < keyboardKeys.length; y++) {
            keyboardKeys[y].disabled = true;
            keyboardKeys[y].className = 'chosen';
        }
    }
}

// renables keyboard afterward
const enableKeyboard = () => {
    const keyRows = document.getElementsByClassName('keyrow');
    for (let i = 0; i < keyRows.length; i++) {
        let keyboardKeys = keyRows[i].children;
        for (let y = 0; y < keyboardKeys.length; y++) {
            keyboardKeys[y].disabled = false;
            keyboardKeys[y].className = '';
        }
    }

}

// check if a ltter is in the phrase
const  checkLetter = btn => {
    let match = null;
    let letters = document.querySelectorAll("li");
    for (let i = 0; i < letters.length; i++) {
        const checkedLetter = letters[i].textContent.toLowerCase();
        if (btn == checkedLetter){
            letters[i].classList.add('show');            
            match = checkedLetter;
        }
    }
    return match;
}

// Replaces Start button with reset button
const showResetButton = () => {
    startButton.textContent = 'Replay';
    startButton.className = 'reset';
}

// Check against win/lose conditions
const checkWin =  () => {
    const letterLI = document.querySelectorAll('.letter').length;
    const showLI = document.querySelectorAll('.show').length;
    if (letterLI === showLI) {
        overlay.classList.add('win');
        const winMessage = "Congratulations!<br>You're a winner, baby!!"; 
        overlay.firstElementChild.innerHTML = winMessage;
        overlay.style.display = 'flex';
        showResetButton();
    }
    else if (missed == 5) {
        overlay.classList.add('lose');
        overlay.firstElementChild.textContent = 'Sorry, you ran out of guesses, want to try again?';
        overlay.style.display = 'flex';
        showResetButton();
    }   
}

// Adds to missed score and removes a heart
const wrongchoice = (btn) => {
    missed++;
    btn.classList.add('wrong');
    let hearts = heartContainer.children;
    heartIndex = 5 - missed;
    let heart = hearts[heartIndex].firstElementChild;
    heart.src = 'images/lostHeart.png';
}

// Resets the keyboard for another round
const resetKeyboard = () => {
    const keyRows = document.getElementsByClassName('keyrow');
    for (let i = 0; i < keyRows.length; i++) {
        let keyboardKeys = keyRows[i].children;
        for (let y = 0; y < keyboardKeys.length; y++) {
            keyboardKeys[y].className = '';
            keyboardKeys[y].disabled = false;
        }
    }
}

// refills hearts when playing again
async function refillHearts() {
    const hearts = heartContainer.children;
    for (let i = 0; i < hearts.length; i++)
    {
        await sleep(300);
        const heart = hearts[i].firstElementChild;
        heart.src = 'images/liveHeart.png';
    }
    missed = 0;
}

// removes old phrase from dom
const removePhrase = () => {
    while (phraseUL.firstChild) {
        phraseUL.removeChild(phraseUL.firstChild);
    }
}

// changes header when playing game
const changeHeader = () => {
    const header = document.querySelector('.header');
    header.innerHTML = `<h2>Television Shows</h2>`
}

// removes overlay and puts phrase on the screen
const startGame = () => {
    overlay.style.display = 'none';
    changeHeader();
    addPhraseToDisplay(phraseArray);
}

// resets the game to beginning state after winning or losing
const resetGame = () => {
    overlay.style.display = 'none';
    overlay.className = '';
    resetKeyboard();
    refillHearts();
    removePhrase();
    phraseArray = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(phraseArray);
}

// listen for the start or reset button to be pressed
startButton.addEventListener('click', () => {
    if(startButton.className == `btn__reset`) {
        startGame();
    }
    else if (startButton.className == 'reset') {
        resetGame();
    }
});

// listen for the onscreen keyboard to be clicked
qwerty.addEventListener('click', (e) => {
    const clickedButton = e.target;
    if(clickedButton.tagName === 'BUTTON' && clickedButton.className != 'chosen'){
        clickedButton.className = 'chosen';
        clickedButton.classList.add('shake');
        clickedButton.disabled = true;
        let match = checkLetter(clickedButton.textContent);
        if (match == null) {
            wrongchoice(e.target);
        }
        else {
            clickedButton.classList.add('right');
        } 
    }
    checkWin();
});

// sets initial phrase
let phraseArray = getRandomPhraseAsArray(phrases);
disableKeyboard();



