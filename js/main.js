var canvas;

var state_list = [
  { state: "AC", x: 143, y: 419 },
  { state: "AL", x: 931, y: 437 },
  { state: "AM", x: 301, y: 311 },
  { state: "AP", x: 565, y: 171 },
  { state: "BA", x: 801, y: 492 },
  { state: "CE", x: 845, y: 324 },
  { state: "DF", x: 657, y: 555 },
  { state: "ES", x: 822, y: 659 },
  { state: "GO", x: 606, y: 600 },
  { state: "MA", x: 717, y: 326 },
  { state: "MG", x: 733, y: 640 },
  { state: "MS", x: 500, y: 677 },
  { state: "MT", x: 473, y: 517 },
  { state: "PA", x: 545, y: 317 },
  { state: "PB", x: 934, y: 364 },
  { state: "PE", x: 949, y: 403 },
  { state: "PI", x: 770, y: 386 },
  { state: "PR", x: 577, y: 777 },
  { state: "RJ", x: 775, y: 726 },
  { state: "RN", x: 911, y: 336 },
  { state: "RO", x: 331, y: 466 },
  { state: "RR", x: 351, y: 163 },
  { state: "RS", x: 541, y: 893 },
  { state: "SC", x: 610, y: 842 },
  { state: "SE", x: 900, y: 464 },
  { state: "SP", x: 639, y: 723 },
  { state: "TO", x: 652, y: 455 }
];

let myFont;
function preload() {
  myFont = loadFont("assets/CooperHewitt-Bold.otf");
}

function setup() {
  canvas = createCanvas(1080, 1080);
  canvas.class("canv");
  // frameRate(1);
  textAlign(CENTER);
  textFont(myFont);
  textSize(18);
}

function draw() {
  background(0);
  state_list.forEach(function(element) {
    let el = document.getElementById(element.state);
    if (el.value == "") {
      fill(80);
      text(element.state, element.x, element.y);
    } else {
      fill(255);
      text(el.value, element.x, element.y);
    }
  });
}
