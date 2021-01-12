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
};

const GameManager = {
  assets: {},
  player: undefined,
};

export { GameManager, imageFiles, SETTINGS };
