// ---- vectors ----

export function mySketch(p) {
  var x = 100;
  var y = 100;
  var xSpeed = 1;
  var ySpeed = 3.3;

  // ---- setup ----
  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight);
    p.frameRate(165);
  };

  // ---- animation loop ----
  p.draw = () => {
    p.background(255);

    x = x + xSpeed;
    y = y + ySpeed;

    if (x >= window.innerWidth - 24 || x < 24) {
      xSpeed = xSpeed * -1;
    }
    if (y >= window.innerHeight - 24 || y < 24) {
      ySpeed = ySpeed * -1;
    }

    p.stroke(0);
    p.strokeWeight(2);
    p.fill(127);
    p.ellipse(x, y, 48, 48);

    p.windowResized = () => {
      p.resizeCanvas(window.innerWidth, window.innerHeight);
    };
  };
}
