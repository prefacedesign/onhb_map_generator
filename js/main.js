var canvas;
let debug = false;

var state_list = [
  { state: "AC", x: 143, y: 419, el: null, img: null, region: "N" },
  { state: "AL", x: 931, y: 437, el: null, img: null, region: "NE" },
  { state: "AM", x: 301, y: 311, el: null, img: null, region: "N" },
  { state: "AP", x: 565, y: 171, el: null, img: null, region: "N" },
  { state: "BA", x: 801, y: 492, el: null, img: null, region: "NE" },
  { state: "CE", x: 845, y: 324, el: null, img: null, region: "NE" },
  { state: "DF", x: 657, y: 555, el: null, img: null, region: "CO" },
  { state: "ES", x: 822, y: 659, el: null, img: null, region: "SE" },
  { state: "GO", x: 606, y: 600, el: null, img: null, region: "CO" },
  { state: "MA", x: 717, y: 326, el: null, img: null, region: "NE" },
  { state: "MG", x: 733, y: 640, el: null, img: null, region: "SE" },
  { state: "MS", x: 500, y: 677, el: null, img: null, region: "CO" },
  { state: "MT", x: 473, y: 517, el: null, img: null, region: "CO" },
  { state: "PA", x: 545, y: 317, el: null, img: null, region: "N" },
  { state: "PB", x: 934, y: 364, el: null, img: null, region: "NE" },
  { state: "PE", x: 949, y: 403, el: null, img: null, region: "NE" },
  { state: "PI", x: 770, y: 386, el: null, img: null, region: "NE" },
  { state: "PR", x: 577, y: 777, el: null, img: null, region: "S" },
  { state: "RJ", x: 775, y: 726, el: null, img: null, region: "SE" },
  { state: "RN", x: 911, y: 336, el: null, img: null, region: "NE" },
  { state: "RO", x: 331, y: 466, el: null, img: null, region: "N" },
  { state: "RR", x: 351, y: 163, el: null, img: null, region: "N" },
  { state: "RS", x: 541, y: 893, el: null, img: null, region: "S" },
  { state: "SC", x: 610, y: 842, el: null, img: null, region: "S" },
  { state: "SE", x: 900, y: 464, el: null, img: null, region: "NE" },
  { state: "SP", x: 639, y: 723, el: null, img: null, region: "SE" },
  { state: "TO", x: 652, y: 455, el: null, img: null, region: "N" }
];

// // https://hihayk.github.io/scale/#3/3/69/49/0/0/54/25/cb0772/203/7/114
let colors = [
  "#470024",
  "#470024",
  "#470024",
  "#76003E",
  "#76003E",
  "#76003E",
  "#A30058",
  "#A30058",
  "#A30058",
  "#CB0772",
  "#CB0772",
  "#CB0772",
  "#E22A8A",
  // "#F453A2",
  "#FF7DBA"
];

// https://hihayk.github.io/scale/#6/1/86/49/251/0/100/100/cb0772/203/7/114
// let colors = [
//   "#1B2400",
//   "#1B2400",
//   "#004800",
//   "#004800",
//   "#006D44",
//   "#006D44",
//   "#005390",
//   "#005390",
//   "#0000A8",
//   "#0000A8",
//   "#8C00BC",
//   "#8C00BC",
//   "#CB0772",
//   "#CB0772",
//   "#FF7DBC"
// ];

let loaded_imgs = 0;
let started = false;

let tints = {
  N: [255, 38, 150],
  NE: [255, 38, 150],
  CO: [255, 38, 150],
  SE: [255, 38, 150],
  S: [255, 38, 150]
};

let myFont;
let brazil;

function preload() {
  myFont = loadFont("assets/CooperHewitt-Bold.otf");
  state_list.forEach(function(element) {
    element.img = loadImage("assets/" + element.state + ".png", img => {
      loaded_imgs++;

      // has loaded all images
      if (loaded_imgs == state_list.length) {
        document.getElementById("map-generator-button").disabled = false;
      }
    });
    element.el = document.getElementById(element.state);
    if (element.el.value == "" && debug) {
      let v;
      if (Math.random() < 4 / 27) {
        v = parseInt(Math.random() * 3000);
      } else {
        v = parseInt(Math.random() * 800);
      }
      element.el.value = v;
    }
  });
  brazil = loadImage("assets/brazil.png");
}

function setup() {
  canvas = createCanvas(1080, 1080);
  canvas.class("canv");
  textAlign(CENTER);
  textFont(myFont);
  textSize(24);
}

function sLog(v) {
  return Math.log(v); // / Math.log(1.5);
}

function compareStates(a, b) {
  let vA = a.el.value ? parseInt(a.el.value) : null;
  let vB = b.el.value ? parseInt(b.el.value) : null;
  if ((vA && !vB) || vA > vB) {
    return 1;
  }
  if ((vB && !vA) || vB > vA) {
    return -1;
  }
  return 0;
}

function convertRange(value, r_a_min, r_a_max, r_b_min, r_b_max) {
  let range_a = r_a_max - r_a_min;
  let range_b = r_b_max - r_b_min;
  let new_value = ((value - r_a_min) * range_b) / range_a + r_b_min;
  return new_value;
}

function draw() {
  if (started) {
    if (debug) {
      console.log("will begin drawing the map...");
    }
    background(0);
    let max = findMax();
    tint(255, 255);

    if (debug) {
      console.log("...the background image...");
    }
    image(brazil, 0, 0);

    // background color
    if (debug) {
      console.log("...the states...");
    }

    state_list.sort(compareStates);
    state_list.forEach(function(element, i) {
      i_color = Math.floor(
        convertRange(i, 0, state_list.length, 0, colors.length)
      );
      if (element.el.value != "") {
        if (element.img && isNumeric(element.el.value)) {
          tint(color(colors[i_color]));
          image(element.img, 0, 0);
        }
      }
    });
    // numbers
    if (debug) {
      console.log("...and the numbers");
    }
    state_list.forEach(function(element, i) {
      if (element.el.value == "") {
        fill(80);
        text(element.state, element.x, element.y);
      } else {
        fill(255);
        text(element.el.value, element.x, element.y);
      }

      console.log("p5js has finished drawing the map");
      if (document.getElementById("save-button").disabled) {
        document.getElementById("save-button").disabled = false;
      }
    });
  } else {
    console.log("can't draw yet");
  }

  noLoop();
}

function canDraw() {
  let can_draw = true;

  state_list.forEach(function(element) {
    if (!element.img) {
      can_draw = false;
      console.log("couldn't draw " + element.state);
    }
  });

  return can_draw;
}

function generateMap() {
  if (canDraw()) {
    started = true;
    loop();
  }
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function findMax() {
  let m = {
    N: 0,
    NE: 0,
    CO: 0,
    SE: 0,
    S: 0,
    geral: 0
  };
  state_list.forEach(function(element) {
    if (element.el) {
      if (isNumeric(element.el.value)) {
        let v = parseInt(element.el.value);
        if (v > m[element.region]) {
          m[element.region] = v;
        }
        if (v > m.geral) {
          m.geral = v;
        }
      }
    }
  });
  return m;
}

function calcSum() {
  let s = {
    N: 0,
    NE: 0,
    CO: 0,
    SE: 0,
    S: 0
  };
  state_list.forEach(function(element) {
    if (element.el) {
      if (isNumeric(element.el.value)) {
        s[element.region] += parseInt(element.el.value);
      }
    }
  });
  return s;
}

function saveThisMap() {
  saveCanvas(canvas, "mapa_onhb", "png");
}
