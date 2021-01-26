import * as storage from '../utils/storage';
import { GameManager, soundFiles } from '../gameSettings/settings';
import sound from '../soundManage/Sound';

class SettingsMenu {
  constructor(parentEl, layoutOption) {
    this.parentEl = parentEl;
    this.menu = document.querySelector('.settings-menu');
    this.layoutOption = layoutOption;
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
    const { target } = event;
    const trgtDataKey = target.getAttribute('data-key');
    const action = trgtDataKey.substring(trgtDataKey.indexOf('-') + 1);
    if (action === 'close' || action === 'save') {
      sound.playSound(soundFiles.clickButton);
      this[action]();
    }
  }

  init() {
    this.parentEl.forEach((el) => {
      const elem = el;
      elem.addEventListener('click', (event) => {
        this.onCLick(event);
      });
    });
    this.layoutOption.init();
  }
}

export default SettingsMenu;
