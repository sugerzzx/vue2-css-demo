export default function () {
  const cvs = document.getElementById('canvas');
  const ctx = cvs.getContext('2d');

  const initSize = () => {
    cvs.width = window.innerWidth * devicePixelRatio;
    cvs.height = window.innerHeight * devicePixelRatio;
  };

  const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min); // 随机数
  };

  class Point {
    constructor() {
      this.r = 6;
      this.x = getRandom(0, cvs.width - this.r / 2);
      this.y = getRandom(0, cvs.height - this.r / 2);
      this.xSpeed = getRandom(-50, 50);
      this.ySpeed = getRandom(-50, 50);
      this.lastDrawTime = null;
    }

    draw() {
      if (this.lastDrawTime) {
        const duration = (Date.now() - this.lastDrawTime) / 1000;
        const xDistance = this.xSpeed * duration;
        const yDistance = this.ySpeed * duration;
        if (this.x + xDistance > cvs.width - this.r / 2 || this.x + xDistance < this.r / 2) {
          this.xSpeed = -this.xSpeed;
        }
        if (this.y + yDistance > cvs.height - this.r / 2 || this.y + yDistance < this.r / 2) {
          this.ySpeed = -this.ySpeed;
        }
        this.x += xDistance;
        this.y += yDistance;
      }
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = '#fff';
      ctx.fill();
      this.lastDrawTime = Date.now();
    }
  }

  class Graph {
    constructor(pointNumber = 30, maxDistance = 300) {
      this.points = new Array(pointNumber).fill(0).map(() => new Point());
      this.maxDistance = maxDistance;
    }

    draw() {
      requestAnimationFrame(() => {
        this.draw();
      });
      ctx.clearRect(0, 0, cvs.width, cvs.height);
      this.points.forEach((p1, index) => {
        p1.draw();
        for (let j = index + 1; j < this.points.length; j++) {
          const p2 = this.points[j];
          const distance = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
          if (distance > this.maxDistance) continue;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / this.maxDistance})`;
          ctx.closePath();
          ctx.stroke();
        }
      });
    }
  }

  const draw = () => {
    const graph = new Graph();
    graph.draw();
  };

  initSize();
  draw();
}