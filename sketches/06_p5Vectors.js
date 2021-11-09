// ---- p5 vectors ----

import { Vector } from "p5";

export function mySketch(p) {
  // ---- setup ----
  var movers = [];
  const mCount = 5;
  p.setup = () => {
    p.createCanvas(windowWidth, windowHeight);
    p.frameRate(165);
    p.noStroke();

    for (let i = 0; i < mCount; i++) {
      movers[i] = new Mover(p.random(windowWidth));
    }
  };

  // ---- animation loop ----
  p.draw = () => {
    p.background(255);

    for (let m of movers) {
      var gravity = p.createVector(0, 0.3);
      gravity.mult(m.mass);
      m.applyForce(gravity);

      var friction = m.velocity.copy();
      friction.normalize();
      const c = -0.001;
      friction.mult(c);
      m.applyForce(friction);

      m.update();
      m.edges();
      m.display();
    }

    p.mousePressed = () => {
      for (let m of movers) {
        var wind = createVector(0.2, 0);
        m.applyForce(wind);
      }
    };

    p.windowResized = () => {
      p.resizeCanvas(windowWidth, windowHeight);
    };
  };
}

// ---- mover ----
var p;

class Mover {
  constructor(p5, initX) {
    this.p = p5;
    this.position = p.createVector(initX, 50);
    this.velocity = p.createVector(0, 0);
    this.acceleration = p.createVector(0, 0);
    this.mass = p.random(0.5, 4);
  }

  applyForce(f) {
    var force = f.div(this.mass);
    this.acceleration.add(force);
  }

  update() {
    this.velocity.add(this.acceleration); // rate of change in velocity
    this.position.add(this.velocity); // rate of change position
    this.velocity.limit(10);
    this.acceleration.mult(0); // clear vector to (0, 0) each frame

    // ---- import and use Vector ----
    // acceleration = Vector.random2D();

    // ---- accelerate towards mouse position ----
    // var mouseV = p.createVector(p.mouseX, p.mouseY);
    // mouseV.sub(position);
    // mouseV.setMag(0.5);
    // acceleration = mouseV;
  }

  edges() {
    if (this.position.x >= windowWidth - 24 || this.position.x < 24) {
      this.velocity.x *= -1;
    }
    if (this.position.y >= windowHeight - 24 || this.position.y < 24) {
      this.position.y = 50;
      this.velocity.y *= -1;
    }
  }

  display() {
    p.fill(155, 55, 100, 100);
    p.ellipse(this.position.x, this.position.y, this.mass * 20, this.mass * 20);
  }
}
