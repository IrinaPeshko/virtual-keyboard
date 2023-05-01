import { buttons, functionButtons } from "./buttons.js";

const body = document.querySelector(".body");
const container = document.createElement("div");
container.className = "container";
const content = document.createElement("div");
content.className = "content";
const header = document.createElement("h1");
header.className = "header";
header.innerText = "Virtual Keyboard";
const textArea = document.createElement("textarea");
textArea.className = "textarea";
textArea.setAttribute("autofocus", "autofocus");
const keyboardWrapper = document.createElement("div");
keyboardWrapper.className = "keyboard";
const button = document.createElement("button");
button.className = "keyboard__button";
const pToWindows = document.createElement("p");
pToWindows.className = "prescription";
pToWindows.innerText = "Клавиатура была создана в операционной системе Windows";
const pToLanguage = document.createElement("p");
pToLanguage.className = "prescription";
pToLanguage.innerText = "Для переключения языка комбинация: левые Ctr + Alt";

class Keyboard {
  constructor() {
    this.capsLock = false;
    this.shift = false;
    this.lang = localStorage.lang ? localStorage.lang : "en";
    this.register = "lower";
  }

  createKeyboard() {
    body.prepend(container);
    container.append(content);
    container.append(pToWindows);
    container.append(pToLanguage);
    content.append(header);
    content.append(textArea);
    content.append(keyboardWrapper);
    for (let key in buttons) {
      const button = document.createElement("button");
      button.className = "keyboard__button";
      keyboardWrapper.append(button);
      if (functionButtons.includes(key)) {
        button.classList.add("keyboard__button_function");
        button.classList.add(`keyboard__${key}`);
      }
    }
  }

  // Create keys
  createKeys() {
    const buttonsArr = document.querySelectorAll(".keyboard__button");
    let i = 0;
    for (let key in buttons) {
      buttonsArr[i].innerText = buttons[key][this.lang][this.register];
      buttonsArr[i].setAttribute(
        "data",
        `${buttonsArr[i].innerText.charCodeAt()}`
      );
      i++;
    }
    const caps = document.querySelector(".keyboard__caps");
    if (this.capsLock) {
      caps.classList.add("keyboard__button_active");
    } else {
      caps.classList.remove("keyboard__button_active");
    }
  }
}

const virtualKeyboard = new Keyboard();
virtualKeyboard.createKeyboard();
virtualKeyboard.createKeys();

const rightShift = document.querySelector(".keyboard__shiftRight");
const leftShift = document.querySelector(".keyboard__shiftLeft");
const rightAlt = document.querySelector(".keyboard__altRight");
const controlRight = document.querySelector(".keyboard__controlRight");
const controlLeft = document.querySelector(".keyboard__controlLeft");

