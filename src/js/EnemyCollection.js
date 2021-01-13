import { ENEMY_SEQUENCES, SETTINGS, GameManager } from './settings';
import Enemy from './Enemy';

class EnemyCollection {
  constructor(player) {
    this.listEnemies = [];
    this.lastAdded = 0;
    this.gameOver = false;
    this.sequenceIndex = 0;
    this.sequencesDone = false;
    this.count = 0;
    this.player = player;
  }

  killAll() {
    for (let i = 0; i < this.listEnemies.length; ++i) {
      this.listEnemies[i].killMe();
    }
  }

  update(dt) {
    this.lastAdded += dt;
    if (
      this.sequencesDone === false &&
      ENEMY_SEQUENCES[this.sequenceIndex].delayBefore < this.lastAdded
    ) {
      this.addEnemy();
    }

    for (let i = this.listEnemies.length - 1; i >= 0; --i) {
      if (this.listEnemies[i].state === SETTINGS.ENEMY.state.dead) {
        this.listEnemies.splice(i, 1);
      } else {
        this.listEnemies[i].update(dt);
      }
    }

    this.checkGameOver();
  }

  checkGameOver() {
    if (this.listEnemies.length === 0 && this.sequencesDone === true) {
      this.gameOver = true;
      // eslint-disable-next-line no-console
      console.log('game over');
    }
  }

  addEnemy() {
    // добавляем нового врага в соответствии с секвенцией
    const seq = ENEMY_SEQUENCES[this.sequenceIndex];
    const enNew = new Enemy(
      `enemy_${this.count}`,
      GameManager.assets[seq.image],
      this.player,
      seq
    );
    this.listEnemies.push(enNew);
    enNew.setMoving();
    this.count += 1;
    this.sequenceIndex += 1;
    this.lastAdded = 0;
    if (this.sequenceIndex === ENEMY_SEQUENCES.length) {
      this.sequencesDone = true;
      // eslint-disable-next-line no-console
      console.log('seuences done');
    }
  }
}

export default EnemyCollection;
