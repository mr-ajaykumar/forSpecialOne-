let highestZ = 1;

class Paper {
  holdingPaper = false;
  touchX = 0;
  touchY = 0;
  posX = 0;
  posY = 0;
  prevX = 0;
  prevY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  rotating = false;

  constructor(paper) {
    this.paper = paper;
    this.init();
  }

  init() {
    this.paper.addEventListener('mousedown', (e) => {
      this.startDrag(e.clientX, e.clientY);
    });

    this.paper.addEventListener('touchstart', (e) => {
      const touch = e.touches[0];
      this.startDrag(touch.clientX, touch.clientY);
    });

    window.addEventListener('mousemove', (e) => {
      this.drag(e.clientX, e.clientY);
    });

    window.addEventListener('touchmove', (e) => {
      const touch = e.touches[0];
      this.drag(touch.clientX, touch.clientY);
    });

    window.addEventListener('mouseup', () => {
      this.stopDrag();
    });

    window.addEventListener('touchend', () => {
      this.stopDrag();
    });

    this.paper.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      this.rotating = true;
    });
  }

  startDrag(x, y) {
    if (this.rotating) return;

    this.holdingPaper = true;
    this.paper.style.zIndex = highestZ++;
    this.prevX = x;
    this.prevY = y;
  }

  drag(x, y) {
    if (!this.holdingPaper) return;

    this.velX = x - this.prevX;
    this.velY = y - this.prevY;

    this.posX += this.velX;
    this.posY += this.velY;

    this.paper.style.transform = `translateX(${this.posX}px) translateY(${this.posY}px) rotate(${this.rotation}deg)`;

    this.prevX = x;
    this.prevY = y;
  }

  stopDrag() {
    this.holdingPaper = false;
    this.rotating = false;
  }
}

const paperElements = Array.from(document.querySelectorAll('.paper'));
paperElements.forEach((paper, index) => {
  const p = new Paper(paper);
  p.posX = 20 * index;
  p.posY = 20 * index;
});
