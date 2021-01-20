function glowCounter(counterEl) {
  const counterDiv = counterEl;
  if (!counterDiv.classList.contains('counter--glow')) {
    counterDiv.classList.add('counter--glow');
  }
  setTimeout(() => {
    counterDiv.classList.remove('counter--glow');
  }, 500);
}

export default glowCounter;
