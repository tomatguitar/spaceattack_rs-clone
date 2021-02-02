import * as storage from '../utils/storage';
import { GameManager, soundFiles, SETTINGS } from '../gameSettings/settings';
import sound from '../soundManage/Sound';
// import message from '../Message/Message';
// import gameLoop from '../GameLoop/GameLoop';

class SettingsMenu {
  constructor(layoutOption, soundOption) {
    this.overlay = document.querySelector('.overlay');
    this.parentEl = document.querySelector('.settings-menu');
    this.langBtns = document.querySelectorAll('.button--language');
    this.soundBtns = document.querySelectorAll('.button--sounds');
    this.parentMenu = document.querySelector('.buttons-wrapper');
    this.volumeSlider = document.querySelector('.range--volume');
    this.about = document.querySelector('.about');
    this.layoutOption = layoutOption;
    this.soundOption = soundOption;
  }

  activeButtonKey(btns) {
    let value = '';
    for (let i = 0; i < btns.length; i += 1) {
      if (btns[i].classList.contains('button--active')) {
        const optionKey = btns[i].getAttribute('data-key');
        value = optionKey.substring(optionKey.indexOf('-') + 1);
      }
    }
    return value;
  }

  switchButtons(target, btns) {
    sound.playSound(soundFiles.clickButton);
    // Проверяем тот ли это элемент который нам нужен
    for (let j = 0; j < btns.length; j += 1) {
      // Убираем у других
      btns[j].classList.remove('button--active');
    }
    // Добавляем тому на который нажали
    target.classList.add('button--active');
  }

  chooseOption(target) {
    if (target.classList.contains('button--language')) {
      this.switchButtons(target, this.langBtns);
      GameManager.language = this.activeButtonKey(this.langBtns);
    } else if (target.classList.contains('button--sounds')) {
      this.switchButtons(target, this.soundBtns);
      SETTINGS.isSound = this.activeButtonKey(this.soundBtns);
    }
  }

  show() {
    if (!this.parentEl.classList.contains('settings-menu--visible')) {
      this.parentEl.classList.add('settings-menu--visible');
      this.overlay.style.display = 'flex';
    }
  }

  showAbout() {
    if (!this.about.classList.contains('about--visible')) {
      this.about.classList.add('about--visible');
      this.overlay.style.display = 'flex';
    }
  }

  close() {
    if (this.parentEl.classList.contains('settings-menu--visible')) {
      this.parentEl.style.display = 'flex';
      this.parentEl.style.visibility = 'visible';
      this.parentEl.classList.remove('settings-menu--visible');
      this.overlay.style.display = 'none';
    }
  }

  closeAbout() {
    if (this.about.classList.contains('about--visible')) {
      this.about.style.display = 'flex';
      this.about.style.visibility = 'visible';
      this.about.classList.remove('about--visible');
      this.overlay.style.display = 'none';
    }
  }

  save() {
    storage.set('language', GameManager.language);
    this.layoutOption.updateContentList();
    this.layoutOption.updateContentValue(
      this.layoutOption.content,
      GameManager.language
    );
    this.soundOption.updateVolumeValue(SETTINGS.volume);
    this.soundOption.switchIsSound();
    this.soundOption.storeIsSoundValue();
    this.soundOption.storeVolumeValue();
  }

  onCLick(event) {
    let action = '';
    const { target } = event;
    const trgtDataKey = target.getAttribute('data-key');
    if (trgtDataKey !== null) {
      action = trgtDataKey.substring(trgtDataKey.indexOf('-') + 1);
    } else {
      return;
    }
    switch (action) {
      case 'save':
      case 'close':
        sound.playSound(soundFiles.clickButton);
        this[action]();
        break;

      case 'closeAbout':
        sound.playSound(soundFiles.clickButton);
        this.closeAbout();
        break;

      case 'settings':
        sound.playSound(soundFiles.clickButton);
        this.show();
        break;

      case 'about':
        sound.playSound(soundFiles.clickButton);
        this.showAbout();
        break;

      case 'volume':
        this.soundOption.getSoundVolume(target);
        break;

      default:
        this.chooseOption(target);
        break;
    }
  }

  init() {
    this.layoutOption.setLanguage();
    this.soundOption.setVolumeValue(this.volumeSlider);
    this.soundOption.setIsSound(this.soundBtns);
    this.parentEl.addEventListener('click', (event) => {
      this.onCLick(event);
    });
    this.parentMenu.addEventListener('click', (event) => {
      this.onCLick(event);
    });
    this.about.addEventListener('click', (event) => {
      this.onCLick(event);
    });
    this.parentEl.addEventListener('change', (event) => {
      this.onCLick(event);
    });
  }
}

export default SettingsMenu;
