import Point from './Point';

// anchor - точка привязки спрайта устанавливается по центру
// **************
// *            *
// *            *
// *     X      *  <- ((ширина/2, высота/2))*-1
// *            *
// *            *
// **************

// в position передается класс Point у которого есть методы update() и increment()

class Sprite {
  constructor(divName, position, imgName, size) {
    this.divName = divName;
    this.position = position;
    this.imgName = imgName;
    this.size = size;
    this.anchor = new Point(-this.size.width / 2, -this.size.height / 2);
  }

  remove() {
    document.querySelector(`.${this.divName}`).remove();
  }

  add(shift) {
    const div = document.createElement('div');
    div.classList.add('sprite', `${this.divName}`);
    div.style.backgroundImage = `url('${this.imgName}')`;
    div.style.width = `${this.size.width}px`;
    div.style.height = `${this.size.height}px`;
    document.querySelector('.game__arena').append(div);

    this.setPosition(this.position.x, this.position.y, shift);
  }

  draw() {
    const divDraw = document.querySelector(`.${this.divName}`);
    divDraw.style.top = `${this.position.y}px`;
    divDraw.style.left = `${this.position.x}px`;
  }

  setPosition(x, y, shift) {
    this.position.update(x, y);
    if (shift) {
      this.incrementPosition(this.anchor.x, this.anchor.y);
    }

    this.draw();
  }

  updatePosition(x, y) {
    this.position.update(x, y);
    this.draw();
  }

  incrementPosition(ix, iy) {
    this.position.increment(ix, iy);
    this.draw();
  }
}

export default Sprite;
