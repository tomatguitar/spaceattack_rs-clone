// Import of styles
// Импорт стилей
import '../styles/index.scss';

import ship from '../assets/static/images/sship1.png';
import explosion0 from '../assets/static/images/explosion/explosion00_s.png';

import {
  imageFiles,
  GameManager,
  SETTINGS,
  SoundManager,
  soundFiles,
} from './gameSettings/settings';

// import Size from './Size';

import Point from './Point/Point';

import Player from './Player/Player';

import Rect from './Rect/Rect';

import BulletCollection from './BulletCollection/BulletCollection';

import EnemyCollection from './EnemyCollection/EnemyCollection';

import setUpSquences from './sequenceManage/sequenceManage';

import Arena from './Arena/Arena';

import Explosion from './Explosion/Explosion';

import * as stars from './animations/stars';

import sound from './soundManage/Sound';

// import settingsMenu from './settingsMenu/settingsMenu';

import Layout from './Layout/Layout';

import langData from './langData/langData';

import SettingsMenu from './SettingsMenu/SettingsMenu';

const k = GameManager.keys;

const arena = new Arena();

const layout = new Layout();

const settingsMenu = new SettingsMenu(layout, sound);

const onKeyDown = () => {
  if (k.ArrowLeft) {
    // двигаться влево
    GameManager.player.move(-1, 0);
    // eslint-disable-next-line no-console
    // console.log('Влево', GameManager.player.position);
  }
  if (k.ArrowRight) {
    // двигаться вправо
    GameManager.player.move(1, 0);
  }
  if (k.ArrowDown) {
    // двигаться вниз
    GameManager.player.move(0, 1);
  }
  if (k.ArrowUp) {
    // двигаться вверх
    GameManager.player.move(0, -1);
  }
  if (k.Space) {
    // нажимаем Space
    SETTINGS.fire = true;
  }
};

function appendMessage(dataKey) {
  const mContainer = document.querySelector('.message-container');
  const message = document.createElement('div');
  message.classList.add('message');
  if (Number.isInteger(dataKey)) {
    message.textContent = dataKey;
  } else if (dataKey === 'Go!') {
    message.textContent = langData.languages[GameManager.language].messages.go;
  } else {
    message.dataset.key = dataKey;
    layout.updateContentValue(message, GameManager.language);
  }
  mContainer.append(message);
}

function clearMessages() {
  const mContainer = document.querySelector('.message-container');
  mContainer.innerHTML = '';
}

function writeMessage(dataKey) {
  clearMessages();
  appendMessage(dataKey);
}

function clearTimeouts() {
  for (let i = 0; i < GameManager.timeouts.length; i++) {
    clearTimeout(GameManager.timeouts[i]);
  }
  GameManager.timeouts = [];
}

function showGameOver() {
  GameManager.phase = SETTINGS.GAME_PHASE.gameOver;
  stars.pauseBackground();
  stars.pauseStars();
  clearTimeouts();

  if (GameManager.enemies.gameOver) {
    sound.playSound(soundFiles.completed);
  } else {
    sound.playSound(soundFiles.gameOver);
  }

  writeMessage('game-over');
  setTimeout(() => {
    appendMessage('reset');
  }, SETTINGS.pressSpaceDelay);
}

// аналог ф-ции update
function tick() {
  if (GameManager.phase !== SETTINGS.GAME_PHASE.paused) {
    const now = Date.now();
    const dt = now - GameManager.lastUpdated;
    GameManager.lastUpdated = now;
    GameManager.fps = parseInt(1000 / dt, 10);
    onKeyDown();
    // появляются противники
    GameManager.enemies.update(dt);

    if (GameManager.enemies.gameOver) {
      // eslint-disable-next-line no-console
      console.log('game over');
      showGameOver();
    } else {
      GameManager.bullets.update(dt, SETTINGS.fire);
      GameManager.player.update(dt);
      if (GameManager.player.lives <= 0) {
        // eslint-disable-next-line no-console
        console.log('game over');
        showGameOver();
      } else if (GameManager.phase === SETTINGS.GAME_PHASE.playing) {
        setTimeout(tick, SETTINGS.targetFPS);
      }
    }
  }
}

