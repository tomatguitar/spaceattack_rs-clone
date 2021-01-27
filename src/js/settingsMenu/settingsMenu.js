import * as storage from '../utils/storage';
import { GameManager, soundFiles, SETTINGS } from '../gameSettings/settings';
import sound from '../soundManage/Sound';

class SettingsMenu {
  constructor(layoutOption, soundOption) {
    this.parentEl = document.querySelector('.settings-menu');
    this.langBtns = document.querySelectorAll('.button--language');
    this.soundBtns = document.querySelectorAll('.button--sounds');
    this.parentMenu = document.querySelector('.buttons-wrapper');
    this.layoutOption = layoutOption;
    this.soundOption = soundOption;
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
    } else if (target.classList.contains('button--sounds')) {
      this.switchButtons(target, this.soundBtns);
    }
  }

  show() {
    if (!this.parentEl.classList.contains('settings-menu--visible'))
      this.parentEl.classList.add('settings-menu--visible');
  }

  close() {
    if (this.parentEl.classList.contains('settings-menu--visible')) {
      this.parentEl.style.display = 'flex';
      this.parentEl.style.visibility = 'visible';
      this.parentEl.classList.remove('settings-menu--visible');
    }
  }

  save() {
    storage.set('language', GameManager.language);
    this.layoutOption.updateContentList();
    this.layoutOption.updateContentValue(
      this.layoutOption.content,
      GameManager.language
    );
    this.soundOption.switchIsSound(this.soundBtns);
    this.soundOption.storeIsSoundValue(SETTINGS.isSound);
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
    if (action === 'close' || action === 'save') {
      sound.playSound(soundFiles.clickButton);
      this[action]();
    } else if (action === 'settings') {
      sound.playSound(soundFiles.clickButton);
      this.show();
    }
    this.chooseOption(target);
  }

  init() {
    this.layoutOption.setLanguage();
    this.soundOption.setIsSound(this.soundBtns);
    this.parentEl.addEventListener('click', (event) => {
      this.onCLick(event);
    });
    this.parentMenu.addEventListener('click', (event) => {
      this.onCLick(event);
    });
  }
}

export default SettingsMenu;
