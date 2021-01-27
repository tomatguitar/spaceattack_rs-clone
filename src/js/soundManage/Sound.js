import { SETTINGS, soundFiles, SoundManager } from '../gameSettings/settings';

import BufferLoader from './BufferLoader';

import * as storage from '../utils/storage';

class Sound {
  storeIsSoundValue(value) {
    SETTINGS.isSound = value;
    storage.set('isSound', SETTINGS.isSound);
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

  switchIsSound(btns) {
    for (let i = 0; i < btns.length; i += 1) {
      if (btns[i].classList.contains('button--active')) {
        const soundKey = btns[i].getAttribute('data-key');
        const isSound = soundKey.substring(soundKey.indexOf('-') + 1);
        SETTINGS.isSound = isSound;
      }
    }
    switch (SETTINGS.isSound) {
      case 'sound-on':
        SoundManager.context.resume().then(() => {
          SoundManager.startScreen.start();
        });
        break;
      case 'sound-off':
        if (SoundManager.context.state !== 'suspended') {
          SoundManager.context.suspend();
        }
        break;
      // no default
    }
  }

  changeSoundVolume() {}

  playSound(sound) {
    const currIndex = SoundManager.sounds.indexOf(sound);
    const source = SoundManager.context.createBufferSource();
    source.buffer = SoundManager.bufferList[currIndex];
    source.connect(SoundManager.context.destination);
    if (SETTINGS.isSound === 'sound-on') {
      source.start();
    }
  }

  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  swapMusic(from, to) {
    SoundManager[
      `gainNode${this.capitalize(from)}`
    ].gain.exponentialRampToValueAtTime(
      0.00001,
      SoundManager.context.currentTime + 3.0
    );
    SoundManager[from].stop(SoundManager.context.currentTime + 3.0);
    this.createAudio();
    SoundManager[`gainNode${this.capitalize(to)}`].gain.setValueAtTime(
      0.07,
      SoundManager.context.currentTime
    );
    SoundManager[to].start();
  }

  static createAudio() {
    const startScreenMusic = SoundManager.bufferList[0];
    const level1Music = SoundManager.bufferList[1];
    SoundManager.startScreen = SoundManager.context.createBufferSource();
    SoundManager.gainNodeStartScreen = SoundManager.context.createGain();
    SoundManager.startScreen.buffer = startScreenMusic;
    SoundManager.startScreen.loop = true;
    SoundManager.gainNodeStartScreen.gain.setValueAtTime(
      0.01,
      SoundManager.context.currentTime
    );
    SoundManager.startScreen.connect(SoundManager.gainNodeStartScreen);
    SoundManager.gainNodeStartScreen.connect(SoundManager.context.destination);
    SoundManager.gainNodeStartScreen.gain.exponentialRampToValueAtTime(
      1.0,
      SoundManager.context.currentTime + 3.0
    );

    SoundManager.game = SoundManager.context.createBufferSource();
    SoundManager.gainNodeGame = SoundManager.context.createGain();
    SoundManager.game.buffer = level1Music;
    SoundManager.game.loop = true;
    SoundManager.game.connect(SoundManager.gainNodeGame);
    SoundManager.gainNodeGame.connect(SoundManager.context.destination);
    SoundManager.gainNodeGame.gain.exponentialRampToValueAtTime(
      1.0,
      SoundManager.context.currentTime + 3.0
    );
  }

  finishedLoading(bufferedList) {
    SoundManager.bufferList = [...SoundManager.bufferList, ...bufferedList];
    Sound.createAudio();
  }

  init() {
    // Fix up for prefixing
    const musicNames = Object.values(soundFiles);
    SoundManager.sounds = [...SoundManager.sounds, ...musicNames];
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    SoundManager.context = new AudioContext();
    SoundManager.bufferLoader = new BufferLoader(
      SoundManager.context,
      SoundManager.sounds,
      this.finishedLoading
    );
    SoundManager.bufferLoader.load();
  }
}

const sound = new Sound();

export default sound;
