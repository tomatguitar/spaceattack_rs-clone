import {
  // imageFiles,
  ENEMY_SEQUENCES,
  // ATTACK_BLOCKS,
  // ENEMY_SPEED,
} from '../gameSettings/settings';

class Level {
  constructor({
    music,
    image,
    sequences,
    // delayBeetween,
    // imageEnemy,
    // number,
    // attackBlock,
    // score,
    // lives,
    // speed,
    // delayBefore,
  }) {
    this.waves = 0;
    this.wavesCounter = 0;
    this.background = '';
    this.music = music;
    this.image = image;
    this.sequences = sequences;
    // this.delayBeetween = delayBeetween;
    // this.imageEnemy = imageEnemy;
    // this.number = number;
    // this.attackBlock = attackBlock;
    // this.score = score;
    // this.lives = lives;
    // this.speed = speed;
    // this.delayBefore = delayBefore;
  }

  addEnemySequence(
    delayBefore,
    delayBetween,
    image,
    score,
    lives,
    speed,
    number,
    waypoints
  ) {
    for (let i = 0; i < number; ++i) {
      let delay = delayBetween;
      if (i === 0) {
        delay = delayBefore;
      }
      ENEMY_SEQUENCES.push({
        delayBefore: delay,
        image: image,
        waypoints: waypoints,
        score: score,
        lives: lives,
        speed: speed,
      });
    }
  }

  createSequence(sequenceData) {
    for (let i = 0; i < sequenceData.attackBlock.length; ++i) {
      let delay = sequenceData.delayBetween;
      if (i === 0) {
        delay = sequenceData.delayBefore;
      }
      this.addEnemySequence(
        delay,
        sequenceData.delayBetween,
        sequenceData.imageEnemy,
        sequenceData.score,
        sequenceData.lives,
        sequenceData.speed,
        sequenceData.number,
        sequenceData.attackBlock[i]
      );
    }
  }

  setUpSequences() {
    for (let i = 0; i < this.sequences.length; i++) {
      this.createSequence(this.sequences[i]);
      this.waves += 1;
    }
  }
}

export default Level;
