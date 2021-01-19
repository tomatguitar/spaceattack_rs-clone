import { SETTINGS } from '../gameSettings/settings';
import Sprite from '../Sprite/Sprite';
import Point from '../Point/Point';
import Size from '../Size/Size';
import Waypoint from '../Waypoint/Waypoint';

class Enemy extends Sprite {
  constructor(divName, assetDesc, player, sequence) {
    super(
      divName,
      new Point(0, 0),
      assetDesc.imgFileName,
      new Size(assetDesc.width, assetDesc.height)
    );
    this.state = SETTINGS.ENEMY.state.ready;
    this.waypointList = [];
    this.targetWayPointNumber = 0;
    this.targetWayPoint = new Waypoint(0, 0, 0, 0);
    this.lastWayPointIndex = 0;
    this.player = player;
    this.score = sequence.score;
    this.lives = sequence.lives;
    this.speed = sequence.speed;
    this.readInWaypoints(sequence.waypoints);
  }

  readInWaypoints(wpList) {
    this.waypointList = [];
    for (let i = 0; i < wpList.length; ++i) {
      const tWp = wpList[i];
      const nWp = new Waypoint(
        tWp.x + this.anchor.x,
        tWp.y + this.anchor.y,
        tWp.dirX,
        tWp.dirY
      );
      this.waypointList.push(nWp);
    }
  }

  update(dt) {
    switch (this.state) {
      case SETTINGS.ENEMY.state.movingToWaypoint:
        this.moveTowardPoint(dt);
        this.checkPlayerCollision();
        break;
      // no default
    }
  }

  checkPlayerCollision() {
    if (this.containingBox.IntersectedBy(this.player.containingBox)) {
      if (!this.player.hit) {
        this.player.hit = true;
        // eslint-disable-next-line no-console
        console.log('столкновение с игроком');
      }
    }
  }

  moveTowardPoint(dt) {
    const inc = dt * this.speed;
    this.incrementPosition(
      inc * this.targetWayPoint.dirX,
      inc * this.targetWayPoint.dirY
    );

    if (
      Math.abs(this.position.x - this.targetWayPoint.point.x) < Math.abs(inc) &&
      Math.abs(this.position.y - this.targetWayPoint.point.y) < Math.abs(inc)
    ) {
      this.updatePosition(
        this.targetWayPoint.point.x,
        this.targetWayPoint.point.y
      );
    }

    if (
      this.position.equalToPoint(
        this.targetWayPoint.point.x,
        this.targetWayPoint.point.y
      ) === true
    ) {
      if (this.targetWayPointNumber === this.lastWayPointIndex) {
        this.killMe();
        // eslint-disable-next-line no-console
        console.log('reached end');
      } else {
        this.setNextWayPoint();
      }
    }
  }

  killMe() {
    this.state = SETTINGS.ENEMY.state.dead;
    this.remove();
  }

  setNextWayPoint() {
    this.targetWayPointNumber += 1;
    this.targetWayPoint = this.waypointList[this.targetWayPointNumber];
  }

  setMoving() {
    // устанавливаем номер точки пути(в данном случае - 0, т.е первую в массиве точек)
    this.targetWayPointNumber = 0;
    // берем из массива саму точку
    this.targetWayPoint = this.waypointList[this.targetWayPointNumber];
    // номер последней точки маршрута
    this.lastWayPointIndex = this.waypointList.length - 1;
    // добавляем на игровое поле
    this.add(false);
    // устанавлвиваем позицию по координатам взятой точки
    this.setPosition(
      this.targetWayPoint.point.x,
      this.targetWayPoint.point.y,
      false // shift
    );
    // берем следующую точку
    this.targetWayPointNumber = 1;
    // берем из массива эту точку
    this.targetWayPoint = this.waypointList[this.targetWayPointNumber];
    // передвигаем противника к ней
    this.state = SETTINGS.ENEMY.state.movingToWaypoint;
  }
}

export default Enemy;
