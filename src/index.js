import './styles/style.css';
import keys from './keys';

// Container
const body = document.querySelector('body');
const container = document.createElement('div');
container.classList.add('container');
document.body.appendChild(container);

// Heading
const heading = document.createElement('h1');
heading.classList.add('heading');
container.appendChild(heading);

// Textarea
const textarea = document.createElement('textarea');
textarea.autofocus = true;
textarea.classList.add('textarea');
container.appendChild(textarea);

// Switch and Windows paragraphs
const windowsParagraph = document.createElement('p');
const switchParagraph = document.createElement('p');

windowsParagraph.classList.add('windows');
switchParagraph.classList.add('switch');

windowsParagraph.textContent = 'Virtual keyboard was done in OS Windows';
switchParagraph.textContent = 'To switch languages use left CTRL + left SHIFT';

container.appendChild(windowsParagraph);
container.appendChild(switchParagraph);

// Night mode and Change Color of Keyboard
const nightMode = document.createElement('div');
nightMode.classList.add('night__mode');
container.appendChild(nightMode);

const toggleCircle = document.createElement('div');
toggleCircle.classList.add('toggle__circle');
nightMode.appendChild(toggleCircle);

const changeColor = document.createElement('div');
changeColor.classList.add('change__light-color');
container.appendChild(changeColor);

const inputColor = document.createElement('input');
inputColor.classList.add('colors__input');
inputColor.type = 'color';
changeColor.appendChild(inputColor);

// Keyboard DOM
const keyboard = document.createElement('div');
keyboard.classList.add('keyboard__wrapper');
container.appendChild(keyboard);

// Lights Mode
const keyboardLight = document.createElement('div');
keyboardLight.classList.add('keyboard__lights');
keyboard.appendChild(keyboardLight);

// Keyboard Container
const keyboardWrapp = document.createElement('div');
keyboardWrapp.classList.add('keyboard__keys');
keyboard.appendChild(keyboardWrapp);

// Rows in Keyboard
function isSpecialKey(btnKey, btnContent) {
  if (btnContent === 'Backspace') {
    btnKey.classList.add('backspace__key');
  } else if (btnContent === 'Tab') {
    btnKey.classList.add('Tab');
  } else if (btnContent === '\\') {
    btnKey.classList.add('slash__key');
  } else if (btnContent === 'CapsLock') {
    btnKey.classList.add('capslock__key');
  } else if (btnContent === ' ') {
    btnKey.classList.add('space__key');
  } else if (btnContent === 'Enter') {
    btnKey.classList.add('enter__key');
  } else if (btnContent === 'Shift') {
    btnKey.classList.add('shift__key');
  }
}

function createKey(rowKeyboard, key) {
  const btnKeyboard = document.createElement('div');
  btnKeyboard.classList.add('keys');
  btnKeyboard.textContent = key;
  isSpecialKey(btnKeyboard, btnKeyboard.textContent);
  btnKeyboard.setAttribute('id', `${key.toLowerCase()}`);
  rowKeyboard.appendChild(btnKeyboard);
}

function createRow(rowNum, key) {
  const rowKeyboard = document.createElement('div');
  rowKeyboard.classList.add('keyboard__row');
  rowKeyboard.setAttribute('id', `row-${rowNum}`);
  if (document.getElementById(`row-${rowNum}`) != null) {
    const oldRowKeyboard = document.getElementById(`row-${rowNum}`);
    createKey(oldRowKeyboard, key);
  } else {
    keyboardWrapp.appendChild(rowKeyboard);
    createKey(rowKeyboard, key);
  }
}

// Test
const englishKeyboard = keys.en;
const russianKeyboard = keys.ru;

const keyShift = null;
let rowNum = null;

function renderKeyboard(activeKeyboard = englishKeyboard, CAPS = null) {
  for (let i = 0; i < activeKeyboard.length; i += 1) {
    let btnKey = null;
    const btnKeyCode = activeKeyboard[i].keyCode;

    // Checking is Caps is pressed;
    if (CAPS === true) {
      btnKey = activeKeyboard[i].keyCaps;
    } else {
      btnKey = activeKeyboard[i].key;
    }

    // Checking is Shift is pressed;
    if (keyShift === true) {
      btnKey = activeKeyboard[i].keyShift;
    } else {
      btnKey = activeKeyboard[i].key;
    }

    if (btnKeyCode === 9) {
      rowNum = 1;
    } else if (btnKeyCode === 20) {
      rowNum = 2;
    } else if (btnKeyCode === 16) {
      rowNum = 3;
    } else if (btnKeyCode === 17) {
      rowNum = 4;
    } else if (btnKeyCode === 192) {
      rowNum = 0;
    }
    createRow(rowNum, btnKey);
  }
}
renderKeyboard();

function deleteKeyboard() {
  const rows = document.querySelectorAll('.keyboard__row');
  for (let i = 0; i < rows.length; i++) {
    rows[i].remove();
  }
}

// DOM Keys
const keysKeyboard = document.querySelectorAll('.keys');
window.addEventListener('keydown', (e) => {
  for (let i = 0; i < keysKeyboard.length; i++) {
    if (e.key === keysKeyboard[i].textContent) {
      keysKeyboard[i].classList.add('active');
    }
  }
  // console.log(e.key);
});

const activeLanguage = englishKeyboard;
let keyCaps = false;

window.addEventListener('keyup', (e) => {
  for (let i = 0; i < keysKeyboard.length; i++) {
    if (e.key === keysKeyboard[i].textContent) {
      keysKeyboard[i].classList.remove('active');
    }
  }

  if (e.key === 'CapsLock') {
    keyCaps = true;
  }

  if (e.key === 'Shift' || e.key === 'Control') {
    if (activeLanguage === englishKeyboard) {
      deleteKeyboard();
      renderKeyboard(russianKeyboard);
    } else if (activeLanguage === russianKeyboard) {
      deleteKeyboard();
      renderKeyboard(englishKeyboard);
    }
  }
});

// Color modes
nightMode.addEventListener('click', () => {
  toggleCircle.classList.toggle('active');
  body.classList.toggle('active');
  nightMode.classList.toggle('active');
  keyboardWrapp.classList.toggle('active');
  textarea.classList.toggle('active');
  changeColor.classList.toggle('active');
  for (let i = 0; i < keysKeyboard.length; i++) {
    keysKeyboard[i].classList.toggle('keys__night');
  }
});

inputColor.addEventListener('input', () => {
  for (let i = 0; i < keysKeyboard.length; i++) {
    keysKeyboard[i].style.color = inputColor.value;
  }
  const rows = document.querySelectorAll('.keyboard__row');

  for (let i = 0; i < rows.length; i++) {
    rows[i].style.backgroundColor = inputColor.value;
  }
});
