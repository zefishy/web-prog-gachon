// querySelector — returns FIRST match (or null)
const btn   = document.querySelector('button');
const title = document.querySelector('#main-title');
const card  = document.querySelector('.card.active');

// querySelectorAll — returns ALL matches (NodeList)
const allBtns = document.querySelectorAll('button');
const items   = document.querySelectorAll('.list-item');

// Loop through all results
items.forEach(item => {
  item.style.color = 'blue';
});