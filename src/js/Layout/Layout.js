import langData from '../langData/langData';

import { GameManager, SETTINGS, soundFiles } from '../gameSettings/settings';

import * as storage from '../utils/storage';
import sound from '../soundManage/Sound';

class Layout {
  constructor() {
    this.content = [];
    this.parent = document.querySelector(
      '.settings-menu__language-button-wrapper'
    );
    this.langBtns = document.querySelectorAll('.button--language');
  }

  setDataKeyArr(obj, results = []) {
    const res = results;
    Object.keys(obj).forEach((key) => {
      const value = obj[key];
      if (typeof value !== 'object') {
        res.push(key);
      } else if (typeof value === 'object') {
        this.setDataKeyArr(value, res);
      }
    });
    return res;
  }

  updateContentList() {
    const elArr = this.setDataKeyArr(langData.languages.en);
    elArr.forEach((el) => {
      const elem = el;
      const selector = document.querySelector(`[data-key=${elem}]`);
      if (selector !== null) {
        this.content.push(selector);
      }
    });
    return this.content;
  }

  toggleButtonClass(target, btns) {
    sound.playSound(soundFiles.clickButton);
    // Проверяем тот ли это элемент который нам нужен
    if (target.classList.contains('button--language')) {
      for (let j = 0; j < btns.length; j += 1) {
        // Убираем у других
        btns[j].classList.remove('button--active');
      }
      // Добавляем тому на который нажали
      target.classList.add('button--active');
    }
  }

  recursiveSearch(obj, searchKey, results = []) {
    const res = results;
    Object.keys(obj).forEach((key) => {
      const value = obj[key];
      if (key === searchKey && typeof value !== 'object') {
        res.push(value);
      } else if (typeof value === 'object') {
        this.recursiveSearch(value, searchKey, res);
      }
    });
    return res;
  }

  updateContentValue(container, currentLang) {
    if (!Array.isArray(container) && !(container instanceof NodeList)) {
      const elem = container;
      const elemKey = elem.getAttribute('data-key');
      const contentValue = this.recursiveSearch(
        langData.languages[currentLang],
        elemKey
      );
      elem.textContent = contentValue;
    } else {
      container.forEach((el) => {
        const elem = el;
        const elemKey = el.getAttribute('data-key');
        const contentValue = this.recursiveSearch(
          langData.languages[currentLang],
          elemKey
        );
        elem.textContent = contentValue;
      });
    }
  }

  chooseLanguage(event) {
    // Отлавливаем элемент в родители на который мы нажали
    const { target } = event;
    const trgtDataKey = target.getAttribute('data-key');
    GameManager.language = trgtDataKey.substring(trgtDataKey.indexOf('-') + 1);
    this.toggleButtonClass(target, this.langBtns);
    // eslint-disable-next-line no-console
    console.log('Тыц!');
  }

  setLanguage() {
    let lang = '';
    if (storage.get('language') !== null) {
      lang = storage.get('language');
      GameManager.language = lang;
    } else {
      lang = SETTINGS.gameLanguage;
      GameManager.language = lang;
    }
    for (let i = 0; i < this.langBtns.length; i += 1) {
      const btnLangKey = this.langBtns[i].getAttribute('data-key');
      if (btnLangKey === `btn-${lang}`) {
        this.langBtns[i].classList.add('button--active');
      }
    }
    this.updateContentList();
    this.updateContentValue(this.content, GameManager.language);
  }

  init() {
    this.parent.addEventListener('click', (event) =>
      this.chooseLanguage(event)
    );
  }
}

export default Layout;
