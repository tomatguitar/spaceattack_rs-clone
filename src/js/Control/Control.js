import { GameManager, SETTINGS } from '../gameSettings/settings';

class Control {
  constructor() {
    this.keys = GameManager.keys;
  }

  onKeyDown() {
    if (this.keys.ArrowLeft) {
      // двигаться влево
      GameManager.player.move(-1, 0);
      // eslint-disable-next-line no-console
      // console.log('Влево', GameManager.player.position);
    }
    if (this.keys.ArrowRight) {
      // двигаться вправо
      GameManager.player.move(1, 0);
    }
    if (this.keys.ArrowDown) {
      // двигаться вниз
      GameManager.player.move(0, 1);
    }
    if (this.keys.ArrowUp) {
      // двигаться вверх
      GameManager.player.move(0, -1);
    }
    if (this.keys.Space) {
      // нажимаем Space
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
