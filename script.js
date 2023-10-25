// let highestZ = 1;

// class Paper {
//   holdingPaper = false;
//   mouseTouchX = 0;
//   mouseTouchY = 0;
//   mouseX = 0;
//   mouseY = 0;
//   prevMouseX = 0;
//   prevMouseY = 0;
//   velX = 0;
//   velY = 0;
//   rotation = Math.random() * 30 - 15;
//   currentPaperX = 0;
//   currentPaperY = 0;
//   rotating = false;

//   init(paper) {
//     document.addEventListener('mousemove', (e) => {
//       if(!this.rotating) {
//         this.mouseX = e.clientX;
//         this.mouseY = e.clientY;
        
//         this.velX = this.mouseX - this.prevMouseX;
//         this.velY = this.mouseY - this.prevMouseY;
//       }
        
//       const dirX = e.clientX - this.mouseTouchX;
//       const dirY = e.clientY - this.mouseTouchY;
//       const dirLength = Math.sqrt(dirX*dirX+dirY*dirY);
//       const dirNormalizedX = dirX / dirLength;
//       const dirNormalizedY = dirY / dirLength;

//       const angle = Math.atan2(dirNormalizedY, dirNormalizedX);
//       let degrees = 180 * angle / Math.PI;
//       degrees = (360 + Math.round(degrees)) % 360;
//       if(this.rotating) {
//         this.rotation = degrees;
//       }

//       if(this.holdingPaper) {
//         if(!this.rotating) {
//           this.currentPaperX += this.velX;
//           this.currentPaperY += this.velY;
//         }
//         this.prevMouseX = this.mouseX;
//         this.prevMouseY = this.mouseY;

//         paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
//       }
//     })

//     paper.addEventListener('mousedown', (e) => {
//       if(this.holdingPaper) return; 
//       this.holdingPaper = true;
      
//       paper.style.zIndex = highestZ;
//       highestZ += 1;
      
//       if(e.button === 0) {
//         this.mouseTouchX = this.mouseX;
//         this.mouseTouchY = this.mouseY;
//         this.prevMouseX = this.mouseX;
//         this.prevMouseY = this.mouseY;
//       }
//       if(e.button === 2) {
//         this.rotating = true;
//       }
//     });
//     window.addEventListener('mouseup', () => {
//       this.holdingPaper = false;
//       this.rotating = false;
//     });
//   }
// }

// const papers = Array.from(document.querySelectorAll('.paper'));

// papers.forEach(paper => {
//   const p = new Paper();
//   p.init(paper);
// });

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