function endCountDown() {
  clearMessages();
  sound.playSound(soundFiles.go);
  GameManager.phase = SETTINGS.GAME_PHASE.playing;
  GameManager.lastUpdated = Date.now();
  setTimeout(tick, SETTINGS.targetFPS);
}

function setCountDownValue(val) {
  let valNum = val;
  if (val !== 'Go!') {
    valNum = parseInt(val, 10);
  }
  sound.playSound(soundFiles.countdown);
  writeMessage(valNum);
}

function runCountDown() {
  stars.runBackground();
  stars.createStars();
  GameManager.phase = SETTINGS.GAME_PHASE.countdownToStart;
  writeMessage(3);
  sound.playSound(soundFiles.countdown);
  for (let i = 0; i < SETTINGS.countdownValues.length; ++i) {
    setTimeout(
      setCountDownValue,
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
    writeMessage('pause');
  } else if (GameManager.phase === SETTINGS.GAME_PHASE.paused) {
    clearMessages();
    runCountDown();
  }
}

function resetExplosions() {
  GameManager.explosions = new Explosion(explosion0);
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
      GameManager.bullets,
      GameManager.explosions
    );
  }
};

const createPlayer = () => {
  const asset = GameManager.assets[ship];

  GameManager.player = new Player(
    SETTINGS.PLAYER.divName,
    new Point(SETTINGS.PLAYER.startPosition.x, SETTINGS.PLAYER.startPosition.y),
    asset,
    new Rect(60, 60, SETTINGS.ARENA.width - 130, SETTINGS.ARENA.height - 130)
  );
  GameManager.player.add(true);
};

const resetPlayer = () => {
  if (GameManager.player === undefined) {
    // сейчас первый элемент в массиве  это картинка корабля игрока
    createPlayer();
  }
  // eslint-disable-next-line no-console
  console.log('resetplayer() GameManager.player:', GameManager.player);
  GameManager.player.reset();
};

// инициализация игры
const resetGame = () => {
  // eslint-disable-next-line no-console
  console.log('Main Game reset()');
  clearTimeouts();
  stars.removeStars();
  arena.updateArenaSize();
  arena.updatePlayerStartPosition();
  resetPlayer();
  resetBullets();
  resetExplosions();
  resetEnemies();

  GameManager.phase = SETTINGS.GAME_PHASE.readyToplay;
  GameManager.lastUpdated = Date.now();
  GameManager.elapsedTime = 0;
  writeMessage('start');
};

const processAsset = (indexNum) => {
  let currentIndex = indexNum;
  const img = new Image();
  const imageFilesArr = Object.values(imageFiles).flat();
  const currentImage = imageFilesArr[currentIndex];
  // const imgFileName = `url('../assets/static/images/${currentImage}.png')`;
  img.src = currentImage;
  img.addEventListener('load', () => {
    GameManager.assets[currentImage] = {
      width: img.width,
      height: img.height,
      imgFileName: currentImage,
    };
    currentIndex += 1;
    if (currentIndex < imageFilesArr.length) {
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

//! ПЕРЕКЛЮЧЕНИЕ СТАРТА/ПАУЗЫ ИГРЫ \\
const startButton = document.querySelector('.button--start');
startButton.addEventListener('click', () => toggleStartPauseMode());
//! ПЕРЕКЛЮЧЕНИЕ СТАРТА/ПАУЗЫ ИГРЫ \\

//! ПОКАЗАТЬ НАЧАЛЬНЫЙ ЭКРАН \\

function initStartScreen() {
  const game = document.querySelector('.game');
  const startScreen = document.querySelector('.start-screen');
  const btn = document.querySelector('.button--init');
  btn.addEventListener('click', () => {
    if (SoundManager.context.state === 'suspended') {
      SoundManager.context.resume().then(() => {
        SoundManager.startScreen.start();
      });
    }
    startScreen.style.display = 'none';
    game.style.visibility = 'visible';
  });
}

//! ПОКАЗАТЬ НАЧАЛЬНЫЙ ЭКРАН

window.addEventListener('load', () => {
  // preloader
  const preloader = document.querySelector('.preloader');
  preloader.style.display = 'none';
  settingsMenu.init();
  sound.init();
  initStartScreen();
  setUpSquences();
  processAsset(0);
  document.addEventListener('keydown', (e) => keyEventHandler(e));
  document.addEventListener('keyup', (e) => keyEventHandler(e));
});
