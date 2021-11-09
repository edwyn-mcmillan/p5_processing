// ---- perlin noise flow field ----
const pNum = 50;
const fieldStrength = 100;

var scl = 10;
var inc = 0.1;
var rows, cols;

var zoff = 0;
var particles = [];
var flowfield = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(165);
  rows = floor(windowHeight / scl);
  cols = floor(windowWidth / scl);

  flowfield = new Array(cols * rows);

  for (let i = 0; i < pNum; i++) {
    particles[i] = new Particle();
  }
  background(255);
}

function draw() {
  var yoff = 0;
  for (let y = 0; y < rows; y++) {
    var xoff = 0;
    for (let x = 0; x < cols; x++) {
      var index = x + y * cols;
      var angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
      var v = p5.Vector.fromAngle(angle);
      v.setMag(fieldStrength);
      flowfield[index] = v;
      xoff += inc;

      // stroke(0, 50);
      // push();
      // translate(x * scl, y * scl);
      // rotate(v.heading());
      // strokeWeight(1);
      // line(0, 0, scl, 0);
      // pop();
    }
    yoff += inc;
    zoff += 0.0003;

    for (let i = 0; i < pNum; i++) {
      particles[i].follow(flowfield);
      particles[i].update();
      particles[i].edges();
      particles[i].display();
    }
  }
}

function keyReleased() {
  if (key == "e") save("canvas.jpg");
}

class Particle {
  constructor() {
    this.pos = createVector(random(0, windowWidth), random(0, windowHeight));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxSpeed = 4;

    this.prevPos = this.pos.copy();
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  applyForce(f) {
    this.acc.add(f);
  }

  display() {
    stroke(0, 2);
    strokeWeight(1);
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    this.updatePrev();
  }

  updatePrev() {
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
  }

  edges() {
    if (this.pos.x > windowWidth) {
      this.pos.x = 0;
      this.updatePrev();
    }
    if (this.pos.x < 0) {
      this.pos.x = windowWidth;
      this.updatePrev();
    }
    if (this.pos.y > windowHeight) {
      this.pos.y = 0;
      this.updatePrev();
    }
    if (this.pos.y < 0) {
      this.pos.y = windowHeight;
      this.updatePrev();
    }
  }

  follow(vector) {
    var x = floor(this.pos.x / scl);
    var y = floor(this.pos.y / scl);
    var index = x + y * cols;
    var force = vector[index];
    this.applyForce(force);
  }
}
