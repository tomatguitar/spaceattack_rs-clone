// Import of styles
// Импорт стилей
import '../styles/index.scss';

import game from './Game/Game';

window.addEventListener('load', () => {
  // preloader
  const preloader = document.querySelector('.preloader');
  preloader.style.display = 'none';
  game.init();
});
