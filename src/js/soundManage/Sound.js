import { SETTINGS, soundFiles, SoundManager } from '../gameSettings/settings';

import BufferLoader from './BufferLoader';

import * as storage from '../utils/storage';

class Sound {
  constructor() {
    const musicNames = Object.values(soundFiles);
    SoundManager.sounds = [...SoundManager.sounds, ...musicNames];
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    SoundManager.context = new AudioContext();
    SoundManager.bufferLoader = new BufferLoader(
      SoundManager.context,
      SoundManager.sounds,
      this.finishedLoading
    );
  }

  storeIsSoundValue() {
    storage.set('isSound', SETTINGS.isSound);
  }

  storeVolumeValue() {
    storage.set('volume', SETTINGS.volume);
  }

  setIsSound(btns) {
    let isSound = '';
    let btnSoundKey;
    if (storage.get('isSound') !== null) {
      isSound = storage.get('isSound');
      SETTINGS.isSound = isSound;
    } else {
      isSound = SETTINGS.isSound;
    }
    for (let i = 0; i < btns.length; i += 1) {
      btnSoundKey = btns[i].getAttribute('data-key');
      if (btnSoundKey === `btn-${isSound}`) {
        btns[i].classList.add('button--active');
      }
    }
  }

  setVolumeValue(elem) {
    const slider = elem;
    let volumeValue = '';
    if (storage.get('volume') !== null) {
      volumeValue = storage.get('volume');
      SETTINGS.volume = volumeValue;
    } else {
      volumeValue = SETTINGS.volume;
    }
    slider.value = Math.sqrt(volumeValue) * 100;
  }

  switchIsSound() {
    switch (SETTINGS.isSound) {
      case 'sound-on':
        this.updateVolumeValue(SETTINGS.volume);
        break;
      case 'sound-off':
        this.updateVolumeValue(0);
        break;
      // no default
    }
  }

  updateVolumeValue(value) {
    SoundManager.gainNodeSource.gain.setValueAtTime(
      value,
      SoundManager.context.currentTime
    );
    SoundManager.gainNodeStartScreen.gain.setValueAtTime(
      value,
      SoundManager.context.currentTime
    );
    SoundManager.gainNodeGame.gain.setValueAtTime(
      value,
      SoundManager.context.currentTime
    );
  }

  getSoundVolume(el) {
    const elem = el;
    const fraction = parseInt(elem.value, 10) / parseInt(elem.max, 10);
    SETTINGS.volume = fraction * fraction;
  }

  playSound(sound) {
    const currIndex = SoundManager.sounds.indexOf(sound);
    SoundManager.source = SoundManager.context.createBufferSource();
    SoundManager.gainNodeSource = SoundManager.context.createGain();
    SoundManager.source.buffer = SoundManager.bufferList[currIndex];
    SoundManager.source.connect(SoundManager.gainNodeSource);
    SoundManager.gainNodeSource.connect(SoundManager.context.destination);
    if (SETTINGS.isSound === 'sound-off') {
      SoundManager.gainNodeSource.gain.setValueAtTime(
        0,
        SoundManager.context.currentTime
      );
    } else {
      SoundManager.gainNodeSource.gain.setValueAtTime(
        SETTINGS.volume,
        SoundManager.context.currentTime
      );
    }
    SoundManager.source.start();
  }

  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  swapMusic(from, to) {
    const firstTrack = `gainNode${this.capitalize(from)}`;
    const secondTrack = `gainNode${this.capitalize(to)}`;
    if (SETTINGS.isSound === 'sound-off') {
      SoundManager[firstTrack].gain.setValueAtTime(
        0,
        SoundManager.context.currentTime
      );
    } else {
      SoundManager[firstTrack].gain.exponentialRampToValueAtTime(
        0.00001,
        SoundManager.context.currentTime + 3.0
      );
      SoundManager[from].stop(SoundManager.context.currentTime + 3.0);
    }

    Sound.createAudio();
    if (SETTINGS.isSound === 'sound-off') {
      SoundManager[secondTrack].gain.setValueAtTime(
        0,
        SoundManager.context.currentTime
      );
    } else {
      SoundManager[secondTrack].gain.setValueAtTime(
        0.07,
        SoundManager.context.currentTime
      );
    }
    SoundManager[to].start();
  }

  static createAudio() {
    const startScreenMusic = SoundManager.bufferList[0];
    const level1Music = SoundManager.bufferList[1];
    SoundManager.startScreen = SoundManager.context.createBufferSource();
    SoundManager.gainNodeStartScreen = SoundManager.context.createGain();
    SoundManager.startScreen.buffer = startScreenMusic;
    SoundManager.startScreen.loop = true;
    SoundManager.startScreen.connect(SoundManager.gainNodeStartScreen);
    SoundManager.gainNodeStartScreen.connect(SoundManager.context.destination);
    if (SETTINGS.isSound === 'sound-off') {
      SoundManager.gainNodeStartScreen.gain.setValueAtTime(
        0,
        SoundManager.context.currentTime
      );
    } else {
      SoundManager.gainNodeStartScreen.gain.setValueAtTime(
        0.01,
        SoundManager.context.currentTime
      );
      SoundManager.gainNodeStartScreen.gain.exponentialRampToValueAtTime(
        SETTINGS.volume,
        SoundManager.context.currentTime + 3.0
      );
    }

    SoundManager.game = SoundManager.context.createBufferSource();
    SoundManager.gainNodeGame = SoundManager.context.createGain();
    SoundManager.game.buffer = level1Music;
    SoundManager.game.loop = true;
    SoundManager.game.connect(SoundManager.gainNodeGame);
    SoundManager.gainNodeGame.connect(SoundManager.context.destination);
    if (SETTINGS.isSound === 'sound-off') {
      SoundManager.gainNodeGame.gain.setValueAtTime(
        0,
        SoundManager.context.currentTime
      );
    } else {
      SoundManager.gainNodeGame.gain.exponentialRampToValueAtTime(
        SETTINGS.volume,
        SoundManager.context.currentTime + 3.0
      );
    }
  }

  finishedLoading(bufferedList) {
    SoundManager.bufferList = [...SoundManager.bufferList, ...bufferedList];
    Sound.createAudio();
  }

  init() {
    SoundManager.bufferLoader.load();
  }
}

const sound = new Sound();

export default sound;
