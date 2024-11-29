const musical_alphabet = ['A','A#','B','C','C#','D','D#','E','F','F#','G','G#'];

const startButton = document.getElementById('start');
const quitButton = document.getElementById('play-quit');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
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
}

startButton.addEventListener('click', displayPlayMenu);
quitButton.addEventListener('click', displayStartMenu);

// window.addEventListener('DOMContentLoaded', function() {
// });