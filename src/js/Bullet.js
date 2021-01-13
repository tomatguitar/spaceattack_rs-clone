import Size from './Size';
import Sprite from './Sprite';
import { SETTINGS } from './settings';

class Bullet extends Sprite {
  constructor(divName, assetDesc, position) {
    super(
      divName,
      position,
      assetDesc.imgFileName,
      new Size(assetDesc.width, assetDesc.height)
    );
    this.life = SETTINGS.bulletLife;
    this.dead = false;
    this.add(true);
  }

  update(dt) {
    const inc = dt * SETTINGS.bulletSpeed;
    this.incrementPosition(0, -inc);
    this.life -= dt;
    if (this.life < 0) {
      this.kill();
    }
  }

  kill() {
    this.dead = true;
    this.remove();
  }
}

export default Bullet;
