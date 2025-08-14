//allow the user to tap
//time the intervals between taps
//after 10 taps, estimate the bpm based on the average intervals between taps
//TEST ONLY

let tapButton = document.getElementById('tap-bpm');
const intervalArray = [];
let currBPM = 0;
let currDurationMS = 0;
let tapToggle = true;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

tapButton.addEventListener('mousedown', ()=>{
    tapToggle = false;
});

tapButton.addEventListener('mouseup', ()=>{
    tapToggle = true;
    currDurationMS = 0;
    while(currDurationMS < 10000){
        currDurationMS++;
        if(tapToggle === false){
            intervalArray.push(currDurationMS)
            if(intervalArray.length > 10){
                intervalArray.shift();
            }
        }
        if(intervalArray.length === 10){
            currBPM = Math.floor(intervalArray.reduce((sum, e)=>{return sum+e},0)/10);
            console.log(currBPM);
        }
    }
});

