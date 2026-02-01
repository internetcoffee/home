// image variables
let hamster, hamsterLeft, bedding, radio;
let water1, water2, water3, water4, water5; //water1 = full, water5 = empty

// sound variables
let slurp, radioSong;
let ampX, ampY, amp;

// dimension variables
let hWidth, hHeight;

// cursor variables
let cursorLeft = false;
let cursorCurrent = 0;
let cursorPast = 0;

// water variables
let waterFill = 1

//initial states
let radioPlaying = false;

// function preLoad() {
//     hamster = loadImage('/assets/hamster-1.png');
// }

// function preload() {
//     slurp = loadSound('/assets/slurp.wav');
//     bedding = loadImage('/assets/bedding.jpg');
//     hamster = loadImage('/assets/hamster-1.png');
//     hamsterLeft = loadImage('/assets/hamster-2.png');
//     water1 = loadImage('/assets/water-1.png');
//     water2 = loadImage('/assets/water-2.png');
//     water3 = loadImage('/assets/water-3.png');
//     water4 = loadImage('/assets/water-4.png');
//     water5 = loadImage('/assets/water-5.png');
// }

async function setup() {
    createCanvas(windowWidth, windowHeight);

    // preload images
    bedding = await loadImage('/assets/bedding.jpg');
    hamster = await loadImage('/assets/hamster-1.png');
    hamsterLeft = await loadImage('/assets/hamster-2.png');
    radio = await loadImage('/assets/radio.png');
    water1 = await loadImage('/assets/water-1.png');
    water2 = await loadImage('/assets/water-2.png');
    water3 = await loadImage('/assets/water-3.png');
    water4 = await loadImage('/assets/water-4.png');
    water5 = await loadImage('/assets/water-5.png');

    // preload sounds
    slurp = await loadSound('/assets/slurp.wav');
    radioSong = await loadSound('/assets/radio-song.wav');

    //initialize audio
    userStartAudio();
}

// MOUSE CLICK FUNCTIONS

// when click on water bottle, change state of waterFill
function waterDrink() {
    if (
        mouseX > 10 &&
        mouseX < 102 &&
        mouseY > windowHeight * .7 &&
        mouseY < windowHeight * .7 + 189 &&
        waterFill < 5
    ) {
        slurp.play();
        hWidth = hWidth * random(1.01, 1.11);
        hHeight = hHeight * random(1.01, 1.11);
        waterFill = waterFill + 1;
    } else if (
        mouseX > 10 &&
        mouseX < 102 &&
        mouseY > windowHeight * .7 &&
        mouseY < windowHeight * .7 + 189
    ) {
        // sound
    }
}

function radioOn() {
    if (
        !radioPlaying &&
        mouseX > windowWidth - 156 &&
        mouseX < windowWidth - 10 &&
        mouseY > windowHeight * .02 &&
        mouseY < windowHeight * .02 + 108
    ) {
        // radioSong.amp(0.1);
        radioSong.play();
        radioSong.loop(true);
        radioPlaying = true;
    } else if (
        radioPlaying &&
        mouseX > windowWidth - 156 &&
        mouseX < windowWidth - 10 &&
        mouseY > windowHeight * .02 &&
        mouseY < windowHeight * .02 + 108) {
        radioSong.stop();
        radioPlaying = false;
    }
}

// mouse click actions
function mousePressed() {
    waterDrink();
    radioOn();
}


function draw() {
    // hideCursor
    noCursor();

    // set background
    imageMode(CORNER);
    image(bedding, 0, 0, windowWidth, windowHeight);

    // WATER BOTTLE
    if (waterFill === 1) {
        image(water1, 10, windowHeight * .7)
    } else if (waterFill === 2) {
        image(water2, 10, windowHeight * .7)
    } else if (waterFill === 3) {
        image(water3, 10, windowHeight * .7)
    } else if (waterFill === 4) {
        image(water4, 10, windowHeight * .7)
    } else {
        image(water5, 10, windowHeight * .7)
    }

    // RADIO
    // insert radio image
    image(radio, windowWidth - 156, windowHeight * .02);

    // map radio sound level
    ampX = map(mouseX, 0, windowWidth, 0, 0.5);
    ampY = map(mouseY, 0, windowHeight, 0.5, 0);
    amp = ampX + ampY;
    radioSong.amp(amp);



    // HAMSTER 

    // hamster size variables
    if (!hWidth) {
        hWidth = hamster.width * 1.2;
        hHeight = hamster.height * 1.2;
    }

    // check cursor movement direction
    cursorPast = cursorCurrent;
    cursorCurrent = mouseX;
    if (cursorCurrent < cursorPast) {
        cursorLeft = true;
    } else if (cursorCurrent > cursorPast) {
        cursorLeft = false;
    }

    //flip hamster dependent on movement direciton
    imageMode(CENTER);
    if (cursorLeft == true) {
        image(hamsterLeft, mouseX, mouseY, hWidth, hHeight);
    } else {
        image(hamster, mouseX, mouseY, hWidth, hHeight);
    }

    // text('amp: ' + amp, 50, 50)
}
