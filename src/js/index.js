// Import of styles
// Импорт стилей
import '../styles/index.scss';

import ship from '../assets/static/images/sship1.png';

import { imageFiles, GameManager, SETTINGS } from './settings';

// import Size from './Size';

import Point from './Point';

import Player from './Player';

import Rect from './Rect';

import BulletCollection from './BulletCollection';

import EnemyCollection from './EnemyCollection';

import { setUpSquences } from './Enemy';

import Arena from './Arena';

const arena = new Arena();

const k = GameManager.keys;

const onKeyDown = () => {
  if (k.ArrowLeft) {
    // двигаться влево
    GameManager.player.move(-1, 0);
    // eslint-disable-next-line no-console
    console.log('Влево', GameManager.player.position);
  }
  if (k.ArrowRight) {
    // двигаться вправо
    GameManager.player.move(1, 0);
    // eslint-disable-next-line no-console
    console.log('Вправо', GameManager.player.position);
  }
  if (k.ArrowDown) {
    // двигаться вниз
    GameManager.player.move(0, 1);
    // eslint-disable-next-line no-console
    console.log('Вниз', GameManager.player.position);
  }
  if (k.ArrowUp) {
    // двигаться вверх
    GameManager.player.move(0, -1);
    // eslint-disable-next-line no-console
    console.log('Вверх', GameManager.player.position);
  }
  if (k.Space) {
    // нажимаем Space
    SETTINGS.fire = true;
    // eslint-disable-next-line no-console
    console.log('PEW!', GameManager.player.position);
  }
};

// аналог ф-ции update
const tick = () => {
  if (GameManager.phase !== SETTINGS.GAME_PHASE.paused) {
    const now = Date.now();
    const dt = now - GameManager.lastUpdated;
    // const fpsBox = document.querySelector('.counter--fps');
    GameManager.lastUpdated = now;
    GameManager.fps = parseInt(1000 / dt, 10);
    // fpsBox.textContent = `FPS: ${parseInt(GameManager.fps, 10)}`;
    onKeyDown();
    // появляются противники
    GameManager.bullets.update(dt, SETTINGS.fire);
    GameManager.enemies.update(dt);
    setTimeout(tick, SETTINGS.targetFPS);
  }
};

function appendMessage(text) {
  const mContainer = document.querySelector('.message-container');
  const message = document.createElement('div');
  message.classList.add('message');
  message.textContent = text;
  mContainer.append(message);
}

function clearMessages() {
  const mContainer = document.querySelector('.message-container');
  mContainer.innerHTML = '';
}

function writeMessage(text) {
  clearMessages();
  appendMessage(text);
}

// function showGameOver() {
//   GameManager.phase = SETTINGS.GAME_PHASE.gameOver;

//   writeMessage('Game Over');
//   setTimeout(() => {
//     appendMessage('Press Space To Reset');
//   }, SETTINGS.pressSpaceDelay);
// }

function endCountDown() {
  clearMessages();
  GameManager.phase = SETTINGS.GAME_PHASE.playing;
  GameManager.lastUpdated = Date.now();
  setTimeout(tick, SETTINGS.targetFPS);
}

function runCountDown() {
  GameManager.phase = SETTINGS.GAME_PHASE.countdownToStart;
  writeMessage(3);
  for (let i = 0; i < SETTINGS.countdownValues.length; ++i) {
    setTimeout(
      writeMessage,
      SETTINGS.countdownGap * (i + 1),
      SETTINGS.countdownValues[i]
    );
  }
  setTimeout(
    endCountDown,
    (SETTINGS.countdownValues.length + 1) * SETTINGS.countdownGap
  );
}

function toggleStartPauseMode() {
  if (GameManager.phase === SETTINGS.GAME_PHASE.readyToplay) {
    runCountDown();
  }
  if (GameManager.phase === SETTINGS.GAME_PHASE.playing) {
    GameManager.phase = SETTINGS.GAME_PHASE.paused;
    writeMessage('Game paused');
  } else if (GameManager.phase === SETTINGS.GAME_PHASE.paused) {
    clearMessages();
    runCountDown();
  }
}

const resetBullets = () => {
  // если есть Пули
  if (GameManager.bullets !== undefined) {
    // тогда очистить
    GameManager.bullets.reset();
  } else {
    GameManager.bullets = new BulletCollection(GameManager.player);
  }
};

const resetEnemies = () => {
  if (GameManager.enemies !== undefined) {
    GameManager.enemies.reset();
  } else {
    GameManager.enemies = new EnemyCollection(
      GameManager.player,
      GameManager.bullets
    );
  }
};

const resetPlayer = () => {
  if (GameManager.player === undefined) {
    // сейчас первый элемент в массиве  это картинка корбаля игрока
    const asset = GameManager.assets[ship];

    GameManager.player = new Player(
      SETTINGS.PLAYER.divName,
      new Point(
        SETTINGS.PLAYER.startPosition.x,
        SETTINGS.PLAYER.startPosition.y
      ),
      asset,
      new Rect(60, 60, SETTINGS.ARENA.width - 130, SETTINGS.ARENA.height - 130)
    );
    GameManager.player.add(true);
  }
  // eslint-disable-next-line no-console
  console.log('resetplayer() GameManager.player:', GameManager.player);
  GameManager.player.reset();
};

// инициализация игры
const resetGame = () => {
  // eslint-disable-next-line no-console
  console.log('Main Game reset()');
  arena.updateArenaSize();
  arena.updatePlayerStartPosition();
  resetPlayer();
  resetBullets();
  resetEnemies();
  // setTimeout(tick, SETTINGS.targetFPS);

  GameManager.phase = SETTINGS.GAME_PHASE.readyToplay;
  GameManager.lastUpdated = Date.now();
  GameManager.elapsedTime = 0;

  writeMessage('Press Start button');
};

const processAsset = (indexNum) => {
  let currentIndex = indexNum;
  const img = new Image();
  const currentImage = imageFiles[currentIndex];
  // const imgFileName = `url('../assets/static/images/${currentImage}.png')`;
  img.src = currentImage;
  img.addEventListener('load', () => {
    GameManager.assets[currentImage] = {
      width: img.width,
      height: img.height,
      imgFileName: currentImage,
    };
    currentIndex += 1;
    if (currentIndex < imageFiles.length) {
      processAsset(currentIndex);
    } else {
      // eslint-disable-next-line no-console
      console.log('Assets Done:', GameManager.assets);
      resetGame();
    }
  });
};

const keyEventHandler = (e) => {
  if (e.preventDefault) {
    e.preventDefault();
  } else {
    e.returnValue = false;
  }
  k[e.code] = e.type === 'keydown';
};

const startButton = document.querySelector('.button--start');
startButton.addEventListener('click', () => toggleStartPauseMode());

document.addEventListener('DOMContentLoaded', () => {
  setUpSquences();
  processAsset(0);
  document.addEventListener('keydown', (e) => keyEventHandler(e));
  document.addEventListener('keyup', (e) => keyEventHandler(e));
});
