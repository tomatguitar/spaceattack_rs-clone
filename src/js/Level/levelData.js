import {
  imageFiles,
  // ENEMY_SEQUENCES,
  ATTACK_BLOCKS,
  ENEMY_SPEED,
} from '../gameSettings/settings';

const levelData = {
  level1: {
    music: '',
    image: '',
    sequences: [
      {
        delayBetween: 600,
        imageEnemy: imageFiles.enemy[0],
        number: 1,
        attackBlock: ATTACK_BLOCKS.STREAMDOWN,
        score: 100,
        lives: 1,
        speed: ENEMY_SPEED.medium,
        delayBefore: 1000,
      },
      {
        delayBetween: 600,
        imageEnemy: imageFiles.enemy[2],
        number: 1,
        attackBlock: ATTACK_BLOCKS.STREAMRETURNMIXED,
        score: 100,
        lives: 1,
        speed: ENEMY_SPEED.medium,
        delayBefore: 2000,
      },
    ],
  },
};

export default levelData;
