// ---- random walker 02 ----
const NUM_WALKER = 400;
const NOISE_SCALE = 500;

var walkers_a = [];
var walkers_b = [];
var walkers_c = [];

// ---- setup ----
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  colorMode(HSB);
  noSmooth();

  for (let i = 0; i < NUM_WALKER; i++) {
    var walker_a_color = color(hue, 76, 48);
    var walker_b_color = color(hue, 46, 98);
    var walker_c_color = color(hue, 72, 68);

    walkers_a.push(
      new Walker(
        random(0, window.innerWidth),
        random(0, window.innerHeight),
        walker_a_color
      )
    );
    walkers_b.push(
      new Walker(
        random(0, window.innerWidth),
        random(0, window.innerHeight),
        walker_b_color
      )
    );
    walkers_c.push(
      new Walker(
        random(0, window.innerWidth),
        random(0, window.innerHeight),
        walker_c_color
      )
    );
  }
  background(103, 46, 8);
  frameRate(165);
  filter(BLUR, 3);
}

// ---- animation loop ----
function draw() {
  noStroke();

  for (let i = 0; i < NUM_WALKER; i++) {
    var radius = map(i, 0, NUM_WALKER, 2, 3);
    var alpha = map(i, 0, NUM_WALKER, 0, 255);

    var time = 0;
    time += 0.001;
    var hue = noise(time);
    hue = map(hue, 0, 1, 0, 255);

    walker_a_color = color(hue, 76, 48, hue);
    walker_b_color = color(hue, 46, 98, hue);
    walker_c_color = color(hue, 72, 68, hue);

    // walkers_a
    walkers_a[i].step();
    walkers_a[i].render(radius, random(0, 1));
    walkers_a[i].edges();
    walkers_a[i].updateColor(walker_a_color);

    // walkers_b
    walkers_b[i].step();
    walkers_b[i].render(radius, random(0, 1));
    walkers_b[i].edges();
    walkers_b[i].updateColor(walker_b_color);

    // walkers_c
    walkers_c[i].step();
    walkers_c[i].render(radius, random(0, 1));
    walkers_c[i].edges();
    walkers_c[i].updateColor(walker_c_color);
  }

  windowResized = () => {
    resizeCanvas(window.innerWidth, window.innerHeight);
    background(0, 0, 0);
  };
}

// ---- walker class ----
var p;

class Walker {
  constructor(initX, initY, c) {
    this.direction = createVector(0, 0);
    this.velocity = createVector(0, 0);
    this.position = createVector(initX, initY);
    this.speed = random(0.0001, 0.4);
    this.color = c;
    this.angle;
  }

  step() {
    this.angle =
      noise(this.position.x / NOISE_SCALE, this.position.y / NOISE_SCALE) *
      PI *
      NOISE_SCALE;
    this.direction.x = sin(this.angle * TWO_PI);
    this.direction.y = sin(this.angle);
    this.velocity = this.direction.copy();
    this.velocity.mult(this.speed);
    this.position.add(this.velocity);
    this.color;
  }

  edges() {
    if (
      this.position.x > window.innerWidth ||
      this.position.x < 0 ||
      this.position.y > window.innerHeight ||
      this.position.y < 0
    ) {
      this.position.x = random(50, window.innerWidth);
      this.position.y = random(50, window.innerHeight);
    }
  }

  updateColor(c) {
    this.color = c;
  }

  render(r, boo) {
    if (boo > 0.5) {
      fill(this.color);
      rect(this.position.x, this.position.y, r, r);
    } else {
      fill(this.color);
      ellipse(this.position.x, this.position.y, r, r);
    }
  }
}
