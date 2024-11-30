const musical_alphabet = ['A','A#','B','C','C#','D','D#','E','F','F#','G','G#'];

const elements = {
    startButton: document.getElementById('start'),
    quitButton: document.getElementById('play-quit'),
    restartButton: document.getElementById('play-restart'),
    slider: document.getElementById('time-slider'),
    currChord: document.getElementById('current-chord-display'),
    nextChord: document.getElementById('next-chord-display'),
    tapButton: document.getElementById('tap-bpm'),
    bpmDisplay: document.getElementById('bpm-display'),
    keyInput: document.getElementById('key'),
    playKeyDisplay: document.getElementById('key-display'),
    playBPMDisplay: document.getElementById('bpm-display-1'),
    currTimeDisplay: document.getElementById('curr-time'),
    startMenu: document.querySelector('.start-menu'),
    playMenu: document.querySelector('.play-menu'),
};

const currChord = document.getElementById('current-chord-display');
const nextChord = document.getElementById('next-chord-display')
const tapButton = document.getElementById('tap-bpm');
const bpmDisplay = document.getElementById('bpm-display');
const keyInput = document.getElementById('key');
const playKeyDisplay = document.getElementById('key-display');
const playBPMDisplay = document.getElementById('bpm-display-1');

let togglePause = false;

let interval;

let currBPM;
let BPMIntervalDS;
let currKey;
let currChords;

let currentChordDisplayed;
let nextChordDisplayed;

function findChordsInKey(key){
    const returnChords = [];
    let index = musical_alphabet.findIndex(e=>{return e === key});
    let count = 0;
    while(count < 7){
        returnChords.push(musical_alphabet[index]);
        count++;

        if(count === 2){
            index++;
        }else{
            index = index + 2;
        }

        if(index >= musical_alphabet.length){
            index = index % musical_alphabet.length;
        }
    }

    returnChords[1] = returnChords[1].concat("m");
    returnChords[2] = returnChords[2].concat("m");
    returnChords[5] = returnChords[5].concat("m");
    returnChords[6] = returnChords[6].concat("°");

    return returnChords;
}

function getRandomChord(chordsArray){
    const randIndex = Math.floor(Math.random()*(chordsArray.length-1));
    return chordsArray[randIndex];
}

// KICKER-OFFER
function displayPlayMenu(){
    const minutes = document.getElementById('input-minutes').value;
    const seconds = document.getElementById('input-seconds').value;

    setTimeout(() => {
        currKey = key.value;
        currChords = findChordsInKey(currKey);
        console.log(currChords);

        playKeyDisplay.textContent = 'KEY: ' + currKey;
        playBPMDisplay.textContent = 'BPM: ' + currBPM;

        currentChordDisplayed = getRandomChord(currChords);
        nextChordDisplayed = getRandomChord(currChords.filter((e)=>e!==currentChordDisplayed));

        currChord.textContent = currentChordDisplayed;
        nextChord.textContent = nextChordDisplayed;
    }, 500);

    const duration = (parseInt(minutes)*60) + parseInt(seconds);
    currBPM = parseInt(bpmDisplay.value);
    BPMIntervalDS = Math.floor(600 / currBPM); //deciseconds per beat
    countdownStart(duration);

    elements.playMenu.style.display = 'flex';
    elements.startMenu.style.display = 'none';
}

function displayStartMenu(){
    elements.playMenu = document.querySelector('.play-menu');
    elements.startMenu = document.querySelector('.start-menu');
    elements.playMenu.style.display = 'none';
    elements.startMenu.style.display = 'flex';
    clearInterval(interval);
}

elements.startButton.addEventListener('click', displayPlayMenu);
elements.restartButton.addEventListener('click', ()=>{
    clearInterval(interval);
    displayPlayMenu();
});
elements.quitButton.addEventListener('click', displayStartMenu);

function countdownStart(timer){
    let durationDS = timer * 10;
    let minutes; 
    let seconds;
    let display = document.getElementById('curr-time');
    interval = setInterval(function () {
        if (durationDS % BPMIntervalDS === 0) {
            currChord.classList.add('current-chord-display-anim');

            setTimeout(() => {
                let currSlideVal = parseInt(elements.slider.value) + 25;
                if (currSlideVal > 100) {
                    currSlideVal = 25;
                    currChord.textContent = nextChord.textContent;
                    nextChord.textContent = nextChordDisplayed;
                }
                if (currSlideVal === 75){
                    nextChordDisplayed = currChords[Math.floor(Math.random()*(currChords.length-1))];
                }
                elements.slider.value = currSlideVal;
            }, 150);
        } else {
            currChord.classList.remove('current-chord-display-anim');
        }

        minutes = parseInt(durationDS / 600);
        seconds = parseInt((durationDS % 600)/ 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--durationDS < 0) {
            clearInterval(interval);
        }
    }, 100);
}

// <---- BPM COUNTER ---->

const intervalArray = [];
let lastTapTime = 0;

tapButton.addEventListener('mousedown', () => {
    const currentTime = Date.now();

    if (lastTapTime > 0) {
        const interval = currentTime - lastTapTime;
        intervalArray.push(interval);

        if (intervalArray.length > 10) { //only last 10 intervals count
            intervalArray.shift();
        }

        const avgInterval = intervalArray.reduce((sum, e) => sum + e, 0) / intervalArray.length;
        const currBPM = Math.floor(60000 / avgInterval);

        if (currBPM > 200){
            currBPM = 200;
        }

        bpmDisplay.value = currBPM;
    }
    lastTapTime = currentTime;
});