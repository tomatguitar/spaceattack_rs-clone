import {
  GameManager,
  SETTINGS,
  soundFiles,
  SoundManager,
} from '../gameSettings/settings';
import sound from '../soundManage/Sound';
import Control from '../Control/Control';
import message from '../Message/Message';
import * as stars from '../animations/stars';

class GameLoop {
  // аналог ф-ции update
  static tick() {
    if (GameManager.phase !== SETTINGS.GAME_PHASE.paused) {
      const now = Date.now();
      const dt = now - GameManager.lastUpdated;
      GameManager.lastUpdated = now;
      GameManager.fps = parseInt(1000 / dt, 10);
      Control.onKeyDown();
      // появляются противники
      GameManager.enemies.update(dt);

      if (GameManager.enemies.gameOver) {
        this.showGameOver();
      } else {
        GameManager.bullets.update(dt, SETTINGS.fire);
        GameManager.player.update(dt);
        if (GameManager.player.lives <= 0) {
          this.showGameOver();
        } else if (GameManager.phase === SETTINGS.GAME_PHASE.playing) {
          window.requestAnimationFrame(GameLoop.tick);
        }
      }
    }
  }

  runCountDown() {
    stars.runBackground();
    stars.createStars();
    GameManager.phase = SETTINGS.GAME_PHASE.countdownToStart;
    message.writeMessage(3);
    sound.playSound(soundFiles.countdown);
    for (let i = 0; i < SETTINGS.countdownValues.length; ++i) {
      setTimeout(() => {
        this.setCountDownValue(SETTINGS.countdownValues[i]);
      }, SETTINGS.countdownGap * (i + 1));
    }
    setTimeout(() => {
      this.endCountDown();
    }, (SETTINGS.countdownValues.length + 1) * SETTINGS.countdownGap);
  }

  endCountDown() {
    message.clearMessages();
    sound.playSound(soundFiles.go);
    GameManager.phase = SETTINGS.GAME_PHASE.playing;
    GameManager.lastUpdated = Date.now();
    window.requestAnimationFrame(GameLoop.tick);
  }

  clearTimeouts() {
    for (let i = 0; i < GameManager.timeouts.length; i++) {
      clearTimeout(GameManager.timeouts[i]);
    }
    GameManager.timeouts = [];
  }

  setCountDownValue(val) {
    let valNum = val;
    if (val !== 'Go!') {
      valNum = parseInt(val, 10);
    }
    sound.playSound(soundFiles.countdown);
    message.writeMessage(valNum);
  }

  showGameOver() {
    GameManager.phase = SETTINGS.GAME_PHASE.gameOver;
    setTimeout(() => {
      stars.pauseBackground();
      stars.pauseStars();
      this.clearTimeouts();

      if (GameManager.enemies.gameOver) {
        SoundManager.gainNodeGame.gain.setValueAtTime(
          0,
          SoundManager.context.currentTime
        );
        sound.playSound(soundFiles.completed);
        message.writeMessage('victory');
        setTimeout(() => {
          message.appendMessage('reset');
        }, SETTINGS.pressSpaceDelay);
      } else {
        SoundManager.gainNodeGame.gain.setValueAtTime(
          0,
          SoundManager.context.currentTime
        );
        sound.playSound(soundFiles.gameOver);
        message.writeMessage('game-over');
        setTimeout(() => {
          message.appendMessage('reset');
        }, SETTINGS.pressSpaceDelay);
      }
    }, 1000);
  }
}

const gameLoop = new GameLoop();

export default gameLoop;
