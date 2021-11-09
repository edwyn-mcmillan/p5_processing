// ---- attraction ----

var a, m;
var movers = [];
const numM = 7;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  colorMode(HSB);
  smooth();
  for (let i = 0; i < numM; i++) {
    movers[i] = new Mover(
      random(1, 10),
      random(0, windowWidth),
      random(0, windowHeight),
      random(0, 255),
      random(0.1, 10)
    );
  }
  a = new Attractor();
  background(0);
}

function draw() {
  // background(255);
  translate(windowWidth / 2, windowHeight / 2);
  a.display();

  for (let i = 0; i < numM; i++) {
    var force = a.attract(movers[i]);
    movers[i].applyForces(force);

    movers[i].update();
    movers[i].display();
  }

  // for (let i = 0; i < numM; i++) {
  //   for (let j = 0; j < numM; j++) {
  //     if (i != j) {
  //       var force = movers[j].attract(movers[i]);
  //       movers[i].applyForces(force);

  //       movers[i].update();
  //       movers[i].display();
  //     }
  //   }
  // }
}

class Attractor {
  constructor() {
    this.location = createVector(windowWidth / 2, windowHeight / 2);
    this.mass = 20;
    this.gravity = 10;
  }

  attract(moverObj) {
    var force = this.location.sub(moverObj.location);
    var distance = force.mag();
    distance = constrain(distance, 20, 21);
    force.normalize();
    var strength =
      (this.gravity * this.mass * moverObj.mass) / (distance * distance);
    force.mult(strength);
    return force;
  }

  display() {
    ellipseMode(CENTER);
    fill(200, 255, 50, 200);
    // ellipse(this.location.x, this.location.y, this.mass * 2, this.mass * 2);
  }
}

class Mover {
  constructor(mass_, initX, initY, c, v) {
    this.hue = c;
    this.mass = mass_;
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(v, 0);
    this.location = createVector(initX, initY);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  }

  applyForces(f) {
    var force = f.div(this.mass);
    this.acceleration.add(force);
  }

  attract(moverObj) {
    var force = this.location.sub(moverObj.location);
    var distance = force.mag();
    distance = constrain(distance, 0.0001, 0.1);
    force.normalize();
    var strength =
      (this.gravity * this.mass * moverObj.mass) / (distance * distance);
    force.mult(strength);
    return force;
  }

  display() {
    fill(this.hue, 255, 50, this.hue);
    ellipse(this.location.x, this.location.y, this.mass * 1, this.mass * 0.4);
  }
}
