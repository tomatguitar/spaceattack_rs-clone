import { GameManager, SETTINGS } from './settings';

const starsContainer = document.querySelector('.stars');
const star = document.querySelector('.star');

const getRandomInt = (from, range) => Math.floor(Math.random() * range) + from;

const removeStars = () => {
  starsContainer.innerHTML = '';
};

const pauseStars = () => {
  star.style.animationPlayState = 'paused';
};

const addStar = (starClass) => {
  const div = document.createElement('div');
  div.classList.add('star', starClass);
  div.style.left = `${getRandomInt(0, SETTINGS.ARENA.width)}px`;
  starsContainer.append(div);
};

const createStars = () => {
  for (let i = 0; i < 10; ++i) {
    const delay = i * 333;
    GameManager.timeouts.push(
      window.setTimeout(() => addStar('star--small'), delay)
    );
    GameManager.timeouts.push(
      window.setTimeout(() => addStar('star--medium'), delay + 333)
    );
    GameManager.timeouts.push(
      window.setTimeout(() => addStar('star--big'), delay + 666)
    );
  }
};

export { removeStars, pauseStars, createStars };
