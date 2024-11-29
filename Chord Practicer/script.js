const musical_alphabet = ['A','A#','B','C','C#','D','D#','E','F','F#','G','G#'];

const startButton = document.getElementById('start');
const quitButton = document.getElementById('play-quit');
const slider = document.getElementById('time-slider');

let interval;

function displayChords(){

}

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

function displayPlayMenu(){
    const minutes = document.getElementById('input-minutes').value;
    const seconds = document.getElementById('input-seconds').value;

    const duration = (parseInt(minutes)*60) + parseInt(seconds);
    countdownStart(duration);

    const playMenu = document.querySelector('.play-menu');
    const startMenu = document.querySelector('.start-menu');
    playMenu.style.display = 'flex';
    startMenu.style.display = 'none';    
}

function displayStartMenu(){
    const playMenu = document.querySelector('.play-menu');
    const startMenu = document.querySelector('.start-menu');
    playMenu.style.display = 'none';
    startMenu.style.display = 'flex';
    clearInterval(interval);
}

startButton.addEventListener('click', displayPlayMenu);
quitButton.addEventListener('click', displayStartMenu);

function countdownStart(timer){
    let duration = timer;
    let minutes; 
    let seconds;
    let display = document.getElementById('curr-time');
    interval = setInterval(function () {
        minutes = parseInt(duration / 60, 10);
        seconds = parseInt(duration % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;
        slider.value = ((timer - duration)/timer)*100;

        if (--duration < 0) {
            clearInterval(interval);
        }
    }, 1000);
}

// <---- BPM COUNTER ---->
const tapButton = document.getElementById('tap-bpm');
const bpmDisplay = document.getElementById('bpm-display');
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
        bpmDisplay.value = currBPM;
    }
    lastTapTime = currentTime;
});