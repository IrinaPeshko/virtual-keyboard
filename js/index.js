import { buttons, functionButtons } from './buttons.js';

const body = document.querySelector('.body');
const container = document.createElement('div');
container.className = 'container';
const content = document.createElement('div');
content.className = 'content';
const header = document.createElement('h1');
header.className = 'header';
header.innerText = 'Virtual Keyboard';
const textArea = document.createElement('textarea');
textArea.className = 'textarea';
textArea.setAttribute('autofocus', 'autofocus');
const keyboardWrapper = document.createElement('div');
keyboardWrapper.className = 'keyboard';
const pToWindows = document.createElement('p');
pToWindows.className = 'prescription';
pToWindows.innerText = 'Клавиатура была создана в операционной системе Windows';
const pToLanguage = document.createElement('p');
pToLanguage.className = 'prescription';
pToLanguage.innerText = 'Для переключения языка комбинация: левые Ctr + Alt';

class Keyboard {
  constructor() {
    this.capsLock = false;
    this.shift = false;
    this.lang = localStorage.lang ? localStorage.lang : 'en';
    this.register = 'lower';

    this.createKeyboard = () => {
      body.prepend(container);
      container.append(content);
      container.append(pToWindows);
      container.append(pToLanguage);
      content.append(header);
      content.append(textArea);
      content.append(keyboardWrapper);
      const keysArr = Object.keys(buttons);
      for (let i = 0; i < keysArr.length; i += 1) {
        const button = document.createElement('button');
        button.className = 'keyboard__button';
        keyboardWrapper.append(button);
        if (functionButtons.includes(keysArr[i])) {
          button.classList.add('keyboard__button_function');
          button.classList.add(`keyboard__${keysArr[i]}`);
        }
      }
    };

    // Create keys
    this.createKeys = () => {
      const buttonsArr = document.querySelectorAll('.keyboard__button');
      let j = 0;
      const keysArr = Object.keys(buttons);
      for (let i = 0; i < keysArr.length; i += 1) {
        buttonsArr[j].innerText = buttons[keysArr[i]][this.lang][this.register];
        buttonsArr[j].setAttribute(
          'data',
          `${buttonsArr[i].innerText.charCodeAt()}`,
        );
        j += 1;
      }
      const caps = document.querySelector('.keyboard__caps');
      if (this.capsLock) {
        caps.classList.add('keyboard__button_active');
      } else {
        caps.classList.remove('keyboard__button_active');
      }
    };
  }
}

const virtualKeyboard = new Keyboard();
virtualKeyboard.createKeyboard();
virtualKeyboard.createKeys();

const rightShift = document.querySelector('.keyboard__shiftRight');
const leftShift = document.querySelector('.keyboard__shiftLeft');
const rightAlt = document.querySelector('.keyboard__altRight');
const leftAlt = document.querySelector('.keyboard__altLeft');
const controlRight = document.querySelector('.keyboard__controlRight');
const controlLeft = document.querySelector('.keyboard__controlLeft');

