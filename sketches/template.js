let Random = require("java-random");
let rng;

export function mySketch(p) {

  // ---- setup ----
  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight);
    p.frameRate(165);
    rng = new Random(1);
  };

  // ---- animation loop ----
  p.draw = () => {
    p.background(255);

    p.windowResized = () => {
      p.resizeCanvas(window.innerWidth, window.innerHeight);
    };
  };
}
