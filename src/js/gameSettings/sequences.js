import {
  imageFiles,
  ENEMY_SEQUENCES,
  ATTACK_BLOCKS,
  ENEMY_SPEED,
} from './settings';

function addEnemySequence(
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

function createSequence(
  delayBetween,
  image,
  number,
  attackBlock,
  score,
  lives,
  speed,
  delayBefore
) {
  for (let i = 0; i < attackBlock.length; ++i) {
    let delay = delayBetween;
    if (i === 0) {
      delay = delayBefore;
    }
    addEnemySequence(
      delay,
      delayBetween,
      image,
      score,
      lives,
      speed,
      number,
      attackBlock[i]
    );
  }
}

function setUpSequences() {
  createSequence(
    600,
    imageFiles.enemy[0],
    1,
    ATTACK_BLOCKS.STREAMDOWN,
    100,
    1,
    ENEMY_SPEED.medium,
    1000
  );
  createSequence(
    600,
    imageFiles.enemy[1],
    1,
    ATTACK_BLOCKS.STREAMDOWNMIXED,
    100,
    1,
    ENEMY_SPEED.medium,
    2000
  );
  createSequence(
    600,
    imageFiles.enemy[2],
    1,
    ATTACK_BLOCKS.STREAMRETURNMIXED,
    100,
    1,
    ENEMY_SPEED.medium,
    2000
  );
  createSequence(
    600,
    imageFiles.enemy[3],
    1,
    ATTACK_BLOCKS.BADDIETYPE1,
    500,
    8,
    ENEMY_SPEED.slow,
    500
  );
  createSequence(
    600,
    imageFiles.enemy[0],
    2,
    ATTACK_BLOCKS.STREAMUPMIXED,
    100,
    1,
    ENEMY_SPEED.fast,
    7000
  );
  createSequence(
    600,
    imageFiles.enemy[2],
    1,
    ATTACK_BLOCKS.SIDEASSAULT1,
    100,
    1,
    ENEMY_SPEED.fast,
    3000
  );
  createSequence(
    600,
    imageFiles.enemy[3],
    1,
    ATTACK_BLOCKS.SIDEASSAULT2,
    100,
    1,
    ENEMY_SPEED.fast,
    3000
  );
  createSequence(
    600,
    imageFiles.enemy[0],
    2,
    ATTACK_BLOCKS.SIDEASSAULT3,
    100,
    1,
    ENEMY_SPEED.fast,
    2000
  );
  createSequence(
    600,
    imageFiles.enemy[3],
    2,
    ATTACK_BLOCKS.SIDEASSAULT4,
    100,
    1,
    ENEMY_SPEED.fast,
    2000
  );
  createSequence(
    600,
    imageFiles.enemy[2],
    4,
    ATTACK_BLOCKS.SIDEASSAULT2,
    100,
    1,
    ENEMY_SPEED.medium,
    2000
  );
  createSequence(
    600,
    imageFiles.enemy[0],
    4,
    ATTACK_BLOCKS.SIDEASSAULT3,
    100,
    1,
    ENEMY_SPEED.medium,
    2000
  );
  createSequence(
    600,
    imageFiles.enemy[0],
    1,
    ATTACK_BLOCKS.BADDIETYPE2,
    500,
    8,
    ENEMY_SPEED.slow,
    500
  );
  createSequence(
    600,
    imageFiles.enemy[3],
    2,
    ATTACK_BLOCKS.STREAMDOWN,
    100,
    1,
    ENEMY_SPEED.fast,
    2000
  );
  createSequence(
    600,
    imageFiles.enemy[2],
    2,
    ATTACK_BLOCKS.STREAMDOWNMIXED,
    100,
    1,
    ENEMY_SPEED.fast,
    2000
  );
  createSequence(
    600,
    imageFiles.enemy[0],
    4,
    ATTACK_BLOCKS.STREAMRETURNMIXED,
    100,
    1,
    ENEMY_SPEED.medium,
    2000
  );
  // eslint-disable-next-line no-console
  console.log('EnemySequences:', ENEMY_SEQUENCES);
}

export default setUpSequences;