// добавляеем событие при нажатии на клавиатуру
// KeyDown
document.addEventListener('keydown', (event) => {
  textArea.focus();
  const keyCode = event.key.charCodeAt();
  const keyName = event.key;
  if (
    keyName === 'Shift'
    && event.location === KeyboardEvent.DOM_KEY_LOCATION_RIGHT
  ) {
    if (!virtualKeyboard.capsLock) {
      virtualKeyboard.register = 'upper';
    } else {
      virtualKeyboard.register = 'capsShift';
    }
    rightShift.classList.add('keyboard__button_active');
    virtualKeyboard.createKeys();
  } else if (
    keyName === 'Shift'
    && event.location === KeyboardEvent.DOM_KEY_LOCATION_LEFT
  ) {
    leftShift.classList.add('keyboard__button_active');
    if (!virtualKeyboard.capsLock) {
      virtualKeyboard.register = 'upper';
    } else {
      virtualKeyboard.register = 'capsShift';
    }
    virtualKeyboard.createKeys();
  } else if (
    keyName === 'Alt'
    && event.location === KeyboardEvent.DOM_KEY_LOCATION_RIGHT
    && event.ctrlKey
  ) {
    rightAlt.classList.add('keyboard__button_active');
    if (virtualKeyboard.lang === 'en') {
      virtualKeyboard.lang = 'ru';
      localStorage.lang = 'ru';
    } else {
      virtualKeyboard.lang = 'en';
      localStorage.lang = 'en';
    }
    virtualKeyboard.createKeys();
  } else if (
    keyName === 'Alt'
    && event.location === KeyboardEvent.DOM_KEY_LOCATION_LEFT
    && event.ctrlKey
  ) {
    leftAlt.classList.add('keyboard__button_active');
    if (virtualKeyboard.lang === 'en') {
      virtualKeyboard.lang = 'ru';
      localStorage.lang = 'ru';
    } else {
      virtualKeyboard.lang = 'en';
      localStorage.lang = 'en';
    }
    virtualKeyboard.createKeys();
  } else if (
    keyName === 'Control'
    && event.location === KeyboardEvent.DOM_KEY_LOCATION_RIGHT
  ) {
    controlRight.classList.add('keyboard__button_active');
  } else if (
    keyName === 'Alt'
    && event.location === KeyboardEvent.DOM_KEY_LOCATION_RIGHT
  ) {
    rightAlt.classList.add('keyboard__button_active');
  } else if (
    keyName === 'Control'
    && event.location === KeyboardEvent.DOM_KEY_LOCATION_LEFT
  ) {
    controlLeft.classList.add('keyboard__button_active');
  } else if (keyName === 'Tab') {
    textArea.value += '\t';
  } else if (keyCode === 32) {
    textArea.value += ' ';
    document.querySelector('.keyboard__space')
      .classList.add('keyboard__button_active');
  } else if (keyName === 'Meta') {
    document.querySelector('.keyboard__win')
      .classList.add('keyboard__button_active');
  } else if (keyName === 'ArrowRight') {
    event.preventDefault();
    textArea.value += '►';
    document
      .querySelector(`.keyboard__button[data='${9658}']`)
      .classList.add('keyboard__button_active');
  } else if (keyName === 'ArrowLeft') {
    event.preventDefault();
    textArea.value += '◄';
    document
      .querySelector(`.keyboard__button[data='${9668}']`)
      .classList.add('keyboard__button_active');
  } else if (keyName === 'ArrowUp') {
    event.preventDefault();
    textArea.value += '▲';
    document
      .querySelector(`.keyboard__button[data='${9650}']`)
      .classList.add('keyboard__button_active');
  } else if (keyName === 'ArrowDown') {
    event.preventDefault();
    textArea.value += '▼';
    document
      .querySelector(`.keyboard__button[data='${9660}']`)
      .classList.add('keyboard__button_active');
  } else if (keyName === 'CapsLock') {
    if (!virtualKeyboard.capsLock) {
      virtualKeyboard.capsLock = true;
      virtualKeyboard.register = 'capsLock';
    } else {
      virtualKeyboard.capsLock = false;
      virtualKeyboard.register = 'lower';
    }
    virtualKeyboard.createKeys();
  } else {
    document
      .querySelector(`.keyboard__button[data='${keyCode}']`)
      .classList.add('keyboard__button_active');
  }
});

// KeyUp
textArea.addEventListener('keyup', (event) => {
  const keyCode = event.key.charCodeAt();
  const keyName = event.key;
  if (
    keyName === 'Shift'
    && event.location === KeyboardEvent.DOM_KEY_LOCATION_RIGHT
  ) {
    rightShift.classList.remove('keyboard__button_active');
    if (!virtualKeyboard.capsLock) {
      virtualKeyboard.register = 'lower';
    } else {
      virtualKeyboard.register = 'capsLock';
    }
    virtualKeyboard.createKeys();
  } else if (
    keyName === 'Shift'
    && event.location === KeyboardEvent.DOM_KEY_LOCATION_LEFT
  ) {
    leftShift.classList.remove('keyboard__button_active');
    if (!virtualKeyboard.capsLock) {
      virtualKeyboard.register = 'lower';
    } else {
      virtualKeyboard.register = 'capsLock';
    }
    virtualKeyboard.createKeys();
  } else if (
    keyName === 'Control'
    && event.location === KeyboardEvent.DOM_KEY_LOCATION_RIGHT
  ) {
    controlRight.classList.remove('keyboard__button_active');
  } else if (
    keyName === 'Alt'
    && event.location === KeyboardEvent.DOM_KEY_LOCATION_RIGHT
  ) {
    rightAlt.classList.remove('keyboard__button_active');
  } else if (
    keyName === 'Control'
    && event.location === KeyboardEvent.DOM_KEY_LOCATION_LEFT
  ) {
    controlLeft.classList.remove('keyboard__button_active');
  } else if (keyCode === 32) {
    document
      .querySelector('.keyboard__space')
      .classList.remove('keyboard__button_active');
  } else if (keyName === 'Meta') {
    document.querySelector('.keyboard__win')
      .classList.remove('keyboard__button_active');
  } else if (keyName === 'ArrowRight') {
    document
      .querySelector(`.keyboard__button[data='${9658}']`)
      .classList.remove('keyboard__button_active');
  } else if (keyName === 'ArrowLeft') {
    document
      .querySelector(`.keyboard__button[data='${9668}']`)
      .classList.remove('keyboard__button_active');
  } else if (keyName === 'ArrowUp') {
    document
      .querySelector(`.keyboard__button[data='${9650}']`)
      .classList.remove('keyboard__button_active');
  } else if (keyName === 'ArrowDown') {
    document
      .querySelector(`.keyboard__button[data='${9660}']`)
      .classList.remove('keyboard__button_active');
  } else if (keyName === 'Shift') {
    virtualKeyboard.register = 'lower';
    virtualKeyboard.createKeys();
  } else if (keyName === 'CapsLock') {
    textArea.focus();
  } else {
    document
      .querySelector(`.keyboard__button[data='${keyCode}']`)
      .classList.remove('keyboard__button_active');
  }
  textArea.focus();
});

