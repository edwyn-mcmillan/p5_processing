// ---- gaussian random ----

export function mySketch(p) {
  let Random = require("java-random");
  let rng;

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight);
    p.frameRate(165);
    rng = new Random(1);
  };

  p.draw = () => {
    p.background(255);

    var h = rng.nextGaussian();
    h *= 20; // changes the q (standard deviation)
    h += 100; // changes the mean (center of distribution)

    p.fill(0);
    p.ellipse(window.innerWidth / 2, window.innerHeight / 2, h, h);

    p.windowResized = () => {
      p.resizeCanvas(window.innerWidth, window.innerHeight);
    };
  };
}
