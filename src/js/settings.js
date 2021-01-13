import ship from '../assets/static/images/sship1.png';

const imageFiles = [ship];

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
    moveStep: 8, // размер шага перемещения игрока за одно нажатие клавиши(скорость)
  },
  ARENA: {
    width: arenaWidth,
    height: arenaHeight,
  },
};

const GameManager = {
  assets: {},
  player: undefined,
  keys: {},
};

export { GameManager, imageFiles, SETTINGS };
