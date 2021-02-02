import Level from '../Level/Level';
import levelData from '../levelData/levelData';
import { GameManager } from '../gameSettings/settings';

class LevelManager {
  create(levelnumber) {
    GameManager.levels.push(new Level(levelData[levelnumber]));
    // eslint-disable-next-line no-console
    console.log('Levels:', GameManager.levels);
  }

  init() {
    GameManager.levels[0].setBackground();
    GameManager.levels[0].setUpSequences();
  }
}

const levelManager = new LevelManager();

export default levelManager;
