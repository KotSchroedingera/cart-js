import Select from "./select/select.js";
import Modal from './modal/modal.js';


// Select

const select = new Select(
  document.getElementsByClassName('form__select')[0], 
  {
    placeholder: 'Когда позвонить?', 
    list: [
      { id: 'any', text: 'В любое время' }, 
      { id: '9-12', text: 'с 9 до 12' }, 
      { id: '12-18', text: 'с 12 до 18' }, 
    ]
  }
);
select.render();


// Modal Add to cart

const modalCart = new Modal(
  document.querySelector('.product-card__order'), 
  {
    message: 'Товар в корзине!',
  }
)

modalCart.init();