import { GameManager, soundFiles } from '../gameSettings/settings';

function loadSound(fileName) {
  GameManager.sounds[fileName] = new Audio(`${fileName}`);
}

function initSounds() {
  const soudArr = Object.values(soundFiles);
  for (let i = 0; i < soudArr.length; ++i) {
    loadSound(soudArr[i]);
  }
}

function playSound(sound) {
  GameManager.sounds[sound].play();
}

export { loadSound, initSounds, playSound };
