import { SETTINGS, soundFiles } from '../gameSettings/settings';
import sound from '../soundManage/Sound';
import glowCounter from '../animations/counterAnimation';
import Size from '../Size/Size';
import Point from '../Point/Point';
import Sprite from '../Sprite/Sprite';

class Player extends Sprite {
  constructor(divName, explosions, position, assetDesc, boundaryRect) {
    super(
      divName,
      position,
      assetDesc.imgFileName,
      new Size(assetDesc.width, assetDesc.height)
    );
    this.lives = SETTINGS.PLAYER.startLives;
    this.score = 0;
    this.highScore = 0;
    this.destroyed = 0;
    this.hit = false;
    this.lastFlash = 0;
    this.numFlashes = 0;
    this.state = SETTINGS.PLAYER.state.alive;
    this.boundaryRect = boundaryRect;
    this.boundaryRect.shift(this.anchor.x, this.anchor.y);
    this.explosions = explosions;
  }

  move(x, y) {
    let xStep = SETTINGS.PLAYER.moveStep * 2 * x;
    let yStep = SETTINGS.PLAYER.moveStep * 2 * y;

    if (this.boundaryRect.OutsideHorizontal(xStep + this.position.x) === true) {
      xStep = 0;
    }
    if (this.boundaryRect.OutsideVertical(yStep + this.position.y) === true) {
      yStep = 0;
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
      sound.playSound(soundFiles.loseLife);
      if (this.lives > 0) {
        ship.style.opacity = SETTINGS.PLAYER.flashOpacity;
      } else if (this.lives <= 0) {
        sound.playSound(soundFiles.explosion);
        const centerPoint = this.getCenterPoint();
        this.hide();
        this.explosions.createExplosion(
          new Point(centerPoint.x, centerPoint.y)
        );
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
    this.show();
    this.setLives();
    this.setDestroyed();
    this.setScore();
    this.setHighScore();
    this.setPosition(
      SETTINGS.PLAYER.startPosition.x,
      SETTINGS.PLAYER.startPosition.y,
      true
    );
  }

  incrementDestroyed() {
    this.destroyed += 1;
    this.setDestroyed();
  }

  incrementScore(amount) {
    this.score += amount;
    this.setScore();
    this.setHighScore();
  }

  setDestroyed() {
    const destroyed = document.querySelector('.counter--destroyed');
    destroyed.textContent = this.destroyed;
    glowCounter(destroyed);
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
