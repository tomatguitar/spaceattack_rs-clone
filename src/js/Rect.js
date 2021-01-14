import Point from './Point';
import Size from './Size';

class Rect {
  constructor(x, y, width, height) {
    this.origin = new Point(x, y); //  начало  баръера( координатылево, верх)
    this.size = new Size(width, height);
    this.max = new Point(
      this.origin.x + this.size.width,
      this.origin.y + this.size.height
    ); // конец баръера(право, низ)
  }

  update(x, y) {
    this.origin.x = x;
    this.origin.y = y;
    this.max.x = this.origin.x + this.size.width;
    this.max.y = this.origin.y + this.size.height;
  }

  shift(dx, dy) {
    this.update(this.origin.x + dx, this.origin.y + dy);
  }

  OutsideHorizontal(x) {
    return x < this.origin.x || x > this.max.x ? true : 0;
  }

  OutsideVertical(y) {
    return y < this.origin.y || y > this.max.y ? true : 0;
  }

  IntersectedBy(rect) {
    if (this.origin.x > rect.max.x || rect.origin.x > this.max.x) {
      return false;
    }

    if (this.origin.y > rect.max.y || rect.origin.y > this.max.y) {
      return false;
    }
    return true;
  }
}

export default Rect;