// добавляеем событие при нажатии на клавиатуру
// KeyDown
document.addEventListener("keydown", (event) => {
  const keyCode = event.key.charCodeAt();
  const keyName = event.key;
  console.log(keyCode);
  if (
    keyName === "Shift" &&
    event.location == KeyboardEvent.DOM_KEY_LOCATION_RIGHT
  ) {
    if (!virtualKeyboard.capsLock) {
      virtualKeyboard.register = "upper";
    } else {
      virtualKeyboard.register = "capsShift";
    }
    rightShift.classList.add("keyboard__button_active");
    virtualKeyboard.createKeys();
  } else if (
    keyName === "Shift" &&
    event.location == KeyboardEvent.DOM_KEY_LOCATION_LEFT
  ) {
    leftShift.classList.add("keyboard__button_active");
    if (!virtualKeyboard.capsLock) {
      virtualKeyboard.register = "upper";
    } else {
      virtualKeyboard.register = "capsShift";
    }
    virtualKeyboard.createKeys();
  } else if (
    keyName === "Control" &&
    event.location == KeyboardEvent.DOM_KEY_LOCATION_RIGHT
  ) {
    controlRight.classList.add("keyboard__button_active");
  } else if (
    keyName === "Alt" &&
    event.location == KeyboardEvent.DOM_KEY_LOCATION_RIGHT
  ) {
    rightAlt.classList.add("keyboard__button_active");
  } else if (
    keyName === "Control" &&
    event.location == KeyboardEvent.DOM_KEY_LOCATION_LEFT
  ) {
    controlLeft.classList.add("keyboard__button_active");
  } else if (keyName === "Tab") {
    textArea.value += "\t";
  } else if (keyName === "ArrowRight") {
    document
      .querySelector(".keyboard__button[data='" + 9658 + "']")
      .classList.add("keyboard__button_active");
  } else if (keyName === "ArrowLeft") {
    document
      .querySelector(".keyboard__button[data='" + 9668 + "']")
      .classList.add("keyboard__button_active");
  } else if (keyName === "ArrowUp") {
    document
      .querySelector(".keyboard__button[data='" + 9650 + "']")
      .classList.add("keyboard__button_active");
  } else if (keyName === "ArrowDown") {
    document
      .querySelector(".keyboard__button[data='" + 9660 + "']")
      .classList.add("keyboard__button_active");
  } else if (keyName === "CapsLock") {
    if (!virtualKeyboard.capsLock) {
      virtualKeyboard.capsLock = true;
      virtualKeyboard.register = "capsLock";
    } else {
      virtualKeyboard.capsLock = false;
      virtualKeyboard.register = "lower";
    }
    virtualKeyboard.createKeys();
  } else {
    document
      .querySelector(".keyboard__button[data='" + keyCode + "']")
      .classList.add("keyboard__button_active");
  }
});
// KeyUp
textArea.addEventListener("keyup", (event) => {
  const keyCode = event.key.charCodeAt();
  const keyName = event.key;
  // let cursorPosition = textArea.selectionStart;
  console.log(keyName);

  if (
    keyName === "Shift" &&
    event.location == KeyboardEvent.DOM_KEY_LOCATION_RIGHT
  ) {
    rightShift.classList.remove("keyboard__button_active");
    if (!virtualKeyboard.capsLock) {
      virtualKeyboard.register = "lower";
    } else {
      virtualKeyboard.register = "capsLock";
    }
    virtualKeyboard.createKeys();
  } else if (
    keyName === "Shift" &&
    event.location == KeyboardEvent.DOM_KEY_LOCATION_LEFT
  ) {
    leftShift.classList.remove("keyboard__button_active");
    if (!virtualKeyboard.capsLock) {
      virtualKeyboard.register = "lower";
    } else {
      virtualKeyboard.register = "capsLock";
    }
    virtualKeyboard.createKeys();
  } else if (
    keyName === "Control" &&
    event.location == KeyboardEvent.DOM_KEY_LOCATION_RIGHT
  ) {
    controlRight.classList.remove("keyboard__button_active");
  } else if (
    keyName === "Alt" &&
    event.location == KeyboardEvent.DOM_KEY_LOCATION_RIGHT
  ) {
    rightAlt.classList.remove("keyboard__button_active");
  } else if (
    keyName === "Control" &&
    event.location == KeyboardEvent.DOM_KEY_LOCATION_LEFT
  ) {
    controlLeft.classList.remove("keyboard__button_active");
  } else if (keyName === "ArrowRight") {
    document
      .querySelector(".keyboard__button[data='" + 9658 + "']")
      .classList.remove("keyboard__button_active");
  } else if (keyName === "ArrowLeft") {
    document
      .querySelector(".keyboard__button[data='" + 9668 + "']")
      .classList.remove("keyboard__button_active");
  } else if (keyName === "ArrowUp") {
    document
      .querySelector(".keyboard__button[data='" + 9650 + "']")
      .classList.remove("keyboard__button_active");
  } else if (keyName === "ArrowDown") {
    document
      .querySelector(".keyboard__button[data='" + 9660 + "']")
      .classList.remove("keyboard__button_active");
  } else if (keyName === "Shift") {
    virtualKeyboard.register = "lower";
    virtualKeyboard.createKeys();
  } else if (keyName === "CapsLock") {
  } else {
    document
      .querySelector(".keyboard__button[data='" + keyCode + "']")
      .classList.remove("keyboard__button_active");
  }
  textArea.focus();
});

