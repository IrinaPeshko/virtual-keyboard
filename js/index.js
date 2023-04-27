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

function createKeyboard(){
  body.prepend(container)
  container.append(content)
  container.append(pToWindows)
  container.append(pToLanguage);
  content.append(header)
  content.append(textArea)
  content.append(keyboardWrapper)
}

function createButtons(){
  const buttonsArray = Object.keys(buttons);
  for(let key in buttons){
    const button = document.createElement("button");
    button.className = "keyboard__button";
    button.innerText = buttons[key].en.lower;
    keyboardWrapper.append(button)
    if(functionButtons.includes(key))
    {
      button.classList.add("keyboard__button_function");
      button.classList.add(`keyboard__${key}`); 
    }
  }
  console.log(buttonsArray);
}

createButtons()
createKeyboard()
