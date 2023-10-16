let mic
let analyser
let fft
let frequencyText
let frequency
let v
let note, noteNumber, pitch
let highestV = 0
let highestVIndex = 0
let synth1, synth2, synth3, synth4

window.addEventListener('load', () => {
    fft = new Tone.FFT(2048)
    analyser = new Tone.Analyser('fft', 2048)
    mic = new Tone.UserMedia()
    mic.connect(analyser)
    mic.open()
    // mic.toDestination()
})

function setup() {
    createCanvas(500, 300)
    background(100)
    setInterval(setFrequencyText, 1000)
    setInterval(updateNote, 100)
    setInterval(playMajorChord, 1500)
    frameRate(15)
    synth1 = new Tone.Synth().toDestination()
    synth2 = new Tone.Synth().toDestination()
    synth3 = new Tone.Synth().toDestination()
    synth4 = new Tone.Synth().toDestination()
}

function draw() {
    noStroke()
    background(255)
    fill(229, 165, 246)
    let value = analyser.getValue()
    for (let i = 0; i < value.length; i++) {
        v = map(value[i], -100, 0, height, 0)
        rect(i * 1, 0, 1, v) // waveform: * 100
        if (v > highestV && v !== Infinity && v >= 0 && v < 2048 && v > 200) {
            highestV = v
            highestVIndex = i
        }
    }
    fill(0)
    drawFrequencyText()
    loop()
}

function drawFrequencyText() {
    text(frequencyText, 20, 20)
    highestV = 0
}

function setFrequencyText() {
    frequencyText = frequency
}

function updateNote() {
    pitch = fft.getFrequencyOfIndex(highestVIndex)
    noteNumber = noteFromPitch()
    note = getNoteFromNoteNumber()
    frequency = 'Note: ' + note + '\n' + 'Freq: ' + new Tone.Frequency(note).toFrequency()
}

var noteStrings = [
    'C3',
    'C#3',
    'D3',
    'D#3',
    'E3',
    'F3',
    'F#3',
    'G3',
    'G#3',
    'A3',
    'A#3',
    'B3',
]

function noteFromPitch() {
    var noteNum = 12 * (log(pitch / 440) / log(2))
    return round(noteNum) + 69
}

function getNoteFromNoteNumber() {
    return noteStrings[noteNumber % 12]
}

function playMajorChord() {
    const whichChord = floor(random(0, 3));
    if (whichChord == 0) {
        const third = noteStrings[(noteStrings.indexOf(note) + 7) % 12]
        const fifth = noteStrings[(noteStrings.indexOf(note) + 4) % 12]
        synth1.triggerAttackRelease(note, "2n")
        synth2.triggerAttackRelease(third, "2n")
        synth3.triggerAttackRelease(fifth, "2n")
    }
    if (whichChord == 1) {
        const third = noteStrings[(noteStrings.indexOf(note) + 7) % 12]
        const fifth = noteStrings[(noteStrings.indexOf(note) + 3) % 12]
        synth1.triggerAttackRelease(note, "2n")
        synth2.triggerAttackRelease(third, "2n")
        synth3.triggerAttackRelease(fifth, "2n")
    }
    if (whichChord == 2) {
        const third = noteStrings[(noteStrings.indexOf(note) + 7) % 12]
        const fifth = noteStrings[(noteStrings.indexOf(note) + 4) % 12]
        const seventh = noteStrings[(noteStrings.indexOf(note) - 1) % 12]
        synth1.triggerAttackRelease(note, "2n")
        synth2.triggerAttackRelease(third, "2n")
        synth3.triggerAttackRelease(fifth, "2n")
        synth4.triggerAttackRelease(seventh, "2n")
    }
}
