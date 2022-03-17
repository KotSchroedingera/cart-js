import './fa.js';
import './styles.scss';

const getHtml = (params = {}) => {
  const placeholder = params.placeholder || 'Выберите зачение';

  return `
  <div class="select-js">
    <div class="select-js__name">
      <p>${placeholder}</p>
      <i class="fa-solid fa-angle-down"></i>
    </div>
    <div class="select-js__list">
      <ul>
        <li data-value="any">Любое время</li>
        <li data-value="9-12">9:00 — 12:00</li>
        <li data-value="12-18">12:00 — 18:00</li>
        <li data-value="18-21">18:00 — 21:00</li>
      </ul>
    </div>
  `
}

class Select {
  constructor(elem, params) {
    this.elem = elem;
    this.params = params;
  }

  render() {
    this.elem.innerHTML = getHtml(this.params);
    this.elem.addEventListener('click', this.clickHandler.bind(this));
  }

  clickHandler(evt) {
    console.log(evt.path);
    this.toggle();
  }

  open() {
    this.elem.querySelector('.select-js').classList.add('active');
  }

  close() {
    this.elem.querySelector('.select-js').classList.remove('active');
  }

  toggle() {
    this.elem.querySelector('.select-js').classList.contains('active') 
      ? this.close()
      : this.open()
  }
}


export default Select;