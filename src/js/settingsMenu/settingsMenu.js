import * as layout from '../layouts/layoutManager';
import * as storage from '../utils/storage';

function showSettingsMenu(el) {
  const elem = el;
  if (!elem.classList.contains('settings-menu--visible'))
    elem.classList.add('settings-menu--visible');
}

function closeSettingsMenu(el) {
  const elem = el;
  if (elem.classList.contains('settings-menu--visible')) {
    elem.style.display = 'flex';
    elem.style.visibility = 'visible';
    elem.classList.remove('settings-menu--visible');
  }
}

function saveSettings(content, lang) {
  storage.set('language', lang);
  layout.updateContentValue(content, lang);
}

// function saveSettings(state) {}

export { showSettingsMenu, closeSettingsMenu, saveSettings };
