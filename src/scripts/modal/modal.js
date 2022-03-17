import './modal.scss';

const getHtml = (params = {}) => {
  const message = params.message || 'Закрыть модальное окно?';

  const elem = document.createElement('div');
  elem.classList.add('modal-js');
  elem.id = 'modal-js';
  elem.innerHTML = `
    <div class="modal-js__text">
      <p>${message}</p>
    </div>
    <button class="button modal-js__ok">Хорошо</button>
  `;
  
  return elem;
};

class Modal {
  constructor(elem, params) {
    this.elem = elem;
    this.params = params; 
  }

  show = () => {
    document.querySelector('body').appendChild(getHtml(this.params));
    const overlay = document.createElement('div');
    overlay.classList.add('modal-overlay');

    document.querySelector('body').appendChild(overlay);
  }

  hide = () => {
    document.querySelector('body').removeChild(document.querySelector('#modal-js'));
  }

  okHandler = () => {
    this.hide();
  }

  init = () => {
    this.elem.addEventListener('click', this.show);
  }
}

export default Modal;