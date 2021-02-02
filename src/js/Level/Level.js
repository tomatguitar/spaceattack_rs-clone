import { ENEMY_SEQUENCES } from '../gameSettings/settings';

class Level {
  constructor(data) {
    this.background = data.background;
    this.sequences = data.sequences;
  }

  setBackground() {
    const bckgImg = document.querySelector('.background');
    bckgImg.style.background = `url('${this.background}') repeat-y`;
    bckgImg.style.backgroundSize = 'cover';
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
    }
  }
}

export default Level;
