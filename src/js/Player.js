import { SETTINGS } from './settings';
import Size from './Size';
import Sprite from './Sprite';

class Player extends Sprite {
  constructor(divName, position, assetDesc) {
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

  increFmentScore(amount) {
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
