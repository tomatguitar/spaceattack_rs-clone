import Point from './Point';

class Waypoint {
  constructor(x, y, dirX, dirY) {
    this.point = new Point(x, y);
    this.dirX = dirX;
    this.dirY = dirY;
  }
}

export default Waypoint;
