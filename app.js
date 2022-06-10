const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
let missed = 0;

const startButton = document.querySelector(`.btn__reset`);

const phrases = [
    {
        quote: `When you become the image of your own imagination its the most powerful thing you could ever do`,
        speaker: `RuPaul`
    },
    {
        quote: `I could never be a Kardashian because I have talent`,
        speaker: `Meatiest Tuck`
    },
    {
        quote: `I dont get cute I get drop-dead gorgeous`,
        speaker: `Alyssa Edwards`
    },
    {
        quote: `No T no shade no pink lemonade`,
        speaker: `Jasmine Masters`
    },
    {
        quote: `The shade of it all`,
        speaker: `Latrice Royale`
    }
];
const numberOfPhrases = phrases.length;

const getRandomPhraseAsArray = arr => {
    const randomArrayIndex = Math.floor(Math.random()*numberOfPhrases);
    const chosenPhrase = arr[randomArrayIndex].quote;
    const chosenSpeaker = arr[randomArrayIndex].speaker;
    const chosenPhraseAsArray = chosenPhrase.split(``);
    return chosenPhraseAsArray;
}

const addPhraseToDisplay = arr => {
    for (let i = 0; i < arr.length; i++) {
        const letter = arr[i];
        const span = document.createElement('span');
        span.textContent = letter;
        const li = document.createElement('li');
        if (letter != ' ') {
            li.className = 'letter';
        }
        else {
            li.className = '';
        }
        li.appendChild(span);
        phrase.appendChild(li);
    }
}

const  checkLetter = btn => {
    const letters = document.getElementsByClassName('letter');
    let matchFound = null;
    for (let i = 0; i < letters.length; i++) {
        const checkedLetter = letters[i].firstElementChild.textContent.toLowerCase();
        console.log('checked letter: ' + checkedLetter);
        console.log('button pressed: ' + btn);
        console.log(btn == checkedLetter);
        if (btn == checkedLetter){
            letters[i].className = 'show';            
            matchFound = checkedLetter;
        }
    }
    return matchFound;
}

startButton.addEventListener('click', () => {
    startButton.parentNode.style.display = 'none';
});

qwerty.addEventListener('click', (e) => {
    const clickedButton = e.target;
    if(clickedButton.tagName === 'BUTTON'){
        clickedButton.className = 'chosen';
        clickedButton.disabled = true;
        checkLetter(clickedButton.textContent);
    }
});

let phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);



