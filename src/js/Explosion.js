import Point from './Point';
import { GameManager, SETTINGS } from './settings';

class Explosion {
  constructor(asseName) {
    this.count = 0;
    this.offset = undefined;
    this.setOffset(asseName);
  }

  setOffset(assetName) {
    const asset = GameManager.assets[assetName];
    this.offset = new Point((asset.width / 2) * -1, (asset.height / 2) * -1);
  }

  removeExplosion(id) {
    setTimeout(() => {
      const divId = document.querySelector(`#${id}`);
      divId.remove();
    }, SETTINGS.explosionTimeout);
  }

  createExplosion(position) {
    const arena = document.querySelector('.game__arena');
    const explosionDiv = document.createElement('div');
    const explosionDivId = `explosion_${this.count}`;
    explosionDiv.classList.add('explosion');
    explosionDiv.id = explosionDivId;
    explosionDiv.style.left = `${position.x + this.offset.x}px`;
    explosionDiv.style.top = `${position.y + this.offset.y}px`;
    arena.append(explosionDiv);
    this.removeExplosion(explosionDivId);
    this.count += 1;
  }
}

export default Explosion;
