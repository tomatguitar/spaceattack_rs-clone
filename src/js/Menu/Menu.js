import { soundFiles } from '../gameSettings/settings';
import sound from '../soundManage/Sound';

class Menu {
  constructor(parentEl) {
    this.parentEl = parentEl;
    this.menu = document.querySelector('.settings-menu');
    this.init();
  }

  show() {
    if (!this.menu.classList.contains('settings-menu--visible'))
      this.menu.classList.add('settings-menu--visible');
  }

  onCLick(event) {
    const { target } = event;
    const trgtDataKey = target.getAttribute('data-key');
    const action = trgtDataKey.substring(trgtDataKey.indexOf('-') + 1);
    if (action === 'settings') {
      sound.playSound(soundFiles.clickButton);
      this.show();
    }
  }

  init() {
    this.parentEl.addEventListener('click', (event) => this.onCLick(event));
  }
}

export default Menu;
