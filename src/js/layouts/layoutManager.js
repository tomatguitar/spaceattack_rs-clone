import langData from './langData';

import { GameManager, SETTINGS } from '../gameSettings/settings';

import * as storage from '../utils/storage';

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
  const r = results;
  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    if (key === searchKey && typeof value !== 'object') {
      r.push(value);
    } else if (typeof value === 'object') {
      recursiveSearch(value, searchKey, r);
    }
  });
  return r;
};

function updateContentValue(container, currentLang) {
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

function chooseLanguage(event, btns) {
  // Отлавливаем элемент в родители на который мы нажали
  const trgt = event.target;
  const trgtDataKey = trgt.getAttribute('data-key');
  GameManager.language = trgtDataKey.substring(trgtDataKey.indexOf('-') + 1);
  toggleButtonClass(trgt, btns);
}

function setLanguage(container, btns) {
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
  updateContentValue(container, GameManager.language);
}

export { setLanguage, chooseLanguage, updateContentValue };
