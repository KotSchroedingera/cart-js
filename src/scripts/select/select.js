import './fa.js';
import './select.scss';

const getHtml = (params = {}) => {
  const placeholder = params.placeholder || 'Выберите зачение';
  const list = params.list || [{ value: 'any', text: 'Когда угодно' }];
  
  let listHtml = '<ul>';
  if (list) list.forEach(elem => listHtml += `<li data-id="${elem.id}">${elem.text}</li>`);
  listHtml += '</ul>';

  return `
  <div class="select-js">
    <div class="select-js__name">
      <p>${placeholder}</p>
      <i class="fa-solid fa-angle-down"></i>
    </div>
    <div class="select-js__list">
      ${listHtml}
    </div>
  `
}

class Select {
  constructor(elem, params) {
    this.elem = elem;
    this.params = params;
    this.current = null;
  }

  render = () => {
    this.elem.innerHTML = getHtml(this.params);
    this.elem.querySelector('.select-js__name').addEventListener('click', this.clickNameHandler);
    this.elem.querySelector('.select-js__list').addEventListener('click', this.clickListHandler);
  }

  clickNameHandler = () => this.toggle();

  clickListHandler = (evt) => {
    this.current = evt.target.textContent;
    this.elem.querySelector('.select-js__name p').textContent = this.current;
    this.close();
    console.log(this)
  }

  open = () => this.elem.querySelector('.select-js').classList.add('active');
  close = () => this.elem.querySelector('.select-js').classList.remove('active');

  toggle = () => {
    this.elem.querySelector('.select-js').classList.contains('active') 
      ? this.close()
      : this.open()
  }
}


export default Select;