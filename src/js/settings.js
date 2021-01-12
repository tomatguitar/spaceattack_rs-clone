import ship from '../assets/static/images/sship1.png';

const imageFiles = [ship];

const SETTINGS = {
  CONTROLS: {
    left: 37,
    right: 39,
    up: 38,
    down: 40,
    space: 32,
    esc: 27,
  },
  PLAYER: {
    divName: 'sprite--player',
    startPosition: {
      x: 0,
      y: 0,
    },
    startLives: 3,
    state: {
      alive: 0,
      dead: 1,
      hitFlashing: 2, // Сколько раз корабль моргнет при попадании
    },
  },
};

const GameManager = {
  assets: {},
  player: undefined,
};

export { GameManager, imageFiles, SETTINGS };
