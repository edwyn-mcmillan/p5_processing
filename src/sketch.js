// ---- random walker ----

const Random = require("java-random");
var rng;

export function mySketch(p) {
  const numWalker = 205;
  var walkers = [];

  // ---- setup ----
  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight);
    p.colorMode(p.HSB);
    p.noSmooth();

    for (let i = 0; i < numWalker; i++) {
      walkers.push(new Walker(p));
    }
    p.background(0);
    p.frameRate(165);
    p.filter(p.BLUR, 4);
  };

  // ---- animation loop ----
  p.draw = () => {
    p.background(0, 0, 0, 0.01);

    for (let w of walkers) {
      w.step();
      w.render();
    }

    p.windowResized = () => {
      p.resizeCanvas(window.innerWidth, window.innerHeight);
      p.background(0, 0, 0);
    };
  };
}

// ---- walker class ----
var p;

class Walker {
  constructor(p5) {
    p = p5;
    this.x = window.innerWidth / 2;
    this.y = window.innerHeight / 2;
    this.time = p.random(0, 10);
    this.speed = p.random(0.0001, 0.001);
  }

  step() {
    this.time += this.speed;
    this.x = p.noise(this.time);
    this.y = p.noise(this.time / p.PI);
    this.x = p.map(this.x, 0, 1, 0, window.innerWidth);
    this.y = p.map(this.y, 0, 1, 0, window.innerHeight);
  }

  render(i) {
    rng = new Random(1);
    var h = rng.nextGaussian();
    h *= 20; // changes the q (standard deviation)
    h += 255 / 2; // changes the mean (center of distribution)
    var hue = p.noise(this.time / 0.5);
    hue = p.map(hue, 0, 1, 0, 255);
    var c = p.color(hue, this.y, this.y);
    p.stroke(c);
    p.fill(c);
    p.ellipse(this.x, this.y, h / 120, h / 5);
  }
}
