const MOVERS_NUM = 100;
var movers = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(165);

  for (let i = 0; i < MOVERS_NUM; i++) {
    movers.push(new Mover(random(0.1, 5), 200, 200));
  }
}

function draw() {
  background(255);

  var wind = createVector(0.01, 0);
  var gravity = createVector(0, 0.1);

  for (let i = 0; i < movers.length; i++) {
    movers[i].applyForce(wind);
    movers[i].applyForce(gravity);

    movers[i].update();
    movers[i].display();
    movers[i].checkEdges();
  }
}

// ---- mover ----
class Mover {
  constructor(mass_, x_, y_) {
    this.mass = mass_;
    this.location = createVector(x_, y_);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
  }

  applyForce(f) {
    var force = f.div(this.mass);
    this.acceleration.add(force);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.acceleration.mult(0); // clear acceleration each draw step
  }

  display() {
    stroke(0);
    fill(175);
    ellipse(this.location.x, this.location.y, this.mass * 16, this.mass * 16);
  }

  checkEdges() {
    if (this.location.x > windowWidth) {
      this.velocity *= -1;
      this.location.x = width;
    } else if (this.location.x < 0) {
      this.velocity *= -1;
      this.location.x = 0;
    }

    if (this.location.y > windowHeight) {
      this.velocity.y *= -1;
      this.location.y = height;
    }
  }
}
