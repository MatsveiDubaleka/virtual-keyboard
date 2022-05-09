import './styles/style.css';

// Keyboard Object
const Keyboard = {
  elements: {
    main: null, keysContainer: null, keys: [],
  },
  eventHandlers: {
    oninput: null,
    onclose: null,
    proerties: {
      value: '', capsLock: false, ctrl: false,
    },
    init() {
      // Создаём главные элементы
      this.elements.main = document.createElement('div');
      this.elements.keysContainer = document.createElement('div');
      this.elements.main.classList.add('keyboard');
      this.elements.keysContainer.classList.add('keyboard__keys');
      // Добавляем в DOM
      this.elements.main.appendChild(this.elements.keysContainer);
      document.body.appendChild(this.elements.main);
    },
  },
};

console.log('Please check work in Thursday!');
alert('Пожалуйста проверьте мою работу в Четверг!!!');
