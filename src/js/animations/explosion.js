import { imageFiles } from '../gameSettings/settings';

const explosionFrames = [
  { backgroundImage: `url('${imageFiles.explosion[0]}')` },
  { backgroundImage: `url('${imageFiles.explosion[1]}')` },
  { backgroundImage: `url('${imageFiles.explosion[2]}')` },
  { backgroundImage: `url('${imageFiles.explosion[3]}')` },
  { backgroundImage: `url('${imageFiles.explosion[4]}')` },
  { backgroundImage: `url('${imageFiles.explosion[5]}')` },
];

const explosionTiming = {
  duration: 500,
  iterations: 1,
};

export { explosionFrames, explosionTiming };

// @keyframes explosion {
//   0% {
//     background-image: url('../assets/static/images/explosion/explosion00_s.png');
//   }
//   20% {
//     background-image: url('../assets/static/images/explosion/explosion01_s.png');
//   }
//   40% {
//     background-image: url('../assets/static/images/explosion/explosion02_s.png');
//   }
//   60% {
//     background-image: url('../assets/static/images/explosion/explosion03_s.png');
//     opacity: 0.9;
//   }
//   80% {
//     background-image: url('../assets/static/images/explosion/explosion04_s.png');
//     opacity: 0.8;
//   }
//   100% {
//     background-image: url('../assets/static/images/explosion/explosion05_s.png');
//     opacity: 0.5;
//   }
// }
