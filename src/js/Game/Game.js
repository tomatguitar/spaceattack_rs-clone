import {
  SoundManager,
  imageFiles,
  GameManager,
  SETTINGS,
} from '../gameSettings/settings';

import ship from '../../assets/static/images/sship1.png';
import explosion0 from '../../assets/static/images/explosion/explosion00_s.png';

import Player from '../Player/Player';
import Point from '../Point/Point';
import Rect from '../Rect/Rect';
import Explosion from '../Explosion/Explosion';
import BulletCollection from '../BulletCollection/BulletCollection';

import EnemyCollection from '../EnemyCollection/EnemyCollection';

// import setUpSquences from '../sequenceManage/sequenceManage';

import * as stars from '../animations/stars';
import SettingsMenu from '../SettingsMenu/SettingsMenu';
import message from '../Message/Message';

import control from '../Control/Control';
import gameLoop from '../GameLoop/GameLoop';
import layout from '../Layout/Layout';
import sound from '../soundManage/Sound';
import Arena from '../Arena/Arena';
import levelManager from '../LevelManager/LevelManager';

const arena = new Arena();

const settingsMenu = new SettingsMenu(layout, sound);

class Game {
  constructor(loop, controls, gArena, messages, menu, sounds) {
    this.gameLoop = loop;
    this.controls = controls;
    this.arena = gArena;
    this.message = messages;
    this.settingsMenu = menu;
    this.sound = sounds;
    this.startBtn = document.querySelector('.button--start');
  }

  toggleStartPause() {
    // const { target } = event;
    if (GameManager.phase === SETTINGS.GAME_PHASE.readyToplay) {
      this.gameLoop.runCountDown();
      this.sound.swapMusic('startScreen', 'game');
    }
    if (GameManager.phase === SETTINGS.GAME_PHASE.playing) {
      GameManager.phase = SETTINGS.GAME_PHASE.paused;
      this.message.writeMessage('pause');
      this.sound.swapMusic('game', 'startScreen');
    } else if (GameManager.phase === SETTINGS.GAME_PHASE.paused) {
      this.message.clearMessages();
      this.gameLoop.runCountDown();
      this.sound.swapMusic('startScreen', 'game');
    } else if (GameManager.phase === SETTINGS.GAME_PHASE.gameOver) {
      this.resetGame();
      this.sound.swapMusic('game', 'startScreen');
    }
  }

  initStartScreen() {
    const game = document.querySelector('.game');
    const startScreen = document.querySelector('.start-screen');
    const btn = document.querySelector('.button--init');
    btn.addEventListener('click', () => {
      SoundManager.context.resume();
      SoundManager.startScreen.start();

      startScreen.style.display = 'none';
      game.style.visibility = 'visible';
    });
  }

  resetExplosions() {
    GameManager.explosions = new Explosion(explosion0);
  }

  resetBullets() {
    // если есть Пули
    if (GameManager.bullets !== undefined) {
      // тогда очистить
      GameManager.bullets.reset();
    } else {
      GameManager.bullets = new BulletCollection(GameManager.player);
    }
  }

  resetEnemies() {
    if (GameManager.enemies !== undefined) {
      GameManager.enemies.reset();
    } else {
      GameManager.enemies = new EnemyCollection(
        GameManager.player,
        GameManager.bullets,
        GameManager.explosions
      );
    }
  }

  resetPlayer() {
    if (GameManager.player === undefined) {
      // сейчас первый элемент в массиве  это картинка корабля игрока
      this.createPlayer();
    }
    // eslint-disable-next-line no-console
    console.log('resetplayer() GameManager.player:', GameManager.player);
    GameManager.player.reset();
  }

  createPlayer() {
    const asset = GameManager.assets[ship];

    GameManager.player = new Player(
      SETTINGS.PLAYER.divName,
      GameManager.explosions,
      new Point(
        SETTINGS.PLAYER.startPosition.x,
        SETTINGS.PLAYER.startPosition.y
      ),
      asset,
      new Rect(40, 40, SETTINGS.ARENA.width - 100, SETTINGS.ARENA.height - 100)
    );
    GameManager.player.add(true);
  }

  // инициализация игры
  resetGame() {
    // eslint-disable-next-line no-console
    console.log('Main Game reset()');
    this.gameLoop.clearTimeouts();
    stars.removeStars();
    this.arena.updateArenaSize();
    this.arena.updatePlayerStartPosition();
    this.resetExplosions();
    this.resetPlayer();
    this.resetBullets();
    this.resetEnemies();

    GameManager.phase = SETTINGS.GAME_PHASE.readyToplay;
    GameManager.lastUpdated = Date.now();
    GameManager.elapsedTime = 0;
    this.message.writeMessage('start');
  }

  processAsset(indexNum) {
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
        this.processAsset(currentIndex);
      } else {
        // eslint-disable-next-line no-console
        console.log('Assets Done:', GameManager.assets);
        this.resetGame();
      }
    });
  }

  init() {
    this.controls.init();
    this.settingsMenu.init();
    this.sound.init();
    this.initStartScreen();
    this.processAsset(0);
    levelManager.create('level1');
    levelManager.init();
    // setUpSquences();
    this.startBtn.addEventListener('click', () => {
      this.toggleStartPause();
    });
  }
}

const game = new Game(gameLoop, control, arena, message, settingsMenu, sound);

export default game;
