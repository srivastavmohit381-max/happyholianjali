const canvas = document.getElementById("holiCanvas");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
resize();
addEventListener("resize", resize);

const colors = [
  "rgba(255,99,132,0.5)",
  "rgba(255,205,86,0.5)",
  "rgba(54,162,235,0.5)",
  "rgba(75,192,192,0.5)",
  "rgba(153,102,255,0.5)"
];

let mist = [];

class Cloud {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 100 + 50;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = -Math.random() * 0.3;
    this.alpha = 0.6;
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
  mist.push(new Cloud(Math.random() * canvas.width, canvas.height + 60));
}, 500);

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  mist.forEach((m, i) => {
    m.update();
    m.draw();
    if (m.alpha <= 0) mist.splice(i, 1);
  });
  requestAnimationFrame(animate);
}

animate();