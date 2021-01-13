import { SETTINGS } from './settings';
import Size from './Size';
import Sprite from './Sprite';

class Player extends Sprite {
  constructor(divName, position, assetDesc, boundaryRect) {
    super(
      divName,
      position,
      assetDesc.imgFileName,
      new Size(assetDesc.width, assetDesc.height)
    );
    this.lives = SETTINGS.PLAYER.startLives;
    this.score = 0;
    this.highScore = 0;
    this.state = SETTINGS.PLAYER.state.alive;
    this.boundaryRect = boundaryRect;
    this.boundaryRect.shift(this.anchor.x, this.anchor.y);
  }

  move(x, y) {
    let xStep = SETTINGS.PLAYER.moveStep * 2 * x;
    let yStep = SETTINGS.PLAYER.moveStep * 2 * y;

    if (this.boundaryRect.OutsideHorizontal(xStep + this.position.x) === true) {
      xStep = 0;
      // eslint-disable-next-line no-console
      console.log('Предел по горизонтали');
    }
    if (this.boundaryRect.OutsideVertical(yStep + this.position.y) === true) {
      yStep = 0;
      // eslint-disable-next-line no-console
      console.log('Предел по вертикали');
    }

    this.incrementPosition(xStep, yStep);
  }

  reset() {
    this.state = SETTINGS.PLAYER.state.alive;
    this.score = 0;
    this.lives = SETTINGS.PLAYER.startLives;
    this.setLives();
    this.setScore();
    this.setHighScore();
    this.setPosition(
      SETTINGS.PLAYER.startPosition.x,
      SETTINGS.PLAYER.startPosition.y,
      true
    );
  }

  incrementScore(amount) {
    this.score += amount;
  }

  setLives() {
    const lives = document.querySelector('.counter--lives');
    lives.textContent = this.lives;
  }

  setScore() {
    const score = document.querySelector('.counter--total');
    score.textContent = this.score;
  }

  setHighScore() {
    if (this.score > this.highScore) {
      this.highScore = this.score;
    }
    const bestScore = document.querySelector('.counter--best');
    bestScore.textContent = this.highScore;
  }
}

export default Player;
