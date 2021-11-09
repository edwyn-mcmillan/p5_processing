// ---- random number ----

let Random = require("java-random");
let rng;

export function mySketch(p) {
  // ---- setup ----
  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight);
    p.frameRate(165);
    rng = new Random(1);
  };

  // ---- animation loop ----
  p.draw = () => {
    p.background(255);

    var n = randomNumberGenerator(p);

    p.ellipse(window.innerWidth / 2, window.innerHeight / 2, n, n);

    p.windowResized = () => {
      p.resizeCanvas(window.innerWidth, window.innerHeight);
    };
  };
}

function randomNumberGenerator(p) {
  var numberSelected = false;
  var counter = 0;

  while (!numberSelected && counter < 10000) {
    var r1 = p.random(1);
    var r2 = p.random(1);
    var y = r1 * r2;

    if (r2 < y) {
      numberSelected = true;
      return r1;
    }
    counter++;
  }
  return 0;
}
