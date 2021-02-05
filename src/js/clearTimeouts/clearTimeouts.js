import { GameManager } from '../gameSettings/settings';

export default function clearTimeouts() {
  for (let i = 0; i < GameManager.timeouts.length; i++) {
    clearTimeout(GameManager.timeouts[i]);
  }
  GameManager.timeouts = [];
}
