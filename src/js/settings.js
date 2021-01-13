import ship from '../assets/static/images/sship1.png';
import laser from '../assets/static/images/laser.png';
import enemy1 from '../assets/static/images/enemy1.png';

const imageFiles = [ship, laser, enemy1];

const arena = document.querySelector('.game__arena');
const arenaWidth = parseInt(getComputedStyle(arena).width, 10);
const arenaHeight = parseInt(getComputedStyle(arena).height, 10);
const arenaTop = parseInt(arena.getBoundingClientRect().top, 10);
const arenaBottom = parseInt(arena.getBoundingClientRect().bottom, 10);
const shipLength = 80; // высота корабля в пикселях

const SETTINGS = {
  CONTROLS: {
    left: 'ArrowLeft',
    right: 'ArrowRight',
    up: 'ArrowUp',
    down: 'ArrowDown',
    space: 32,
    esc: 27,
  },
  PLAYER: {
    divName: 'sprite--player',
    startPosition: {
      x: arenaWidth / 2,
      y: arenaBottom - (arenaTop + shipLength),
    },
    startLives: 3,
    state: {
      alive: 0,
      dead: 1,
      hitFlashing: 2, // Сколько раз корабль моргнет при попадании
    },
    moveStep: 5, // размер шага перемещения игрока за одно нажатие клавиши(скорость)
  },
  ARENA: {
    width: arenaWidth,
    height: arenaHeight,
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
  bulletFireRate: 1000,
};

const GameManager = {
  assets: {},
  player: undefined,
  bullets: undefined,
  enemies: undefined,
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
      y: arenaBottom - 100,
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
