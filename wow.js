let mic;

function setup() {
    createCanvas(500, 300);
    background(100);
    frameRate(1);
}

function draw() {
    noStroke();
    fill(200, 200, 30);
    selectAudioInput();
    visualize();
}

function selectAudioInput() {
    mic = new Tone.UserMedia();
    mic.open().then(() => {
        console.log("mic open");
 
    }).catch(notAllowed => {
        console.log("mic not open");
    });
}

function visualize(){
    stroke(255);
    let previous;
    let now;
    now = mic.volume.value;
    line(0, previous, 0, now);
    previous = now;
    console.log("Volume " + now);
}

function mousePressed(){
    mic.start(10);
}