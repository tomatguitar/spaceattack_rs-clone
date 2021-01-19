import { SETTINGS } from '../gameSettings/settings';

class Arena {
  constructor() {
    this.arena = document.querySelector('.game__arena');
    this.getArenaSize();
  }

  getArenaSize() {
    this.arenaWidth = parseInt(getComputedStyle(this.arena).width, 10);
    this.arenaHeight = parseInt(getComputedStyle(this.arena).height, 10);
    this.arenaTop = parseInt(this.arena.getBoundingClientRect().top, 10);
    this.arenaBottom = parseInt(this.arena.getBoundingClientRect().bottom, 10);
  }

  updateArenaSize() {
    SETTINGS.ARENA = {
      ...SETTINGS.ARENA,
      ...{
        width: this.arenaWidth,
        height: this.arenaHeight,
        top: this.arenaTop,
        bottom: this.arenaBottom,
      },
    };
  }

  updatePlayerStartPosition() {
    SETTINGS.PLAYER.startPosition = {
      ...SETTINGS.PLAYER.startPosition,
      ...{ x: this.arenaWidth / 2, y: this.arenaBottom - (this.arenaTop + 80) },
    };
  }
}

export default Arena;