// добавляем класс при нажатии мышкой
document.querySelectorAll(".keyboard__button").forEach(function (element) {
  element.addEventListener("mousedown", () => {
    element.classList.add("keyboard__button_active");

    const keyName = element.innerText;
    let innerText = textArea.value;

    if (keyName === "Backspace") {
      let cursorPosition = textArea.selectionStart;
      // если курсор стоит в начале поля ввода, то ничего не делаем
      if (cursorPosition === 0) {
        textArea.focus();
      } else {
        let newValue =
          innerText.substring(0, cursorPosition - 1) +
          innerText.substring(cursorPosition);
        textArea.value = newValue;
        textArea.selectionStart = cursorPosition - 1;
        textArea.selectionEnd = cursorPosition - 1;
      }
    } else if (keyName === "Del") {
      let cursorPosition = textArea.selectionStart;
      // если курсор стоит в конце поля ввода, то ничего не делаем
      if (cursorPosition === innerText.length) {
        textArea.focus();
      } else {
        let newValue =
          innerText.substring(0, cursorPosition) +
          innerText.substring(cursorPosition + 1);
        textArea.value = newValue;
        textArea.setSelectionRange(cursorPosition, cursorPosition);
      }
    } else if (keyName === "Enter") {
      textArea.value += "\n";
    } else if (keyName === "Tab") {
      textArea.value += "\t";
    } else if (keyName === "") {
      textArea.value += " ";
    } else if (keyName === "Win") {
      textArea.focus();
      // arrowRight
    } else if (keyName === "CapsLock") {
      if (!virtualKeyboard.capsLock) {
        virtualKeyboard.capsLock = true;
        virtualKeyboard.register = "capsLock";
      } else {
        virtualKeyboard.capsLock = false;
        virtualKeyboard.register = "lower";
      }
      virtualKeyboard.createKeys();
    } else if (element.getAttribute("data") == 9658) {
      console.log(textArea.selectionStart);

      let cursorPosition = textArea.selectionStart;
      if (cursorPosition === innerText.length) {
        textArea.focus();
      } else {
        cursorPosition += 1;
        textArea.setSelectionRange(cursorPosition, cursorPosition);
      }
      // arrowLeft
    } else if (element.getAttribute("data") == 9668) {
      console.log(textArea.selectionStart);

      let cursorPosition = textArea.selectionStart;
      if (cursorPosition === 0) {
        textArea.focus();
      } else {
        cursorPosition -= 1;
        textArea.setSelectionRange(cursorPosition, cursorPosition);
      }
      // arrowUp
    } else if (element.getAttribute("data") == 9650) {
      console.log(textArea.selectionStart);
      const cursorPosition = textArea.selectionStart;
      // делим массив на подстроки по Enter
      const lines = textArea.value.substr(0, cursorPosition).split("\n");
      // узнаем индекс текущей строки
      const lineIndex = lines.length - 1;
      let columnPosition;
      if (lineIndex === 1) {
        columnPosition = cursorPosition - lines[0].length - 1;
      } else {
        // узнаем количество символов в строках до нашей строки
        const sumLines = lines.slice(0, lineIndex).join("\n").length;
        // от общего количества символов перед курсором вычитаем сумму символов предыдущих линий, получаес на какой позиции в строке установлен курсор
        columnPosition = cursorPosition - sumLines;
      }

      if (lineIndex > 0) {
        //  проверяем что больше длина строки на которую мы устанавливаем курсор или позиция курсора и берем минимальное
        let newPosition =
          lines.slice(0, lineIndex - 1).join("\n").length +
          Math.min(columnPosition, lines[lineIndex - 1].length + 1);
        if (lineIndex === 1) {
          newPosition =
            lines.slice(0, lineIndex - 1).join("\n").length +
            Math.min(columnPosition, lines[lineIndex - 1].length);
        }

        // устанавливаем курсор на этой позиции в верхней строке
        textArea.setSelectionRange(newPosition, newPosition);
      }
      // ArrowDown
    } else if (element.getAttribute("data") == 9660) {
      const cursorPosition = textArea.selectionStart;
      const lines = textArea.value.substr(0, cursorPosition).split("\n");
      const lineIndex = lines.length - 1;
      const sumLines = lines.slice(0, lineIndex).join("\n").length;
      let columnPosition = cursorPosition - sumLines;
      if (lineIndex === 0) {
        columnPosition += 1;
      }
      const linesArr = textArea.value.split("\n");
      if (linesArr[lineIndex + 1]) {
        const newPosition =
          linesArr.slice(0, lineIndex + 1).join("\n").length +
          Math.min(columnPosition, linesArr[lineIndex + 1].length + 1);
        textArea.setSelectionRange(newPosition, newPosition);
      }
    } else if (keyName === "Shift") {
      if (!virtualKeyboard.capsLock) {
        virtualKeyboard.register = "upper";
      } else {
        virtualKeyboard.register = "capsShift";
      }
      virtualKeyboard.createKeys();
    } else {
      textArea.value += element.innerText;
    }

    console.log(keyName);
    textArea.focus();
  });
  element.addEventListener("mouseup", () => {
    let innerText = textArea.value;
    const keyName = element.innerText;
    if (keyName !== "CapsLock") {
      element.classList.remove("keyboard__button_active");
    }
    if (keyName === "Shift") {
      if (!virtualKeyboard.capsLock) {
        virtualKeyboard.register = "lower";
      } else {
        virtualKeyboard.register = "CapsLock";
      }
      virtualKeyboard.createKeys();
    }
    textArea.focus();
  });
});
