// Import of styles
// Импорт стилей
import '../styles/index.scss';

import ship from '../assets/static/images/sship1.png';

import { imageFiles, GameManager, SETTINGS } from './settings';

// import Size from './Size';

import Point from './Point';

import Player from './Player';

import Rect from './Rect';

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
      //! баг: почему то путается высота и ширина
      new Rect(60, 60, SETTINGS.ARENA.width - 130, SETTINGS.ARENA.height - 130)
    );
    GameManager.player.add(true);
  }
  // eslint-disable-next-line no-console
  console.log('resetplayer() GameManager.player:', GameManager.player);
  GameManager.player.reset();
};

const init = () => {
  // eslint-disable-next-line no-console
  console.log('Main Game init()');
  resetPlayer();
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
      init();
    }
  });
};

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
};

const keyEventHandler = (e) => {
  if (e.preventDefault) {
    e.preventDefault();
  } else {
    e.returnValue = false;
  }
  k[e.code] = e.type === 'keydown';
};

document.addEventListener('DOMContentLoaded', () => {
  processAsset(0);
  document.addEventListener('keydown', (e) => keyEventHandler(e));
  document.addEventListener('keyup', (e) => keyEventHandler(e));
  // имитация Game loop
  setInterval(() => {
    onKeyDown();
  }, 1000 / 24);
});
