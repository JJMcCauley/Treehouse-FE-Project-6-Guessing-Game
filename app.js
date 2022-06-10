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

// adds the lttters of a string to the display
const addPhraseToDisplay = arr => {
    for (let i = 0; i < arr.length; i++) {
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

const showResetButton = () => {
    startButton.textContent = 'Replay';
    startButton.className = 'reset';
}

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

const wrongchoice = () => {
    missed++;
    let heart = heartContainer.lastElementChild;
    heartContainer.removeChild(heart);
}

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

const refillHearts = () => {
    if (missed > 0) {
        for (let i = 0; i < missed; i++) {
            const li = document.createElement('li');
            const img = document.createElement('img');
            li.appendChild(img);
            li.className = 'tries';
            img.src = "images/liveHeart.png";
            img.style.height = '35px';
            img.style.width = '30px';
            heartContainer.appendChild(li);
        }
    }
    missed = 0;
}

const removePhrase = () => {
    while (phraseUL.firstChild) {
        phraseUL.removeChild(phraseUL.firstChild);
    }
}

// listen for the start game button to be pressed
startButton.addEventListener('click', () => {
    if(startButton.className == `btn__reset`) {
        overlay.style.display = 'none';
    }
    else if (startButton.className == 'reset') {
        overlay.style.display = 'none';
        overlay.className = '';
        resetKeyboard();
        refillHearts();
        removePhrase();
        phraseArray = getRandomPhraseAsArray(phrases);
        addPhraseToDisplay(phraseArray);

    }
});

// listen for the onscreen keyboard toe be clicked
qwerty.addEventListener('click', (e) => {
    const clickedButton = e.target;
    if(clickedButton.tagName === 'BUTTON' && clickedButton.className != 'chosen'){
        clickedButton.className = 'chosen';
        clickedButton.disabled = true;
        let match = checkLetter(clickedButton.textContent);
        if (match == null) {
            wrongchoice();
        } 
    }
    checkWin();
});

let phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);



