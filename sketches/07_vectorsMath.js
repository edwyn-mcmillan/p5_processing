// ---- vectors math ----

export function mySketch(p) {
  // ---- setup ----
  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight);
    p.frameRate(165);
  };

  // ---- animation loop ----
  p.draw = () => {
    p.background(255);
    p.strokeWeight(2);
    p.stroke(0);
    p.noFill();

    p.translate(window.innerWidth / 2, window.innerHeight / 2);
    p.ellipse(0, 0, 4, 4);

    // ---- vector subtraction ----
    var mouseV = p.createVector(p.mouseX, p.mouseY);
    var center = p.createVector(window.innerWidth / 2, window.innerHeight / 2);
    mouseV.sub(center);
    mouseV.mult(0.2); // multiply changes the scale of the vector
    p.line(0, 0, mouseV.x, mouseV.y);

    p.windowResized = () => {
      p.resizeCanvas(window.innerWidth, window.innerHeight);
    };
  };
}
