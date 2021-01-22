import langData from './langData';

import { GameManager, SETTINGS } from '../gameSettings/settings';

import * as storage from '../utils/storage';

const content = [];

const setDataKeyArr = (obj, results = []) => {
  const res = results;
  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    if (typeof value !== 'object') {
      res.push(key);
    } else if (typeof value === 'object') {
      setDataKeyArr(value, res);
    }
  });
  return res;
};
// eslint-disable-next-line no-console
console.log(setDataKeyArr(langData.languages.en));

const updateContentList = () => {
  const elArr = setDataKeyArr(langData.languages.en);
  elArr.forEach((el) => {
    const elem = el;
    const selector = document.querySelector(`[data-key=${elem}]`);
    if (selector !== null) {
      content.push(selector);
    }
  });
  return content;
};

function toggleButtonClass(trgt, btns) {
  // Проверяем тот ли это элемент который нам нужен
  if (trgt.classList.contains('button--language')) {
    for (let j = 0; j < btns.length; j += 1) {
      // Убираем у других
      btns[j].classList.remove('button--active');
    }
    // Добавляем тому на который нажали
    trgt.classList.add('button--active');
  }
}

const recursiveSearch = (obj, searchKey, results = []) => {
  const res = results;
  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    if (key === searchKey && typeof value !== 'object') {
      res.push(value);
    } else if (typeof value === 'object') {
      recursiveSearch(value, searchKey, res);
    }
  });
  return res;
};

function updateContentValue(container, currentLang) {
  if (!Array.isArray(container) && !(container instanceof NodeList)) {
    const elem = container;
    const elemKey = elem.getAttribute('data-key');
    const contentValue = recursiveSearch(
      langData.languages[currentLang],
      elemKey
    );
    elem.textContent = contentValue;
  } else {
    container.forEach((el) => {
      const elem = el;
      const elemKey = el.getAttribute('data-key');
      const contentValue = recursiveSearch(
        langData.languages[currentLang],
        elemKey
      );
      elem.textContent = contentValue;
    });
  }
}

function chooseLanguage(event, btns) {
  // Отлавливаем элемент в родители на который мы нажали
  const trgt = event.target;
  const trgtDataKey = trgt.getAttribute('data-key');
  GameManager.language = trgtDataKey.substring(trgtDataKey.indexOf('-') + 1);
  toggleButtonClass(trgt, btns);
}

function setLanguage(btns) {
  let lang = '';
  if (storage.get('language') !== null) {
    lang = storage.get('language');
    GameManager.language = lang;
  } else {
    lang = SETTINGS.gameLanguage;
    GameManager.language = lang;
  }
  for (let i = 0; i < btns.length; i += 1) {
    const btnLangKey = btns[i].getAttribute('data-key');
    if (btnLangKey === `btn-${lang}`) {
      btns[i].classList.add('button--active');
    }
  }
  updateContentList();
  updateContentValue(content, GameManager.language);
}

export {
  setLanguage,
  chooseLanguage,
  updateContentValue,
  updateContentList,
  content,
};
