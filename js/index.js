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
textArea.setAttribute("autofocus", "autofocus")
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
  constructor(){
    this.capsLock = false;
    this.shif = false;
    this.lang = (localStorage.lang) ? localStorage.lang : "en";
  }

  createKeyboard(){
  body.prepend(container)
  container.append(content)
  container.append(pToWindows)
  container.append(pToLanguage);
  content.append(header)
  content.append(textArea)
  content.append(keyboardWrapper)

    // Create keys
    for (let key in buttons) {
      const button = document.createElement("button");
      button.className = "keyboard__button";
      button.innerText = buttons[key].en.lower;
      button.setAttribute("data", `${button.innerText.charCodeAt()}`)
      keyboardWrapper.append(button);

      if (functionButtons.includes(key)) {
        button.classList.add("keyboard__button_function");
        button.classList.add(`keyboard__${key}`);
      }
    }
  }
}

const virtualKeyboard = new Keyboard()
virtualKeyboard.createKeyboard()
// function createKeyboard(){
//   body.prepend(container)
//   container.append(content)
//   container.append(pToWindows)
//   container.append(pToLanguage);
//   content.append(header)
//   content.append(textArea)
//   content.append(keyboardWrapper)

//   // Create keys
//   for (let key in buttons) {
//     const button = document.createElement("button");
//     button.className = "keyboard__button";
//     button.innerText = buttons[key].en.lower;
//     button.setAttribute("data", `${button.innerText.charCodeAt()}`)
//     keyboardWrapper.append(button);

//     if (functionButtons.includes(key)) {
//       button.classList.add("keyboard__button_function");
//       button.classList.add(`keyboard__${key}`);
//     }
//   }
// }

// createKeyboard()

const rightShift = document.querySelector(".keyboard__shiftRight");
const rightAlt = document.querySelector(".keyboard__altRight");
const controlRight = document.querySelector(".keyboard__controlRight");
const controlLeft = document.querySelector(".keyboard__controlLeft")

// добавляеем событие при нажатии на клавиатуру
// KeyDown
document.addEventListener ("keydown", (event) => {
  const keyCode = event.key.charCodeAt();
  console.log(keyCode);
  if (keyCode === 83 && event.location == KeyboardEvent.DOM_KEY_LOCATION_RIGHT) {
    rightShift.classList.add('keyboard__button_active');
  } else if (keyCode === 67 && event.location == KeyboardEvent.DOM_KEY_LOCATION_RIGHT) {
    controlRight.classList.add('keyboard__button_active');
  } else if (keyCode === 65 && event.location == KeyboardEvent.DOM_KEY_LOCATION_RIGHT) {
    rightAlt.classList.add('keyboard__button_active');
  } else if (keyCode === 67 && event.location == KeyboardEvent.DOM_KEY_LOCATION_LEFT) { 
    controlLeft.classList.add('keyboard__button_active');
  } else if (keyCode === 84 ) {
    textArea.value += "\t"
  } else {
    document.querySelector(".keyboard__button[data='"+keyCode+"']" ).classList.add("keyboard__button_active")
}
});
// KeyUp
document.addEventListener ("keyup", (event) => {
  const keyCode = event.key.charCodeAt();
  if (keyCode === 83 && event.location == KeyboardEvent.DOM_KEY_LOCATION_RIGHT) {
    rightShift.classList.remove('keyboard__button_active');
  } else if (keyCode === 67 && event.location == KeyboardEvent.DOM_KEY_LOCATION_RIGHT) {
    controlRight.classList.remove('keyboard__button_active');
  } else if (keyCode === 65 && event.location == KeyboardEvent.DOM_KEY_LOCATION_RIGHT) {
    rightAlt.classList.remove('keyboard__button_active');
  } else if (keyCode === 67 && event.location == KeyboardEvent.DOM_KEY_LOCATION_LEFT) { 
    controlLeft.classList.remove('keyboard__button_active');
  } else {
    document.querySelector(".keyboard__button[data='"+keyCode+"']" ).classList.remove("keyboard__button_active")
  }
  textArea.focus();
});

// добавляем класс при нажатии мышкой
document.querySelectorAll(".keyboard__button").forEach(function(element){
// debugger

  element.addEventListener("click", ()=>{
    element.classList.add("keyboard__button_active");
    setTimeout(()=>element.classList.remove("keyboard__button_active"), 300);
    
    const keyName = element.innerText;
    let innerText = textArea.value

    if (keyName === "Backspace"){
      let cursorPosition = textArea.selectionStart;
      console.log(cursorPosition);
        // если курсор стоит в начале поля ввода, то ничего не делаем
      if (cursorPosition === 0) {
        textArea.focus();
      } else { 
        let newValue = innerText.substring(0,cursorPosition-1)+innerText.substring(cursorPosition)
        textArea.value = newValue;
      }

    } else if (keyName === "Del"){
      let cursorPosition = textArea.selectionStart;
      console.log(cursorPosition);
        // если курсор стоит в конце поля ввода, то ничего не делаем
      if (cursorPosition === innerText.length) {textArea.focus();
      } else {
        let newValue = innerText.substring(0,cursorPosition)+innerText.substring(cursorPosition+1)
        textArea.value = newValue;
        textArea.selectionStart = cursorPosition;
        textArea.selectionEnd = cursorPosition;
      }
      
    } else if (keyName === "Enter") {
      textArea.value+= "\n"
  
    } else if (keyName === "Tab") {
      textArea.value+= "\t"
  
    } else if (keyName === ""){
      textArea.value+=" ";

    } else{
    textArea.value+=element.innerText;
    }
    
    console.log(keyName);
    textArea.focus();

  })
})
  