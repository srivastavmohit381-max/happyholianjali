const canvas = document.getElementById("holiCanvas");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
resize();
addEventListener("resize", resize);

const colors = [
  "rgba(255,0,0,0.6)",
  "rgba(255,215,0,0.6)",
  "rgba(0,191,255,0.6)",
  "rgba(144,238,144,0.6)",
  "rgba(255,105,180,0.6)"
];

let clouds = [];

class Mist {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 80 + 40;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.vx = (Math.random() - 0.5) * 0.6;
    this.vy = -Math.random() * 0.4;
    this.alpha = 0.7;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 0.001;
  }

  draw() {
    ctx.globalAlpha = this.alpha;
    const g = ctx.createRadialGradient(
      this.x, this.y, 0,
      this.x, this.y, this.size
    );
    g.addColorStop(0, this.color);
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

setInterval(() => {
  clouds.push(new Mist(Math.random() * canvas.width, canvas.height + 50));
}, 400);

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  clouds.forEach((c, i) => {
    c.update();
    c.draw();
    if (c.alpha <= 0) clouds.splice(i, 1);
  });
  requestAnimationFrame(animate);
}

animate();