import {
  ENEMY_SEQUENCES,
  SETTINGS,
  GameManager,
  soundFiles,
} from '../gameSettings/settings';
import sound from '../soundManage/Sound';
import Enemy from '../Enemy/Enemy';
import Point from '../Point/Point';

class EnemyCollection {
  constructor(player, bullets, explosions) {
    this.listEnemies = [];
    this.lastAdded = 0;
    this.gameOver = false;
    this.sequenceIndex = 0;
    this.sequencesDone = false;
    this.count = 0;
    this.player = player;
    this.bullets = bullets;
    this.explosions = explosions;
  }

  reset() {
    this.killAll();
    this.listEnemies = [];
    this.lastAdded = 0;
    this.gameOver = false;
    this.sequenceIndex = 0;
    this.sequencesDone = false;
    this.count = 0;
  }

  killAll() {
    for (let i = 0; i < this.listEnemies.length; ++i) {
      this.listEnemies[i].killMe();
    }
  }

  update(dt) {
    this.lastAdded += dt;
    if (
      !this.sequencesDone &&
      ENEMY_SEQUENCES[this.sequenceIndex].delayBefore < this.lastAdded
    ) {
      this.addEnemy();
    }

    for (let i = this.listEnemies.length - 1; i >= 0; --i) {
      if (this.listEnemies[i].state === SETTINGS.ENEMY.state.dead) {
        this.listEnemies.splice(i, 1);
      } else if (
        this.listEnemies[i].state === SETTINGS.ENEMY.state.movingToWaypoint
      ) {
        const enemy = this.listEnemies[i];

        for (let b = 0; b < this.bullets.listBullets.length; b++) {
          const bullet = this.bullets.listBullets[b];
          if (
            !bullet.dead &&
            bullet.position.y > SETTINGS.bulletTop &&
            enemy.containingBox.IntersectedBy(bullet.containingBox)
          ) {
            bullet.kill();
            enemy.lives -= 1;
            if (enemy.lives <= 0) {
              sound.playSound(soundFiles.explosion);
              this.player.incrementScore(enemy.score);
              this.player.incrementDestroyed();
              enemy.killMe();
              const centerPoint = enemy.getCenterPoint();
              this.explosions.createExplosion(
                new Point(centerPoint.x, centerPoint.y)
              );
            }
          }
        }
        enemy.update(dt);
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
