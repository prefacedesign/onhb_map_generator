var canvas;

var state_list = [
  { state: "AC", x: 143, y: 419, el: null, img: null },
  { state: "AL", x: 931, y: 437, el: null, img: null },
  { state: "AM", x: 301, y: 311, el: null, img: null },
  { state: "AP", x: 565, y: 171, el: null, img: null },
  { state: "BA", x: 801, y: 492, el: null, img: null },
  { state: "CE", x: 845, y: 324, el: null, img: null },
  { state: "DF", x: 657, y: 555, el: null, img: null },
  { state: "ES", x: 822, y: 659, el: null, img: null },
  { state: "GO", x: 606, y: 600, el: null, img: null },
  { state: "MA", x: 717, y: 326, el: null, img: null },
  { state: "MG", x: 733, y: 640, el: null, img: null },
  { state: "MS", x: 500, y: 677, el: null, img: null },
  { state: "MT", x: 473, y: 517, el: null, img: null },
  { state: "PA", x: 545, y: 317, el: null, img: null },
  { state: "PB", x: 934, y: 364, el: null, img: null },
  { state: "PE", x: 949, y: 403, el: null, img: null },
  { state: "PI", x: 770, y: 386, el: null, img: null },
  { state: "PR", x: 577, y: 777, el: null, img: null },
  { state: "RJ", x: 775, y: 726, el: null, img: null },
  { state: "RN", x: 911, y: 336, el: null, img: null },
  { state: "RO", x: 331, y: 466, el: null, img: null },
  { state: "RR", x: 351, y: 163, el: null, img: null },
  { state: "RS", x: 541, y: 893, el: null, img: null },
  { state: "SC", x: 610, y: 842, el: null, img: null },
  { state: "SE", x: 900, y: 464, el: null, img: null },
  { state: "SP", x: 639, y: 723, el: null, img: null },
  { state: "TO", x: 652, y: 455, el: null, img: null }
];

let myFont;
let brazil;

function preload() {
  myFont = loadFont("assets/CooperHewitt-Bold.otf");
  state_list.forEach(function(element) {
    element.img = loadImage("assets/" + element.state + ".png");
  });
  brazil = loadImage("assets/brazil.png");
}

function setup() {
  canvas = createCanvas(1080, 1080);
  canvas.class("canv");
  frameRate(1);
  textAlign(CENTER);
  textFont(myFont);
  textSize(18);
}

function draw() {
  background(0);
  let max = findMax();
  tint(255, 255);
  image(brazil, 0, 0);

  // background color
  state_list.forEach(function(element) {
    if (!element.el) {
      element.el = document.getElementById(element.state);
    }
    if (element.el.value != "") {
      if (element.img && isNumeric(element.el.value)) {
        let min = 0.05;
        let range = 1.0 - min;
        let opacity = (parseInt(element.el.value) / max) * range + min;
        tint(255, opacity * 255);
        image(element.img, 0, 0);
      }
    }
  });
  // numbers
  state_list.forEach(function(element) {
    if (element.el.value == "") {
      fill(80);
      text(element.state, element.x, element.y);
    } else {
      fill(255);
      text(element.el.value, element.x, element.y);
    }
  });
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function findMax() {
  let m = 0;
  state_list.forEach(function(element) {
    if (element.el) {
      if (isNumeric(element.el.value) && parseInt(element.el.value) > m) {
        m = parseInt(element.el.value);
      }
    }
  });
  return m;
}

function calcTotal() {
  let s = 0;
  state_list.forEach(function(element) {
    if (element.el) {
      if (isNumeric(element.el.value)) {
        s += parseInt(element.el.value);
      }
    }
  });
  return s;
}
