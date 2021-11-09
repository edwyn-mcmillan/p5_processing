// ---- perlin noise ----

var time = 0;

export function mySketch(p) {
  // ---- setup ----
  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight);
    p.frameRate(165);
  };

  // ---- animation loop ----
  p.draw = () => {
    p.background(0);

    p.fill(255);
    time += 0.01;
    var x = p.noise(time);
    x = p.map(x, 0, 1, 0, window.innerWidth);
    p.ellipse(x, window.innerHeight / 2, 40, 40);

    p.windowResized = () => {
      p.resizeCanvas(window.innerWidth, window.innerHeight);
    };
  };
}
