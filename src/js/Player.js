import { SETTINGS } from './settings';
import Size from './Size';
import Sprite from './Sprite';

class Player extends Sprite {
  constructor(divName, position, assetDesc) {
    super(
      divName,
      position,
      assetDesc.fileName,
      new Size(assetDesc.width, assetDesc.heigth)
    );
    this.lives = SETTINGS.PLAYER.startLives;
    this.score = 0;
    this.highScore = 0;
    this.state = SETTINGS.playerState.ok;
  }
}

export default Player;
