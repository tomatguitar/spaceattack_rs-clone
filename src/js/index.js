// Import of styles
// Импорт стилей
import '../styles/index.scss';

import ship from '../assets/static/images/sship1.png';

import { imageFiles, GameManager, SETTINGS } from './settings';

import Size from './Size';

import Point from './Point';

import Sprite from './Sprite';

const resetPlayer = () => {
  if (GameManager.player === undefined) {
    // сейчас первый элемент в массиве  это картинка корбаля игрока
    const asset = GameManager.assets[ship];

    GameManager.player = new Sprite(
      SETTINGS.playerDivName,
      new Point(SETTINGS.playerStartPosition.x, SETTINGS.playerStartPosition.y),
      asset.imgFileName,
      new Size(asset.width, asset.height)
    );
    GameManager.player.add(true);
  }
  // eslint-disable-next-line no-console
  console.log('resetplayer() GameManager.player:', GameManager.player);
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

const onKeyDown = (e) => {
  switch (e.keyCode) {
    case SETTINGS.CONTROLS.left: // Влево
      // eslint-disable-next-line no-console
      console.log('Влево');
      break;

    case SETTINGS.CONTROLS.right: // Вправо
      // eslint-disable-next-line no-console
      console.log('Вправо');
      break;

    case SETTINGS.CONTROLS.up: // Вверх
      // eslint-disable-next-line no-console
      console.log('Вверх');
      break;

    case SETTINGS.CONTROLS.down: // Вниз
      // eslint-disable-next-line no-console
      console.log('Вниз');
      break;

    case SETTINGS.CONTROLS.space:
      // eslint-disable-next-line no-console
      console.log('Пробел');
      break;

    case 27: // Esc
      // eslint-disable-next-line no-console
      console.log('Esc');
      break;
    // no default
  }
};

window.addEventListener('keydown', (e) => onKeyDown(e));

document.addEventListener('DOMContentLoaded', () => {
  processAsset(0);
});
