let mic;
let analyser;

window.addEventListener("load", () =>{
    analyser = new Tone.Analyser("fft", 4096);
    mic = new Tone.UserMedia();
    mic.connect(analyser);
    mic.open();
})
/*
window.addEventListener("click", () =>{
    mic.open();
})
*/
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
    }
}