// добавляем класс при нажатии мышкой
document.querySelectorAll('.keyboard__button').forEach((element) => {
  element.addEventListener('mousedown', () => {
    element.classList.add('keyboard__button_active');

    const keyName = element.innerText;
    const innerText = textArea.value;

    if (keyName === 'Backspace') {
      const cursorPosition = textArea.selectionStart;
      // если курсор стоит в начале поля ввода, то ничего не делаем
      if (cursorPosition === 0) {
        textArea.focus();
      } else {
        const newValue = innerText.substring(0, cursorPosition - 1)
          + innerText.substring(cursorPosition);
        textArea.value = newValue;
        textArea.selectionStart = cursorPosition - 1;
        textArea.selectionEnd = cursorPosition - 1;
      }
    } else if (keyName === 'Del') {
      const cursorPosition = textArea.selectionStart;
      // если курсор стоит в конце поля ввода, то ничего не делаем
      if (cursorPosition === innerText.length) {
        textArea.focus();
      } else {
        const newValue = innerText.substring(0, cursorPosition)
          + innerText.substring(cursorPosition + 1);
        textArea.value = newValue;
        textArea.setSelectionRange(cursorPosition, cursorPosition);
      }
    } else if (keyName === 'Enter') {
      textArea.value += '\n';
    } else if (keyName === 'Tab') {
      textArea.value += '\t';
    } else if (keyName === '') {
      textArea.value += ' ';
    } else if (keyName === 'Win') {
      textArea.focus();
    } else if (keyName === 'CapsLock') {
      if (!virtualKeyboard.capsLock) {
        virtualKeyboard.capsLock = true;
        virtualKeyboard.register = 'capsLock';
      } else {
        virtualKeyboard.capsLock = false;
        virtualKeyboard.register = 'lower';
      }
      virtualKeyboard.createKeys();

      // arrowRight
    } else if (element.getAttribute('data') === 9658) {
      textArea.value += '►';
      // arrowLeft
    } else if (element.getAttribute('data') === 9668) {
      textArea.value += '►';
      // arrowUp
    } else if (element.getAttribute('data') === 9650) {
      textArea.value += '►';
      // ArrowDown
    } else if (element.getAttribute('data') === 9660) {
      textArea.value += '►';
    } else if (keyName === 'Shift') {
      if (!virtualKeyboard.capsLock) {
        virtualKeyboard.register = 'upper';
      } else {
        virtualKeyboard.register = 'capsShift';
      }
      virtualKeyboard.createKeys();
    } else if(keyName === 'Ctrl' || keyName === 'Alt'){
      textArea.focus()
    } else {
      textArea.value += element.innerText;
    }

    textArea.focus();
  });
  element.addEventListener('mouseup', () => {
    const keyName = element.innerText;
    if (keyName !== 'CapsLock') {
      element.classList.remove('keyboard__button_active');
    }
    if (keyName === 'Shift') {
      if (!virtualKeyboard.capsLock) {
        virtualKeyboard.register = 'lower';
      } else {
        virtualKeyboard.register = "capsLock";
      }
      virtualKeyboard.createKeys();
    }
    textArea.focus();
  });
});
