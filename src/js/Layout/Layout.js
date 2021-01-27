import langData from '../langData/langData';

import { GameManager, SETTINGS } from '../gameSettings/settings';

import * as storage from '../utils/storage';

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
}

const layout = new Layout();

export default layout;
