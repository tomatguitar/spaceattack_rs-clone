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
