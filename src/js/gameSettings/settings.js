import galaxy1 from '../../assets/static/images/galaxy1.jpg';

import ship from '../../assets/static/images/sship1.png';

import laser from '../../assets/static/images/laser.png';

import enemy1 from '../../assets/static/images/enemy1.png';
import enemy2 from '../../assets/static/images/enemy2.png';
import enemy3 from '../../assets/static/images/enemy3.png';
import enemy4 from '../../assets/static/images/enemy4.png';
import enemy5 from '../../assets/static/images/asteroid.png';

import explosion0 from '../../assets/static/images/explosion/explosion00_s.png';
import explosion1 from '../../assets/static/images/explosion/explosion01_s.png';
import explosion2 from '../../assets/static/images/explosion/explosion02_s.png';
import explosion3 from '../../assets/static/images/explosion/explosion03_s.png';
import explosion4 from '../../assets/static/images/explosion/explosion04_s.png';
import explosion5 from '../../assets/static/images/explosion/explosion05_s.png';
import explosion6 from '../../assets/static/images/explosion/explosion06_s.png';
import explosion7 from '../../assets/static/images/explosion/explosion07_s.png';
import explosion8 from '../../assets/static/images/explosion/explosion08_s.png';

import countdown from '../../assets/static/sounds/countdown.wav';
import explosion from '../../assets/static/sounds/explosion.wav';
import go from '../../assets/static/sounds/go.wav';
import loseLife from '../../assets/static/sounds/loselife.wav';
import gameOver from '../../assets/static/sounds/gameover.wav';
import completed from '../../assets/static/sounds/completed.wav';
import shot from '../../assets/static/sounds/shot.wav';
import startScreenMusic from '../../assets/static/sounds/startScreenMusic.ogg';
import level1Music from '../../assets/static/sounds/level1.ogg';
import clickButton from '../../assets/static/sounds/clickButtonSound.ogg';

const imageFiles = {
  galaxy1: galaxy1,
  player: ship,
  weapon: laser,
  enemy: [enemy1, enemy2, enemy3, enemy4, enemy5],
  explosion: [
    explosion0,
    explosion1,
    explosion2,
    explosion3,
    explosion4,
    explosion5,
    explosion6,
    explosion7,
    explosion8,
  ],
};

const soundFiles = {
  startScreenMusic: startScreenMusic,
  level1Music: level1Music,
  countdown: countdown,
  explosion: explosion,
  go: go,
  loseLife: loseLife,
  gameOver: gameOver,
  completed: completed,
  shot: shot,
  clickButton: clickButton,
};

const SoundManager = {
  startScreen: null,
  gainNodeStartScreen: null,
  game: null,
  gainNodeGame: null,
  context: null,
  bufferLoader: null,
  bufferList: [],
  sounds: [],
  isSound: '',
};

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
    },
    flashOpacity: '0.5',
    flashTime: 300,
    flashes: 8,
    startLives: 5,
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
  bulletFireRate: 170,
  bulletTop: 10,
  fire: false,

  GAME_PHASE: {
    paused: 0,
    readyToPlay: 1,
    countdownToStart: 2,
    playing: 3,
    gameOver: 4,
    levelComplete: 5,
  },
  countdownGap: 700,
  countdownValues: ['2', '1', 'Go!'],
  pressSpaceDelay: 3000,
  explosionTimeout: 1000,
  gameLanguage: 'en',
  isSound: 'sound-on',
  volume: 0.2,
};

const GameManager = {
  assets: {},
  player: undefined,
  bullets: undefined,
  explosions: undefined,
  enemies: undefined,
  levels: [],
  language: '',
  timeouts: [],
  phase: SETTINGS.GAME_PHASE.gameOver,
  keys: {},
  lastUpdated: Date.now(),
  elapsedTime: 0,
  fps: 0,
};

