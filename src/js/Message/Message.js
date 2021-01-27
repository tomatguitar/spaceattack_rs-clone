import { GameManager } from '../gameSettings/settings';
import langData from '../langData/langData';
import layout from '../Layout/Layout';

class Message {
  constructor() {
    this.mContainer = document.querySelector('.message-container');
  }

  appendMessage(dataKey) {
    const message = document.createElement('div');
    message.classList.add('message');
    if (Number.isInteger(dataKey)) {
      message.textContent = dataKey;
    } else if (dataKey === 'Go!') {
      message.textContent =
        langData.languages[GameManager.language].messages.go;
    } else {
      message.dataset.key = dataKey;
      layout.updateContentValue(message, GameManager.language);
    }
    this.mContainer.append(message);
  }

  clearMessages() {
    this.mContainer.innerHTML = '';
  }

  writeMessage(dataKey) {
    this.clearMessages();
    this.appendMessage(dataKey);
  }
}

const message = new Message();

export default message;
