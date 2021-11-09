// ---- friction exercise ----

var m;
const WIND_SPEED_X = 0.5;
const FRICTION_SLOW = -0.49;
const FRICTION_FAST = -0.009;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  fill(255);
  m = new Mover();
}

function draw() {
  background(255);

  var wind = createVector(WIND_SPEED_X, 0);
  wind.mult(m.mass);
  m.applyForces(wind);

  var currentPos = m.position.copy();
  var friction = m.velocity.copy();
  var resistance;
  friction.normalize();
  if (currentPos.x < windowWidth / 2) {
    resistance = FRICTION_SLOW;
    friction.mult(resistance);
    m.applyForces(friction);
  } else {
    resistance = FRICTION_FAST;
    friction.mult(resistance);
    m.applyForces(friction);
  }

  m.update();
  m.edges();
  m.display();
}

function mousePressed() {
  var drag = m.velocity.copy();
  drag.normalize();
  var c = -0.3;
  var speed = m.velocity.mag();
  drag.mult(c * speed * speed);
  m.applyForces(drag);
}

class Mover {
  constructor() {
    this.position = createVector(windowWidth / 2, windowHeight / 2);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(2.1, 0);
    this.mass = 5;
  }

  applyForces(f) {
    var force = f.div(this.mass);
    this.acceleration.add(force);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.velocity.limit(10);
    this.acceleration.mult(0);
  }

  edges() {
    if (this.position.x >= windowWidth) {
      this.position.x = 0;
    }
  }

  display() {
    if (this.position.x < windowWidth / 2) {
      fill(0);
    } else {
      background(0);
      fill(255);
    }
    rect(this.position.x, this.position.y, this.mass * 10, this.mass * 10);
  }
}
