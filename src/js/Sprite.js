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
  constructor(divName, position, imgName, sizeRem) {
    this.divName = divName;
    this.position = position;
    this.imgName = imgName;
    this.size = sizeRem;
    this.anchor = new Point(-this.sizeRem.width / 2, -this.size.height / 2);
  }

  remove() {
    document.querySelector(`.${this.divName}`).remove();
  }

  add(shift) {
    const div = document.createElement('div');
    div.className = 'sprite';
    div.style.backgroundImage = `url('${this.imageName}')`;
    div.style.width = `${this.size.width}rem`;
    div.style.height = `${this.size.height}rem`;
    document.querySelector('.game__arena').append(div);

    this.setPosition(this.position.x, this.position.y, shift);
  }

  draw() {
    const div = document.querySelector(this.divName);
    div.style.left = this.position.x;
    div.style.top = this.position.y;
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
  }

  incrementPosition(ix, iy) {
    this.position.increment(ix, iy);
  }
}

export default Sprite;
