
const btn   = document.querySelector('button');
const title = document.querySelector('#main-title');
const card  = document.querySelector('.card.active');

const allBtns = document.querySelectorAll('button');
const items   = document.querySelectorAll('.list-item');

items.forEach(item => {
  item.style.color = 'blue';
});