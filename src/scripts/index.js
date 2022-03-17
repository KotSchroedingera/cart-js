import Select from "./select/select.js";

const select = new Select(
  document.getElementsByClassName('form__select')[0], 
  {
    placeholder: 'Когда позвонить?'
  }
);
select.render();