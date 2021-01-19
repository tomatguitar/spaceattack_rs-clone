import ship from '../assets/static/images/sship1.png';
import laser from '../assets/static/images/laser.png';
import enemy1 from '../assets/static/images/enemy1.png';

import explosion0 from '../assets/static/images/explosion/explosion00_s.png';
import explosion1 from '../assets/static/images/explosion/explosion01_s.png';
import explosion2 from '../assets/static/images/explosion/explosion02_s.png';
import explosion3 from '../assets/static/images/explosion/explosion03_s.png';
import explosion4 from '../assets/static/images/explosion/explosion04_s.png';
import explosion5 from '../assets/static/images/explosion/explosion05_s.png';
import explosion6 from '../assets/static/images/explosion/explosion06_s.png';
import explosion7 from '../assets/static/images/explosion/explosion07_s.png';
import explosion8 from '../assets/static/images/explosion/explosion08_s.png';

const imageFiles = [
  ship,
  laser,
  enemy1,
  explosion0,
  explosion1,
  explosion2,
  explosion3,
  explosion4,
  explosion5,
  explosion6,
  explosion7,
  explosion8,
];

// const arena = document.querySelector('.game__arena');
// const arenaWidth = parseInt(getComputedStyle(arena).width, 10);
// const arenaHeight = parseInt(getComputedStyle(arena).height, 10);
// const arenaTop = parseInt(arena.getBoundingClientRect().top, 10);
// const arenaBottom = parseInt(arena.getBoundingClientRect().bottom, 10);
// const shipLength = 80; // высота корабля в пикселях

const SETTINGS = {
  CONTROLS: {
    keyPress: {
      left: 37,
      right: 39,
      up: 38,
      down: 40,
      space: 32,
    },
  },
  PLAYER: {
    divName: 'sprite--player',
    startPosition: {
      x: 0,
      y: 0,
      // x: arenaWidth / 2,
      // y: arenaBottom - (arenaTop + shipLength),
    },
    flashOpacity: '0.5',
    flashTime: 300,
    flashes: 8,
    startLives: 3,
    state: {
      alive: 0,
      dead: 1,
      hitFlashing: 2, // Сколько раз корабль моргнет при попадании
    },
    moveStep: 5, // размер шага перемещения игрока за одно нажатие клавиши(скорость)
  },
  ARENA: {
    width: 0,
    height: 0,
    top: 0,
    bottom: 0,
    // width: arenaWidth,
    // height: arenaHeight,
  },
  ENEMY: {
    state: {
      ready: 1,
      dead: 0,
      hitFlashing: 2,
    },
  },

  targetFPS: 1000 / 60,
  bulletSpeed: 700 / 1000,
  bulletLife: 4000,
  bulletFireRate: 200,
  bulletTop: 10,
  fire: false,

  GAME_PHASE: {
    paused: 0,
    readyToPlay: 1,
    countdownToStart: 2,
    playing: 3,
    gameOver: 4,
  },
  countdownGap: 700,
  countdownValues: ['2', '1', 'GO!'],
  pressSpaceDelay: 3000,
  explosionTimeout: 1000,
};

const GameManager = {
  assets: {},
  player: undefined,
  bullets: undefined,
  explosions: undefined,
  enemies: undefined,
  timeouts: [],
  phase: SETTINGS.GAME_PHASE.gameOver,
  keys: {},
  lastUpdated: Date.now(),
  elapsedTime: 0,
  fps: 0,
};

// маршруты противников
const WAYPOINTS = {
  LEFT_TO_RIGHT_SHALLOW: [
    {
      rotation: 0,
      x: 60,
      y: -90,
      dirX: 0,
      dirY: 0,
    },
    {
      rotation: 0,
      x: 60,
      y: 128,
      dirX: 0,
      dirY: 1,
    },
    {
      rotation: 0,
      x: 810,
      y: 128,
      dirX: 1,
      dirY: 0,
    },
  ],
  STREAM_FROM_B180: [
    {
      rotation: 0,
      x: 180,
      y: SETTINGS.ARENA.bottom - 100,
      dirX: 0,
      dirY: 0,
    },
    {
      rotation: 0,
      x: 180,
      y: -90,
      dirX: 0,
      dirY: -1,
    },
  ],
};

const ENEMY_SEQUENCES = [];

export { GameManager, imageFiles, SETTINGS, WAYPOINTS, ENEMY_SEQUENCES };
