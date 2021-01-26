import * as storage from '../utils/storage';
import { GameManager, soundFiles } from '../gameSettings/settings';
import sound from '../soundManage/Sound';

class SettingsMenu {
  constructor(parentEl, layoutOption) {
    this.parentEl = parentEl;
    this.menu = document.querySelector('.settings-menu');
    this.layoutOption = layoutOption;
    this.langBtns = document.querySelectorAll('.button--language');
    this.soundBtns = document.querySelectorAll('.button--sounds');
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

  close() {
    if (this.menu.classList.contains('settings-menu--visible')) {
      this.menu.style.display = 'flex';
      this.menu.style.visibility = 'visible';
      this.menu.classList.remove('settings-menu--visible');
    }
  }

  save() {
    storage.set('language', GameManager.language);
    this.layoutOption.updateContentList();
    this.layoutOption.updateContentValue(
      this.layoutOption.content,
      GameManager.language
    );
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
    }
    this.chooseOption(target);
  }

  init() {
    this.parentEl.forEach((el) => {
      const elem = el;
      elem.addEventListener('click', (event) => {
        this.onCLick(event);
      });
    });
  }
}

export default SettingsMenu;