// маршруты противников
const WAYPOINTS = {
  STREAM60: [
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
      y: 1300,
      dirX: 0,
      dirY: 1,
    },
  ],
  STREAM180: [
    {
      rotation: 0,
      x: 180,
      y: -90,
      dirX: 0,
      dirY: 0,
    },
    {
      rotation: 0,
      x: 180,
      y: 1300,
      dirX: 0,
      dirY: 1,
    },
  ],
  STREAM300: [
    {
      rotation: 0,
      x: 300,
      y: -90,
      dirX: 0,
      dirY: 0,
    },
    {
      rotation: 0,
      x: 300,
      y: 1300,
      dirX: 0,
      dirY: 1,
    },
  ],
  STREAM420: [
    {
      rotation: 0,
      x: 420,
      y: -90,
      dirX: 0,
      dirY: 0,
    },
    {
      rotation: 0,
      x: 420,
      y: 1300,
      dirX: 0,
      dirY: 1,
    },
  ],
  STREAM540: [
    {
      rotation: 0,
      x: 540,
      y: -90,
      dirX: 0,
      dirY: 0,
    },
    {
      rotation: 0,
      x: 540,
      y: 1300,
      dirX: 0,
      dirY: 1,
    },
  ],
  STREAM660: [
    {
      rotation: 0,
      x: 660,
      y: -90,
      dirX: 0,
      dirY: 0,
    },
    {
      rotation: 0,
      x: 660,
      y: 1300,
      dirX: 0,
      dirY: 1,
    },
  ],
  STREAM780: [
    {
      rotation: 0,
      x: 780,
      y: -90,
      dirX: 0,
      dirY: 0,
    },
    {
      rotation: 0,
      x: 780,
      y: 1300,
      dirX: 0,
      dirY: 1,
    },
  ],
  STREAM900: [
    {
      rotation: 0,
      x: 900,
      y: -90,
      dirX: 0,
      dirY: 0,
    },
    {
      rotation: 0,
      x: 900,
      y: 1300,
      dirX: 0,
      dirY: 1,
    },
  ],
  STREAM1020: [
    {
      rotation: 0,
      x: 1020,
      y: -90,
      dirX: 0,
      dirY: 0,
    },
    {
      rotation: 0,
      x: 1020,
      y: 1300,
      dirX: 0,
      dirY: 1,
    },
  ],
  STREAM1140: [
    {
      rotation: 0,
      x: 1140,
      y: -90,
      dirX: 0,
      dirY: 0,
    },
    {
      rotation: 0,
      x: 1140,
      y: 1300,
      dirX: 0,
      dirY: 1,
    },
  ],
  STREAM60RETURN: [
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
      y: 512,
      dirX: 0,
      dirY: 1,
    },
    {
      rotation: 0,
      x: 60,
      y: -90,
      dirX: 0,
      dirY: -1,
    },
  ],
  STREAM180RETURN: [
    {
      rotation: 0,
      x: 180,
      y: -90,
      dirX: 0,
      dirY: 0,
    },
    {
      rotation: 0,
      x: 180,
      y: 512,
      dirX: 0,
      dirY: 1,
    },
    {
      rotation: 0,
      x: 180,
      y: -90,
      dirX: 0,
      dirY: -1,
    },
  ],
  STREAM300RETURN: [
    {
      rotation: 0,
      x: 300,
      y: -90,
      dirX: 0,
      dirY: 0,
    },
    {
      rotation: 0,
      x: 300,
      y: 512,
      dirX: 0,
      dirY: 1,
    },
    {
      rotation: 0,
      x: 300,
      y: -90,
      dirX: 0,
      dirY: -1,
    },
  ],
  STREAM420RETURN: [
    {
      rotation: 0,
      x: 420,
      y: -90,
      dirX: 0,
      dirY: 0,
    },
    {
      rotation: 0,
      x: 420,
      y: 512,
      dirX: 0,
      dirY: 1,
    },
    {
      rotation: 0,
      x: 420,
      y: -90,
      dirX: 0,
      dirY: -1,
    },
  ],
  STREAM540RETURN: [
    {
      rotation: 0,
      x: 540,
      y: -90,
      dirX: 0,
      dirY: 0,
    },
    {
      rotation: 0,
      x: 540,
      y: 512,
      dirX: 0,
      dirY: 1,
    },
    {
      rotation: 0,
      x: 540,
      y: -90,
      dirX: 0,
      dirY: -1,
    },
  ],
  STREAM660RETURN: [
    {
      rotation: 0,
      x: 660,
      y: -90,
      dirX: 0,
      dirY: 0,
    },
    {
      rotation: 0,
      x: 660,
      y: 512,
      dirX: 0,
      dirY: 1,
    },
    {
      rotation: 0,
      x: 660,
      y: -90,
      dirX: 0,
      dirY: -1,
    },
  ],
  STREAM780RETURN: [
    {
      rotation: 0,
      x: 780,
      y: -90,
      dirX: 0,
      dirY: 0,
    },
    {
      rotation: 0,
      x: 780,
      y: 512,
      dirX: 0,
      dirY: 1,
    },
    {
      rotation: 0,
      x: 780,
      y: -90,
      dirX: 0,
      dirY: -1,
    },
  ],
  STREAM900RETURN: [
    {
      rotation: 0,
      x: 900,
      y: -90,
      dirX: 0,
      dirY: 0,
    },
    {
      rotation: 0,
      x: 900,
      y: 512,
      dirX: 0,
      dirY: 1,
    },
    {
      rotation: 0,
      x: 900,
      y: -90,
      dirX: 0,
      dirY: -1,
    },
  ],
  STREAM1020RETURN: [
    {
      rotation: 0,
      x: 1020,
      y: -90,
      dirX: 0,
      dirY: 0,
    },
    {
      rotation: 0,
      x: 1020,
      y: 512,
      dirX: 0,
      dirY: 1,
    },
    {
      rotation: 0,
      x: 1020,
      y: -90,
      dirX: 0,
      dirY: -1,
    },
  ],
  STREAM1140RETURN: [
    {
      rotation: 0,
      x: 1140,
      y: -90,
      dirX: 0,
      dirY: 0,
    },
    {
      rotation: 0,
      x: 1140,
      y: 512,
      dirX: 0,
      dirY: 1,
    },
    {
      rotation: 0,
      x: 1140,
      y: -90,
      dirX: 0,
      dirY: -1,
    },
  ],
  LEFTTORIGHTDEEP: [
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
      y: 448,
      dirX: 0,
      dirY: 1,
    },
    {
      rotation: 0,
      x: 1300,
      y: 448,
      dirX: 1,
      dirY: 0,
    },
  ],
  LEFTTORIGHTSHALLOW: [
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
      x: 1300,
      y: 128,
      dirX: 1,
      dirY: 0,
    },
  ],

  RIGHTTOLEFTDEEP: [
    {
      rotation: 0,
      x: 660,
      y: -90,
      dirX: 0,
      dirY: 0,
    },
    {
      rotation: 0,
      x: 660,
      y: 448,
      dirX: 0,
      dirY: 1,
    },
    {
      rotation: 0,
      x: -90,
      y: 448,
      dirX: -1,
      dirY: 0,
    },
  ],

  RIGHTTOLEFTSHALLOW: [
    {
      rotation: 0,
      x: 1140,
      y: -90,
      dirX: 0,
      dirY: 0,
    },
    {
      rotation: 0,
      x: 1140,
      y: 128,
      dirX: 0,
      dirY: 1,
    },
    {
      rotation: 0,
      x: -90,
      y: 128,
      dirX: -1,
      dirY: 0,
    },
  ],

  INLEFTTURNDOWN: [
    {
      rotation: 0,
      x: -90,
      y: 256,
      dirX: 0,
      dirY: 0,
    },
    {
      rotation: 0,
      x: 480,
      y: 256,
      dirX: 1,
      dirY: 0,
    },
    {
      rotation: 0,
      x: 480,
      y: 620,
      dirX: 0,
      dirY: 1,
    },
  ],
  INRIGHTTURNDOWN: [
    {
      rotation: 0,
      x: 1300,
      y: 256,
      dirX: 0,
      dirY: 0,
    },
    {
      rotation: 0,
      x: 240,
      y: 256,
      dirX: -1,
      dirY: 0,
    },
    {
      rotation: 0,
      x: 240,
      y: 620,
      dirX: 0,
      dirY: 1,
    },
  ],
  INLEFTTURNUP: [
    {
      x: -90,
      y: 384,
      dirX: 0,
      dirY: 0,
    },
    {
      x: 480,
      y: 384,
      dirX: 1,
      dirY: 0,
    },
    {
      x: 480,
      y: -90,
      dirX: 0,
      dirY: -1,
    },
  ],
  INRIGHTTURNUP: [
    {
      x: 810,
      y: 384,
      dirX: 0,
      dirY: 0,
    },
    {
      x: 240,
      y: 384,
      dirX: -1,
      dirY: 0,
    },
    {
      x: 240,
      y: -90,
      dirX: 0,
      dirY: -1,
    },
  ],
  INLEFTDIAGUP: [
    {
      x: 120,
      y: 800,
      dirX: 0,
      dirY: 0,
    },
    {
      x: 120,
      y: 512,
      dirX: 0,
      dirY: -1,
    },
    {
      x: 504,
      y: 128,
      dirX: 1,
      dirY: -1,
    },
    {
      x: 504,
      y: -90,
      dirX: 0,
      dirY: -1,
    },
  ],
  INRIGHTDIAGUP: [
    {
      x: 1140,
      y: 620,
      dir_x: 0,
      dir_y: 0,
    },
    {
      x: 504,
      y: 512,
      dir_x: 0,
      dir_y: -1,
    },
    {
      x: 120,
      y: 128,
      dir_x: -1,
      dir_y: -1,
    },
    {
      x: 120,
      y: -90,
      dir_x: 0,
      dir_y: -1,
    },
  ],
  STREAMFROMB60: [
    {
      rotation: 0,
      x: 60,
      y: 1300,
      dirX: 0,
      dirY: 0,
    },
    {
      rotation: 0,
      x: 60,
      y: -90,
      dirX: 0,
      dirY: -1,
    },
  ],
  STREAMFROMB180: [
    {
      rotation: 0,
      x: 180,
      y: 1300,
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
  STREAMFROMB300: [
    {
      rotation: 0,
      x: 300,
      y: 1300,
      dirX: 0,
      dirY: 0,
    },
    {
      rotation: 0,
      x: 300,
      y: -90,
      dirX: 0,
      dirY: -1,
    },
  ],
  STREAMFROMB420: [
    {
      rotation: 0,
      x: 420,
      y: 1300,
      dirX: 0,
      dirY: 0,
    },
    {
      rotation: 0,
      x: 420,
      y: -90,
      dirX: 0,
      dirY: -1,
    },
  ],
  STREAMFROMB540: [
    {
      rotation: 0,
      x: 540,
      y: 1300,
      dirX: 0,
      dirY: -1,
    },
    {
      rotation: 0,
      x: 540,
      y: -90,
      dirX: 0,
      dirY: -1,
    },
  ],
  STREAMFROMB660: [
    {
      rotation: 0,
      x: 660,
      y: 1300,
      dirX: 0,
      dirY: 0,
    },
    {
      rotation: 0,
      x: 660,
      y: -90,
      dirX: 0,
      dirY: -1,
    },
  ],
  STREAMFROMB780: [
    {
      rotation: 0,
      x: 780,
      y: 1300,
      dirX: 0,
      dirY: 0,
    },
    {
      rotation: 0,
      x: 660,
      y: -90,
      dirX: 0,
      dirY: -1,
    },
  ],
  STREAMFROMB900: [
    {
      rotation: 0,
      x: 900,
      y: 1300,
      dirX: 0,
      dirY: 0,
    },
    {
      rotation: 0,
      x: 660,
      y: -90,
      dirX: 0,
      dirY: -1,
    },
  ],
  STREAMFROMB1020: [
    {
      rotation: 0,
      x: 1020,
      y: 1300,
      dirX: 0,
      dirY: 0,
    },
    {
      rotation: 0,
      x: 660,
      y: -90,
      dirX: 0,
      dirY: -1,
    },
  ],
  STREAMFROMB1140: [
    {
      rotation: 0,
      x: 1140,
      y: 1300,
      dirX: 0,
      dirY: 0,
    },
    {
      rotation: 0,
      x: 660,
      y: -90,
      dirX: 0,
      dirY: -1,
    },
  ],
};

const ENEMY_SPEED = {
  slow: 100 / 1000,
  medium: 150 / 1000,
  fast: 250 / 1000,
  veryfast: 450 / 1000,
  asteroid: 600 / 1000,
};

const ATTACK_BLOCKS = {
  STREAMDOWNSINGLE60: [WAYPOINTS.STREAM60],
  STREAMDOWNSINGLE180: [WAYPOINTS.STREAM180],
  STREAMDOWNSINGLE300: [WAYPOINTS.STREAM300],
  STREAMDOWNSINGLE420: [WAYPOINTS.STREAM420],
  STREAMDOWNSINGLE660: [WAYPOINTS.STREAM660],
  STREAMDOWNSINGLE780: [WAYPOINTS.STREAM780],
  STREAMDOWNSINGLE900: [WAYPOINTS.STREAM900],
  STREAMDOWNSINGLE1020: [WAYPOINTS.STREAM1020],
  STREAMDOWNSINGLE1140: [WAYPOINTS.STREAM1140],
  STREAMRETURNSINGLE60: [WAYPOINTS.STREAM60RETURN],
  STREAMRETURNSINGLE180: [WAYPOINTS.STREAM180RETURN],
  STREAMRETURNSINGLE300: [WAYPOINTS.STREAM300RETURN],
  STREAMRETURNSINGLE420: [WAYPOINTS.STREAM420RETURN],
  STREAMRETURNSINGLE660: [WAYPOINTS.STREAM660RETURN],
  STREAMRETURNSINGLE780: [WAYPOINTS.STREAM780RETURN],
  STREAMRETURNSINGLE900: [WAYPOINTS.STREAM900RETURN],
  STREAMRETURNSINGLE1020: [WAYPOINTS.STREAM1020RETURN],
  STREAMRETURNSINGLE1140: [WAYPOINTS.STREAM1140RETURN],
  STREAMDOWNLEFT: [
    WAYPOINTS.STREAM60,
    WAYPOINTS.STREAM180,
    WAYPOINTS.STREAM300,
    WAYPOINTS.STREAM420,
    WAYPOINTS.STREAM540,
    WAYPOINTS.STREAM660,
  ],
  STREAMDOWNRIGTH: [
    WAYPOINTS.STREAM660,
    WAYPOINTS.STREAM780,
    WAYPOINTS.STREAM900,
    WAYPOINTS.STREAM1020,
    WAYPOINTS.STREAM1140,
  ],
  STREAMDOWNFULL: [
    WAYPOINTS.STREAM60,
    WAYPOINTS.STREAM180,
    WAYPOINTS.STREAM300,
    WAYPOINTS.STREAM420,
    WAYPOINTS.STREAM540,
    WAYPOINTS.STREAM660,
    WAYPOINTS.STREAM780,
    WAYPOINTS.STREAM900,
    WAYPOINTS.STREAM1020,
    WAYPOINTS.STREAM1140,
  ],
  STREAMDOWNFULLREVERSED: [
    WAYPOINTS.STREAM1140,
    WAYPOINTS.STREAM1020,
    WAYPOINTS.STREAM900,
    WAYPOINTS.STREAM780,
    WAYPOINTS.STREAM660,
    WAYPOINTS.STREAM540,
    WAYPOINTS.STREAM420,
    WAYPOINTS.STREAM300,
    WAYPOINTS.STREAM180,
    WAYPOINTS.STREAM60,
  ],
  STREAMDOWNLEFTMIXED: [
    WAYPOINTS.STREAM300,
    WAYPOINTS.STREAM420,
    WAYPOINTS.STREAM660,
    WAYPOINTS.STREAM540,
    WAYPOINTS.STREAM180,
    WAYPOINTS.STREAM60,
  ],
  STREAMDOWNRIGHTMIXEDLEFT: [
    WAYPOINTS.STREAM660,
    WAYPOINTS.STREAM900,
    WAYPOINTS.STREAM1140,
    WAYPOINTS.STREAM780,
    WAYPOINTS.STREAM1020,
    WAYPOINTS.STREAM660,
  ],
  STREAMRETURNMIXEDRIGTH: [
    WAYPOINTS.STREAM660RETURN,
    WAYPOINTS.STREAM900RETURN,
    WAYPOINTS.STREAM540RETURN,
    WAYPOINTS.STREAM1020RETURN,
    WAYPOINTS.STREAM900RETURN,
    WAYPOINTS.STREAM1140RETURN,
  ],
  BADDIETYPE1: [WAYPOINTS.INRIGHTDIAGUP],
  BADDIETYPE2: [WAYPOINTS.INLEFTDIAGUP],
  STREAMUPMIXED: [
    WAYPOINTS.STREAMFROMB300,
    WAYPOINTS.STREAMFROMB420,
    WAYPOINTS.STREAMFROMB60,
    WAYPOINTS.STREAMFROMB540,
    WAYPOINTS.STREAMFROMB660,
    WAYPOINTS.STREAMFROMB180,
  ],
  SIDEASSAULT1: [WAYPOINTS.LEFTTORIGHTDEEP, WAYPOINTS.INRIGHTTURNUP],
  SIDEASSAULT2: [WAYPOINTS.RIGHTTOLEFTDEEP, WAYPOINTS.INLEFTTURNUP],
  SIDEASSAULT3: [WAYPOINTS.LEFTTORIGHTSHALLOW, WAYPOINTS.INRIGHTTURNDOWN],
  SIDEASSAULT4: [WAYPOINTS.RIGHTTOLEFTSHALLOW, WAYPOINTS.INLEFTTURNDOWN],
};

const ENEMY_SEQUENCES = [];

export {
  GameManager,
  SoundManager,
  imageFiles,
  soundFiles,
  SETTINGS,
  WAYPOINTS,
  ENEMY_SPEED,
  ATTACK_BLOCKS,
  ENEMY_SEQUENCES,
};
