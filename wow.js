let mic;
let analyser;
let fft;
let frequencyText;

window.addEventListener("load", () => {
    fft = new Tone.FFT(2048);
    analyser = new Tone.Analyser("fft", 2048);
    mic = new Tone.UserMedia();
    mic.connect(analyser);
    mic.open();
    mic.toDestination();
})

function setup() {
    createCanvas(500, 300);
    background(100);
    frameRate(60);
}
function draw() {
    noStroke();
    background(255);
    fill(229, 165, 246);
    let value = analyser.getValue();
    for (let i = 0; i < value.length; i++) {
        let v = map(value[i], -100, 0, height, 0);
        rect(i * 1, 0, 1, v); // waveform: * 100
        if (v > 285) {
            frequencyText = 'Frequency: ' + log(floor(fft.getFrequencyOfIndex(i))/440)/log(2) + 'Hz';
            console.log(frequencyText);
        }
    }
    fill(0);
    drawFrequencyText();
    loop();
}

function drawFrequencyText(){
    text(frequencyText,20,20)
}
