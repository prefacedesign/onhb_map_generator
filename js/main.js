var canvas;

var state_list = [
  { state: "AC", x: 0, y: 0 },
  { state: "AL", x: 0, y: 0 },
  { state: "AM", x: 0, y: 0 },
  { state: "AP", x: 0, y: 0 },
  { state: "BA", x: 0, y: 0 },
  { state: "CE", x: 0, y: 0 },
  { state: "DF", x: 0, y: 0 },
  { state: "ES", x: 0, y: 0 },
  { state: "GO", x: 0, y: 0 },
  { state: "MA", x: 0, y: 0 },
  { state: "MG", x: 0, y: 0 },
  { state: "MS", x: 0, y: 0 },
  { state: "MT", x: 0, y: 0 },
  { state: "PA", x: 0, y: 0 },
  { state: "PB", x: 0, y: 0 },
  { state: "PE", x: 0, y: 0 },
  { state: "PI", x: 0, y: 0 },
  { state: "PR", x: 0, y: 0 },
  { state: "RJ", x: 0, y: 0 },
  { state: "RN", x: 0, y: 0 },
  { state: "RO", x: 0, y: 0 },
  { state: "RR", x: 0, y: 0 },
  { state: "RS", x: 0, y: 0 },
  { state: "SC", x: 0, y: 0 },
  { state: "SE", x: 0, y: 0 },
  { state: "SP", x: 0, y: 0 },
  { state: "TO", x: 0, y: 0 }
];

function setup() {
  canvas = createCanvas(1080, 1080);
  canvas.class("canv");
  frameRate(1);
  textAlign(CENTER);
}

function draw() {
  background(0);
  fill(255);
  state_list.forEach(function(element) {
    let el = document.getElementById(element.state);
    text(element.state, element.x, element.y);
  });
}
