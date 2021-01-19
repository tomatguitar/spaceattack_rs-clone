import { GameManager, SETTINGS } from '../gameSettings/settings';

const starsContainer = document.querySelector('.stars');
const stars = document.querySelectorAll('.star');
const background = document.querySelector('.background');

function fadeOut(el) {
  const elem = el;
  let opacity = 1;

  const timer = setInterval(() => {
    if (opacity <= 0.1) {
      clearInterval(timer);
      elem.style.display = 'none';
    }

    elem.style.opacity = opacity;

    opacity -= opacity * 0.1;
  }, 10);
}

function fadeIn(el) {
  const elem = el;
  let opacity = 0.01;

  elem.style.display = 'block';

  const timer = setInterval(() => {
    if (opacity >= 1) {
      clearInterval(timer);
    }

    elem.style.opacity = opacity;

    opacity += opacity * 0.1;
  }, 10);
}

const changeBackground = (url) => {
  background.style.background = `url('${url}')`;
  fadeOut(background);
  fadeIn(background);
};

const runBackground = () => {
  background.style.animationPlayState = 'running';
};

const pauseBackground = () => {
  background.style.animationPlayState = 'paused';
};

const getRandomInt = (from, range) => Math.floor(Math.random() * range) + from;

const removeStars = () => {
  starsContainer.innerHTML = '';
};

const runStar = (el) => {
  const star = el;
  star.style.animationPlayState = 'running';
};

const pauseStars = () => {
  stars.forEach((el) => {
    const star = el;
    star.style.animationPlayState = 'paused';
  });
};

const addStar = (starClass) => {
  const star = document.createElement('span');
  star.classList.add('star', starClass);
  star.style.left = `${getRandomInt(0, SETTINGS.ARENA.width)}px`;
  starsContainer.append(star);
  runStar(star);
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

export {
  removeStars,
  pauseStars,
  createStars,
  runBackground,
  pauseBackground,
  changeBackground,
};
