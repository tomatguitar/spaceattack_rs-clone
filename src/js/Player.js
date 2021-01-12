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

  reset() {
    this.state = SETTINGS.PLAYER.state.alive;
    this.score = 0;
    this.lives = SETTINGS.PLAYER.score;
    this.setLives();
    this.setScore();
    this.setHighScore();
    this.setPosition();
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
    const bestScore = document.querySelector('.score--total');
    bestScore.textContent = this.highScore;
  }
}

export default Player;
