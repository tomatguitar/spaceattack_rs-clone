import { SETTINGS, soundFiles } from '../gameSettings/settings';
import * as sounds from '../soundManage/sounds';
import glowCounter from '../animations/counterAnimation';
import Size from '../Size/Size';
import Sprite from '../Sprite/Sprite';

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
    this.hit = false;
    this.lastFlash = 0;
    this.numFlashes = 0;
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

  update(dt) {
    const ship = document.querySelector(`.${this.divName}`);
    switch (this.state) {
      case SETTINGS.PLAYER.state.hitFlashing:
        this.lastFlash += dt;
        if (this.lastFlash > SETTINGS.PLAYER.flashTime) {
          this.lastFlash = 0;
          this.numFlashes += 1;

          if (this.numFlashes === SETTINGS.PLAYER.flashes) {
            // eslint-disable-next-line no-console
            console.log('Снова в строю!');
            this.state = SETTINGS.PLAYER.state.alive;
            ship.style.display = 'block';
            this.hit = false;
            ship.style.opacity = '1.0';
          } else if (this.numFlashes % 2 === 1) {
            ship.style.display = 'none';
          } else {
            ship.style.display = 'block';
          }
        }
        break;
      // no default
    }

    if (this.hit && this.state !== SETTINGS.PLAYER.state.hitFlashing) {
      this.state = SETTINGS.PLAYER.state.hitFlashing;
      this.lastFlash = 0;
      this.numFlashes = 0;
      this.lives -= 1;
      this.setLives();
      sounds.playSound(soundFiles.loseLife);
      // eslint-disable-next-line no-console
      console.log('Попадание по игроку!');
      if (this.lives > 0) {
        ship.style.opacity = SETTINGS.PLAYER.flashOpacity;
      }
    }
  }

  reset() {
    this.state = SETTINGS.PLAYER.state.alive;
    this.score = 0;
    this.hit = false;
    this.lastFlash = 0;
    this.numFlashes = 0;
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
    this.setScore();
    this.setHighScore();
  }

  setLives() {
    const lives = document.querySelector('.counter--lives');
    lives.textContent = this.lives;
    glowCounter(lives);
  }

  setScore() {
    const score = document.querySelector('.counter--total');
    score.textContent = this.score;
    glowCounter(score);
  }

  setHighScore() {
    if (this.score > this.highScore) {
      this.highScore = this.score;
    }
    const bestScore = document.querySelector('.counter--best');
    bestScore.textContent = this.highScore;
    glowCounter(bestScore);
  }
}

export default Player;
