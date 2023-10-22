export default function (indicatorsNum = 5) {
  const cvs = document.getElementById('canvas');
  const ctx = cvs.getContext('2d');

  const initSize = () => {
    cvs.width = window.innerWidth * devicePixelRatio;
    cvs.height = window.innerHeight * devicePixelRatio;
  };

  class Point {
    constructor(x, y) {
      this.r = 6;
      this.x = x;
      this.y = y;
    }

    drawPoint() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = '#fff';
      ctx.fill();
    }
  }

  class indocators {
    constructor() {
      this.startX = cvs.width / (indicatorsNum + 1);
      this.startY = cvs.height / 2;
      this.gap = this.startX;
      this.indicators = new Array(indicatorsNum).fill(0).map((ele, index) => new Point(this.startX + this.gap * index, this.startY));
    }

    draw() {
      this.indicators.forEach((p) => {
        p.drawPoint();
      });
    }
  }

  const drawIndicators = () => {
    const indicators = new indocators();
    indicators.draw();
  };

  initSize();
  drawIndicators();
}