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
    this.about = document.querySelector('.about-menu');
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

  show(el, classEl) {
    const elem = el;
    if (!elem.classList.contains(classEl)) {
      elem.classList.add(classEl);
      this.overlay.style.display = 'flex';
    }
  }

  close(el, classEl) {
    const elem = el;
    if (elem.classList.contains(classEl)) {
      elem.classList.remove(classEl);
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
        sound.playSound(soundFiles.clickButton);
        this[action]();
        break;

      case 'close':
        sound.playSound(soundFiles.clickButton);
        this.close(this.parentEl, 'settings-menu--visible');
        break;

      case 'closeAbout':
        sound.playSound(soundFiles.clickButton);
        this.close(this.about, 'about-menu--visible');
        break;

      case 'settings':
        sound.playSound(soundFiles.clickButton);
        this.show(this.parentEl, 'settings-menu--visible');
        break;

      case 'about':
        sound.playSound(soundFiles.clickButton);
        this.show(this.about, 'about-menu--visible');
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
