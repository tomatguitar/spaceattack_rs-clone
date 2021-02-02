import { GameManager, SETTINGS } from '../gameSettings/settings';

class Control {
  constructor() {
    this.keys = GameManager.keys;
  }

  onKeyDown() {
    if (this.keys.ArrowLeft) {
      GameManager.player.move(-1, 0);
    }
    if (this.keys.ArrowRight) {
      GameManager.player.move(1, 0);
    }
    if (this.keys.ArrowDown) {
      GameManager.player.move(0, 1);
    }
    if (this.keys.ArrowUp) {
      GameManager.player.move(0, -1);
    }
    if (this.keys.Space) {
      SETTINGS.fire = true;
    }
  }

  keyEventHandler(e) {
    if (e.preventDefault) {
      e.preventDefault();
    } else {
      e.returnValue = false;
    }
    this.keys[e.code] = e.type === 'keydown';
  }

  init() {
    document.addEventListener('keydown', (e) => this.keyEventHandler(e));
    document.addEventListener('keyup', (e) => this.keyEventHandler(e));
  }
}

const control = new Control();

export default control;
